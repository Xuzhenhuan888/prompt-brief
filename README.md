# prompt-brief

[安装](#安装) · [知识库](#三个领域知识库) · [实测证据](BENCHMARKS.md) · [研究依据](docs/RESEARCH.md) · [English](#english)

把产品想法、视觉感受和办公目标转写为可执行、可验收的专业提示词。安装后照常用自己的话交办，助手按需要读取领域知识，把相关规格用于当前任务。明确要求查看提示词时，可获得一段能移交给另一模型的指令。

## 快速体验

> 想做个办公室会议室预约小网页，大家都能约，管理员看安排。

编程场景可补充使用角色、会议室与时段的数据关系、重叠预约规则，以及有预期结果的验收案例。

> 这两枚标签拖起来像软糖，靠近粘住，拉远断开再轻轻回弹。

交互场景可描述跟手、轮廓液桥、断开条件、回弹与取消反馈。只有“首页活泼一点”时，先依据页面内容考虑构图、排版和色彩。

> 报名和签到每周还要继续加，算各部门到场率，例会给领导打印一页。

办公场景可定义可追加明细、匹配与去重、统计口径，以及供持续编辑和打印的产出。

## 安装

```bash
npx skills add Xuzhenhuan888/prompt-brief --skill prompt-brief -a codex
```

手动安装时，将包含 SKILL.md、references/、models.md 和 cache.md 的完整目录命名为 prompt-brief，放入宿主支持的技能目录并重新打开会话。在 Codex 中可显式输入 $prompt-brief。自动发现与加载由客户端决定，其他宿主请使用其文档约定的安装位置。

## 三个领域知识库

| 知识库 | 主要内容 | 数量 |
| --- | --- | ---: |
| [产品与编程](references/product.md) | 产品范围、数据、流程规则、权限、集成、离线、异步与验收 | 72 |
| [视觉与交互](references/interaction.md) | 信息层级、排版色彩、材质、响应式、组件、反馈、手势与动效 | 72 |
| [办公与信息处理](references/office.md) | 格式选择、清洗整合、Excel、指标分析、Word、PDF、汇报与复核 | 72 |

共 24 个专题、216 条映射。每条包含专业术语、自然语言示例、可采用的提示词要求、适用或验收提示。每库 72 条是本项目的首轮建设基线，真实任务覆盖率待测。[范围与计数方法](docs/KNOWLEDGE.md)

入口 [SKILL.md](SKILL.md) 负责提取要求、处理歧义、选择相关资料并执行。默认沿用当前模型与用户指定的交付阶段。[模型适配](models.md) 和 [缓存参考](cache.md) 按需要读取。

## 实测观察

| 测试 | 对照 | 观察 |
| --- | --- | --- |
| 新版内容，GPT-6.2 Sol | 3 个短任务 × 2 组 × 2 次 | 提示词规格评分 30/36 → 35/36；成功调用的输入加输出 token 增加 37.7% |
| 用户提供的旧版，ZCode / GLM-5.4 | 6 个任务 × 2 组 × 2 次 | 原评分 68/72 → 70/72；记录 token 增加 42.0%，图标样例阶段控制仍失败 |

新版的观察收益集中于验收案例、减少动态反馈和办公复算检查。本轮评分由执行者按预定标准复核，任务围绕设计目标选择，产物是转写后的提示词。网页、动效和办公文件的端到端质量，以及稳定的效率收益需要继续验证。[方法、原始回答、费用口径与失败记录](BENCHMARKS.md)

## 研究与反馈

提示词组件、歧义澄清和可验证指令的论文支持运行结构。W3C、MDN、Apple、Microsoft 等领域资料用于核对具体概念。中文例句与领域映射由本项目编写。[论文与采用方法](docs/RESEARCH.md)

反馈时可附去除敏感信息的原话、材料、预期产物、实际产物及模型与宿主版本。仓库提供 [证据核对和复跑说明](evals/README.md) 及 [早期合成回归用例](EVAL.md)。

## English

An Agent Skill for translating natural-language product ideas, UI preferences and office goals into actionable specifications. It includes 216 domain mappings across coding, interaction design and office work. The latest 12-output prompt-rewriting pilot scored 35/36 with preloaded skill content versus 30/36 for the baseline. Successful calls used 37.7% more total tokens. End-to-end deliverable quality and efficiency require further evaluation. Full protocols, outputs, usage and limitations are included.

[MIT License](LICENSE)
