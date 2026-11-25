const fs = require('node:fs');
const path = require('node:path');
const crypto = require('node:crypto');
const assert = require('node:assert/strict');
const root = __dirname;
const readJson = name => JSON.parse(fs.readFileSync(path.join(root, name), 'utf8').replace(/^\uFEFF/, ''));
const sha = value => crypto.createHash('sha256').update(value).digest('hex');
const sum = (rows, getValue) => rows.reduce((total, row) => total + getValue(row), 0);

function buildPrompt(evidence, task, group) {
  if (group === 'A') return task.prompt;
  const prefix = 'references/' + task.domain + '/';
  const names = ['SKILL.md', 'references/' + task.domain + '.md',
    ...Object.keys(evidence.snapshot).filter(name => name.startsWith(prefix)).sort()];
  const separator = evidence.promptPathSeparator || '/';
  const documents = names.map(name => '## ' + name.replaceAll('/', separator) + '\n\n' + evidence.snapshot[name]);
  return '本轮已预加载 prompt-brief 及相关领域参考，按其指令处理末尾的用户请求。\n\n'
    + documents.join('\n\n') + '\n\n## 用户本轮请求\n\n' + task.prompt;
}

function verify() {
  const quick = readJson('quick-evidence.json');
  assert.equal(quick.protocol.tasks.length, 3);
  for (const [name, content] of Object.entries(quick.snapshot)) {
    assert.equal(sha(content), quick.snapshotSha256[name], name);
    assert.equal(fs.readFileSync(path.join(root, '..', name), 'utf8'), content, name + ' changed since test');
  }
  const successful = quick.attempts.filter(row => row.complete);
  assert.equal(quick.attempts.length, 13);
  assert.equal(successful.length, 12);
  assert.equal(quick.grading.grades.length, 12);
  for (const run of quick.attempts) {
    const task = quick.protocol.tasks.find(task => task.id === run.task);
    assert.equal(sha(buildPrompt(quick, task, run.group)), run.promptHash, run.id + ' input');
  }
  for (const grade of quick.grading.grades) {
    const run = successful.find(row => row.id === grade.run);
    assert.ok(run, grade.run);
    assert.equal(grade.result, run.result);
    assert.equal(grade.characters, Array.from(run.result.replace(/\s/g, '')).length);
    assert.equal(grade.scores[0], Number(grade.characters <= 180));
    assert.equal(grade.total, sum(grade.scores, value => value));
  }
  const summary = {};
  for (const group of ['A', 'B']) {
    const grades = quick.grading.grades.filter(row => row.group === group);
    const runs = successful.filter(row => row.group === group);
    assert.equal(grades.length, 6);
    const published = quick.grading.summary[group];
    summary[group] = {
      score: sum(grades, row => row.total),
      inputTokens: sum(runs, row => row.usage.input_tokens),
      outputTokens: sum(runs, row => row.usage.output_tokens),
      cachedInputTokens: sum(runs, row => row.usage.cached_input_tokens)
    };
    for (const [name, value] of Object.entries(summary[group])) assert.equal(value, published[name]);
    assert.equal(summary[group].inputTokens + summary[group].outputTokens, published.totalTokens);
  }
  const legacy = readJson('glm-zcode-evidence.json');
  assert.equal(legacy.runs.length, 24);
  for (const run of legacy.runs) {
    assert.equal(run.total, sum(run.scores, value => value));
    assert.deepEqual(run.scores, legacy.grades[run.run].scores);
    assert.ok(run.reply);
  }
  const legacySummary = {};
  for (const group of ['A', 'B']) {
    const rows = legacy.runs.filter(row => row.cond === group);
    legacySummary[group] = {
      runs: rows.length, score: sum(rows, row => row.total),
      tokens: sum(rows, row => row.tokens),
      skillLoaded: rows.filter(row => row.skillLoaded).length
    };
  }
  console.log(JSON.stringify({ quick: summary, legacy: legacySummary }, null, 2));
  console.log('Verified hashes, exact test inputs, scores, lengths and usage totals. Semantic grades require human review.');
}
if (require.main === module) verify();
module.exports = { buildPrompt };
