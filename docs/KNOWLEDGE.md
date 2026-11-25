# 知识库范围与数量依据

本次整理了产品与编程、视觉与交互、办公与信息处理三个库，各 72 条，共 216 条。建议先阅读 [产品与编程完整词表](../references/product.md)、[视觉与交互完整词表](../references/interaction.md)和[办公完整词表](../references/office.md)。三个入口分别列出全部专题及其词条。

## 每个库至少需要多少条

检索到的提示词工程论文及领域资料没有给出“覆盖日常任务至少需要多少领域词条”的通用结论。任务分布、行业、用户和模型不同，所需词汇也随之变化。是否覆盖日常需求，需要拿目标用户的真实请求测量。

本稿采用每库 72 条作为首轮建设基线。这是本项目的编辑与范围设计决策，尚待任务集验证。先为每库划出 8 个会独立影响产出的任务族，再各选 9 个有不同实现、设计或验收意义的概念。相同数量用于让三库建设深度相近；后续按真实任务中的缺口调整各专题数量。

这里“覆盖”指，能把用户的常见请求写成足够开展工作的规格。约定的日常范围包括个人与小团队的 App、网页和工具构想，常见页面与组件设计，以及 Excel、Word、PDF 和工作汇报。垂直行业的专业判断、大型基础设施和复杂仿真等需求，需要另外引入领域资料。

## 计数口径与词条结构

每条是一个可独立选用的概念、设计模式或交付要求。英文名、中文译名和口语说法属于同一条。跨库出现同一主题时，只在具体产出要求不同的情况下分别编写，例如编程库定义导出数据范围，办公库定义交付文件的字段契约。

每条有编号、专业术语、用户原话示例、可直接写进提示词的要求、适用或验收提示。表中的使用场景与提示词文本由本项目编写，专题末尾的资料用于核对术语和相关实践。其中“软糖”“磁吸”等感受与创作效果的配对是有条件的设计建议。

| 知识库 | 8 个任务族 | 数量 |
| --- | --- | ---: |
| 产品与编程 | 产品范围；数据建模；流程与规则；身份权限；接口集成；持久化与协作；异步与性能；验收与发布 | 8 × 9 = 72 |
| 视觉与交互 | 信息层级；排版与色彩；材质图像；响应式；组件模式；状态反馈；手势拖拽；动效转场 | 8 × 9 = 72 |
| 办公与信息处理 | 交付形式；素材整合；Excel；指标分析；Word；PDF；工作沟通；交付复核 | 8 × 9 = 72 |
| 合计 | 24 个专题 | 216 |

## 为什么这样组织

入口保留场景判断和提示词模板。各专题保存 9 条可组合的映射。模型先选与主要交付物相关的入口，再读实际需要的专题。例如“做个网页，拖卡片排班”可读取编程的状态与业务规则，以及交互的拖拽与吸附。输入已经明确时，直接将需要的规格用于任务。

专业表达需要落实到用户能看见的结果。例如“磁吸感”可以转写为有效落点的预览、吸附阈值及取消行为；“持续周更”可以转写为可追加明细、统计口径和刷新后的汇总检查。来源不充分的选择仍应作为工作假设或待确认项。

## 论文及领域资料

提示词结构与澄清策略来自对提示词组件、未明说要求、提示词质量与可验证指令等研究的整理。各论文的范围和本稿采用的原则记录在[论文与修订依据](RESEARCH.md)。

| 领域 | 核对的主要资料 | 在本稿中的用途 |
| --- | --- | --- |
| 产品与流程 | [GOV.UK 用户故事](https://www.gov.uk/service-manual/agile-delivery/writing-user-stories)、[Cucumber Gherkin](https://cucumber.io/docs/gherkin/reference/) | 角色、任务、业务结果与行为验收 |
| 数据与系统 | [PostgreSQL 约束](https://www.postgresql.org/docs/current/ddl-constraints.html)、[事务隔离](https://www.postgresql.org/docs/current/transaction-iso.html)、[OpenAPI](https://spec.openapis.org/oas/) | 唯一性、关系、并发与接口契约 |
| 状态与运行 | [MDN 离线与后台操作](https://developer.mozilla.org/en-US/docs/Web/Progressive_web_apps/Guides/Offline_and_background_operation)、[OpenTelemetry](https://opentelemetry.io/docs/concepts/observability-primer/) | 离线访问、保存、运行与可诊断状态 |
| 视觉体系 | [USWDS 设计令牌](https://designsystem.digital.gov/design-tokens/)、[排版](https://designsystem.digital.gov/design-tokens/typesetting/overview/) | 颜色、间距、字体与组件一致性 |
| 交互模式 | [W3C APG](https://www.w3.org/WAI/ARIA/apg/patterns/)、[WCAG 2.2](https://www.w3.org/TR/WCAG22/) | 组件语义、焦点、输入方式和反馈 |
| 动效与转场 | [Apple 弹簧动画](https://developer.apple.com/videos/play/wwdc2023/10158/)、[MDN View Transition API](https://developer.mozilla.org/en-US/docs/Web/API/View_Transition_API) | 弹性参数、手势接续、跨状态视觉连续性 |
| 表格与材料 | [Power Query 实践](https://learn.microsoft.com/en-us/power-query/best-practices)、[数据透视表](https://support.microsoft.com/en-us/excel/get-started/create-a-pivottable-to-analyze-worksheet-data) | 字段类型、追加、关联和可更新分析 |
| 文档与发布 | [Word 合并修订](https://support.microsoft.com/en-us/word/combine-document-revisions)、[Adobe PDF 表单](https://helpx.adobe.com/acrobat/using/pdf-forms.html)、[PDF 删减和净化](https://helpx.adobe.com/acrobat/desktop/protect-documents/redact-pdfs/redacting-sanitizing.html) | 协作稿、可填写文件和发布信息范围 |
| 分析与汇报 | [Government Analysis Function 图表指南](https://analysisfunction.civilservice.gov.uk/policy-store/data-visualisation-charts/)、[PowerPoint 演讲者备注](https://support.microsoft.com/en-us/powerpoint/training/add-speaker-notes-to-your-slides) | 比较任务、图表选择和讲述方式 |

## 怎样判断 72 条是否足够

先使用真实任务及未用于编写词表的请求，按类别记录能否找到合适规格。覆盖率按“能够形成忠实于原话、足以开展工作的规格的请求数 / 全部请求数”计算，同时记录无依据扩写和遗漏关键约束的比例。

建议首轮每库准备至少 40 条独立请求，覆盖各任务族，并加入跨专题和含歧义的任务。这是试验设计建议。样本应包含多位用户的自然表述，避免只改写词条里的例句。先逐条审阅映射是否合理，再在一部分任务中比较实际交付。

若目标是常见任务的 90% 覆盖，可把它设为产品验收目标，并同时查看各专题失败情况。这个数值是待用户采用的目标。单轮小样本得到的比例还需要后续使用记录复核。

当前已完成 216 条词条与结构整理，真实任务覆盖率、完成率和 token 开销待测。模型适配与缓存参考沿用上版，本次新增研究集中于三个领域知识库。
