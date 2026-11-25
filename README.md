# prompt-brief

[English summary](#english-summary) · [安装](#安装) · [对比测试](BENCHMARKS.md) · [复跑用例](EVAL.md)

**把口语交办变成能直接执行的任务。** prompt-brief 是一份 Agent Skill，适用于有项目材料、修改范围或验收条件的编程、界面和办公任务。照常用自己的话交办，助手在执行前核对材料和约束，优先交付成品。

## 快速体验

安装后，开一个新会话，试着把一条实际需求发给助手。

> 把搜索改成空格分词，所有词都要命中。只动搜索逻辑，筛选和排序照旧。

> 旧稿说审核超时可以自动流转，以这次为准。超时后继续等人工审核，发起人可以催办。给我三行以内的群消息。

在 Codex 中，可用 `$prompt-brief` 明确调用。宿主也可以按技能描述自动选择，触发由客户端决定。一般任务沿用当前模型。需要把提示词交给另一模型时，说明目标模型，技能会保留原来的交付要求与附件范围。 [Codex Skills 文档](https://learn.chatgpt.com/docs/build-skills)

## 安装

通过 Skills CLI 安装到当前项目的 Codex 环境。运行后按提示确认目标。

```bash
npx skills add Xuzhenhuan888/prompt-brief --skill prompt-brief -a codex
```

也可以下载本仓库，解压后将包含 `SKILL.md`、`models.md` 和 `cache.md` 的目录命名为 `prompt-brief`，复制到项目的 `.agents/skills/`，或复制到 Codex 用户的 `~/.agents/skills/`。重新打开会话即可试用。其他 Agent 的技能位置和自动发现方式以各客户端文档为准。 [Skills CLI 用法](https://github.com/vercel-labs/skills/blob/main/docs/commands.md)

## 它检查什么

| 场景 | 执行前与交付时核对 |
| --- | --- |
| 编程 | 正常入口、复现和目标行为、需要保护的相邻分支 |
| 界面 | 指定底稿、可改范围、受影响的视口和共享组件 |
| 办公 | 受众、事实出处、哪些是预计，以及等待、失败或到期后的实际动作 |

规则集中在 [SKILL.md](SKILL.md)。[模型适配](models.md) 和 [API 缓存](cache.md) 按需读取。

## 实测摘要

| GPT-6.2 Sol，24 道配对任务 | 之前的 v2 | 当前 v3 |
| --- | ---: | ---: |
| 首轮通过 | 21/24 | 22/24 |
| 原有失败题复跑通过 | 0/3 | 3/3 |
| 输入 token 中位数 | 17,359 | 16,840 |
| CLI 总耗时中位数 | 11.60 秒 | 11.55 秒 |

按逐题差值计算，v3 每题少用 519 个输入 token。六道新任务两版各通过四道，通用的通过率提升还缺少证据。单独的三对缓存试验中，客户端将共享资料拆成独立消息，聚合命中率由 59.7% 升到 86.1%。这项结果只适用于该试验的消息组装条件。 [完整测试方法与边界](BENCHMARKS.md)

如果要反馈一个案例，可以在 Issues 中附上去掉敏感信息的原始请求、可共享的素材、预计结果和实际结果。 [公开复跑样例](EVAL.md)

## English summary

prompt-brief is a lightweight Agent Skill for turning natural-language coding, UI, and office requests into deliverable-first work. It preserves scope and source facts, then checks the result against the original request. The [benchmark notes](BENCHMARKS.md) report both improvements and regressions. The [public examples](EVAL.md) are synthetic and can be reused to run your own paired evaluation.

Released under the [MIT License](LICENSE).
