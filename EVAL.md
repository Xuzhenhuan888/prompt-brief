# 公开复跑用例

以下为合成用例，方便复跑测法。它们独立于 [真实项目汇总](BENCHMARKS.md) 的统计。

## 运行办法

1. 每题开两个新会话，固定模型、推理强度、工具和材料。A 禁用技能，B 明确调用 `$prompt-brief`。如测自动触发，两组只发送下述原话，另记 B 是否加载。
2. 保留两组首轮产物，隐藏组别再评分。每道题全部验收通过才记首轮通过。按任务统计两组都过、仅技能过、仅对照过和都失败。
3. 使用同样的反馈规则记实际补交轮次。比较 Token 时记录输入、缓存和缓存写入，并在冷、热条件下分别观察。

## P01 · 搜索与排序

给助手以下原话和函数。

> 搜索改成空格分词，每个词都要命中。只交函数本身。排序和已归档显示规则照旧。

```js
function selectCards(cards, term, showArchived = false) {
  const query = term.trim().toLowerCase();
  return cards.filter(card => (showArchived || !card.archived)
    && (card.title + ' ' + card.summary).toLowerCase().includes(query))
    .sort((a, b) => b.priority - a.priority);
}
```

验收使用三条数据：「蓝色 活动 / 预告 / 2」和「红色 活动 / 蓝色主题 / 3」未归档，「蓝色 活动 / 往期 / 5」已归档。搜索 `活动 蓝色` 时默认按 3、2 返回，开启归档后按 5、3、2 返回。仅一词命中、空输入和连续空格都要检查。结果只交函数，别改变原排序和归档逻辑。

## P02 · 局部界面改动

> 只把「进行中」标签改成蓝底白字。已结束标签、卡片布局都照旧。给我能追加到原样式的 CSS。

```html
<article class="card"><span class="state active">进行中</span></article>
<article class="card"><span class="state closed">已结束</span></article>
<style>
.card { display: flex; gap: 12px; padding: 16px; }
.state { border-radius: 4px; padding: 4px 8px; }
.state.active { background: #d7fae0; color: #173826; }
.state.closed { background: #eee; color: #424242; }
</style>
```

验收时将答复的 CSS 追加到页面，核对进行中标签的前景和背景色。用浏览器比较改动前后卡片边界、标签尺寸、标题及已结束标签的计算样式。

## P03 · 审核超时提醒

> 按现在这版设计给发起人写一条审核超时提醒，三行以内，能直接发。别编超时多久。

旧稿写「超过时限自动通过」。当前说明写「超过时限显示待催办。发起人可以手动催办。审核人通过后才能流转」。本轮采用当前说明。

验收包含三项。正文可直接发且不超过三行。明确发起人可手动催办。明确仍需等待审核，超时不会自动通过或流转。不得编造时限。

## 记录模板

| 题号 | 两组皆过 | 仅技能过 | 仅对照过 | 两组皆失败 | 需要几轮返工 |
| --- | --- | --- | --- | --- | --- |
| P01 | | | | | |
| P02 | | | | | |
| P03 | | | | | |
