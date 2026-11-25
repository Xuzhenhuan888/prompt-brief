const fs = require('node:fs');
const path = require('node:path');
const { spawn } = require('node:child_process');
const { buildPrompt } = require('./verify.cjs');
const evidence = JSON.parse(fs.readFileSync(path.join(__dirname, 'quick-evidence.json'), 'utf8'));
function option(name) {
  const index = process.argv.indexOf(name);
  return index < 0 ? undefined : process.argv[index + 1];
}
const cli = option('--cli') || process.env.CODEX_APP_RUNTIME_CLI_PATH;
const destination = option('--output');
if (!cli || !destination) {
  console.error('Usage: node evals/replay.cjs --cli /path/to/codex-executable --output /path/to/new-evidence');
  process.exit(1);
}
const output = path.resolve(destination);
if (fs.existsSync(output)) {
  console.error('Choose a new output directory so existing evidence is preserved.');
  process.exit(1);
}
fs.mkdirSync(output, { recursive: true });
function execute(task, group, repetition, attempt) {
  const id = task.id + '-' + group + repetition + '-' + attempt;
  const directory = path.join(output, id);
  fs.mkdirSync(directory);
  const prompt = buildPrompt(evidence, task, group);
  fs.writeFileSync(path.join(directory, 'input.txt'), prompt);
  const resultPath = path.join(directory, 'result.txt');
  const out = fs.openSync(path.join(directory, 'events.jsonl'), 'w');
  const err = fs.openSync(path.join(directory, 'stderr.txt'), 'w');
  const args = [
    'exec', '--ephemeral', '--ignore-user-config', '--json', '--skip-git-repo-check',
    '--sandbox', 'read-only', '--model', evidence.protocol.model,
    '--disable', 'shell_tool', '--disable', 'shell_snapshot',
    '-c', 'model_reasoning_effort="low"',
    '-c', 'skills.config=[{name="prompt-brief",enabled=false}]',
    '-c', 'model_provider="bench_openai_http"',
    '-c', 'model_providers.bench_openai_http={name="OpenAI",requires_openai_auth=true,supports_websockets=false,stream_max_retries=1,request_max_retries=1}',
    '--output-last-message', resultPath, '-'
  ];
  return new Promise((resolve, reject) => {
    const started = Date.now();
    const child = spawn(cli, args, { cwd: directory, windowsHide: true, stdio: ['pipe', out, err] });
    const timer = setTimeout(() => child.kill(), 90000);
    child.stdin.on('error', () => {});
    child.stdin.end(prompt);
    child.on('error', error => {
      clearTimeout(timer);
      fs.closeSync(out);
      fs.closeSync(err);
      reject(error);
    });
    child.on('close', code => {
      clearTimeout(timer);
      fs.closeSync(out);
      fs.closeSync(err);
      const events = fs.readFileSync(path.join(directory, 'events.jsonl'), 'utf8').split(/\r?\n/)
        .filter(Boolean).map(line => { try { return JSON.parse(line); } catch { return null; } }).filter(Boolean);
      const completed = events.findLast(event => event.type === 'turn.completed');
      const result = fs.existsSync(resultPath) ? fs.readFileSync(resultPath, 'utf8').trim() : '';
      const record = {
        id, task: task.id, group, repetition, attempt, code,
        complete: code === 0 && Boolean(completed && result),
        seconds: (Date.now() - started) / 1000,
        usage: completed?.usage || null, result,
        errors: events.filter(event => event.type === 'error').map(event => event.message)
      };
      fs.writeFileSync(path.join(directory, 'run.json'), JSON.stringify(record, null, 2));
      console.log(id, record.complete ? 'completed' : 'incomplete');
      resolve(record);
    });
  });
}
async function main() {
  const jobs = [];
  for (const repetition of [1, 2]) {
    for (const task of evidence.protocol.tasks) {
      for (const group of repetition === 1 ? ['A', 'B'] : ['B', 'A']) jobs.push({ task, group, repetition });
    }
  }
  const records = [];
  let cursor = 0;
  async function worker() {
    while (cursor < jobs.length) {
      const { task, group, repetition } = jobs[cursor++];
      const first = await execute(task, group, repetition, 1);
      records.push(first);
      if (!first.complete && !first.errors.some(message => /quota|usage limit/i.test(message))) {
        records.push(await execute(task, group, repetition, 2));
      }
      fs.writeFileSync(path.join(output, 'records.json'), JSON.stringify(records, null, 2));
    }
  }
  await Promise.all(Array.from({ length: 3 }, worker));
}
main().catch(error => { console.error(error.message); process.exitCode = 1; });
