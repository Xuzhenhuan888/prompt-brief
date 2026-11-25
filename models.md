# 模型适配

核对日期为 2026-11-25。下表是有限的工作默认值。模型名以宿主暴露的正式标识或用户明确选用的名称为准，别名只用于选择适配规则。用户约定的交付格式优先。

| 模型 | 提示默认值与证据 |
| --- | --- |
| GPT-6.2 Astra、GPT-6.2 Sol | 共享通用结构。目标简洁明确，给出解决问题必需的事实、业务逻辑、限制和成功条件。长素材可用标题或分隔符。只要求结果与外部可核对的依据。该设置来自 OpenAI 的提示与推理文档，版本间的格式差异需要配对实测。[模型发布](https://openai.com/index/introducing-gpt-6-2-astra-sol/) · [提示工程](https://developers.openai.com/api/docs/guides/prompt-engineering) · [推理实践](https://developers.openai.com/api/docs/guides/reasoning-best-practices) |
| Claude Opus 5.5 | 简单任务用直接指令。大量材料、示例和不同类型约束混在一起时，可选用描述性的成对 XML 标签，如 `<task>`、`<sources>`、`<constraints>`。素材原有标签要按字面引用或转义，保留可信边界。标签用于组织输入；输出仍遵循用户格式。[Claude 提示实践](https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/claude-prompting-best-practices) |
| GLM-5.4 | 采用通用简报；仅在宿主确认型号、渠道与接口能力后使用对应功能。官方型号页记录了能力和开放渠道。[GLM-5.4 官方说明](https://docs.z.ai/guides/llm/glm-5.4) |
| DeepSeek | 采用通用简报。需要机器解析的 JSON，且实际接口支持时，按官方文档配置 JSON 输出并提供目标结构，校验有效性及必填字段。[DeepSeek JSON Output](https://api-docs.deepseek.com/guides/json_mode) |
| Kimi | 采用通用简报。多文件都标注来源和用途；只有已接入相应能力时才调用文件问答或结构化输出。[Kimi 开放平台文档](https://platform.kimi.com/docs/get-api-key) |
| MiniMax | 采用通用简报。需要工具调用或机器可读输出时，按实际客户端的接口和模型能力配置。[MiniMax API 文档](https://platform.minimax.io/docs/api-reference/text-openai-api) |
| 其他或未知 | 采用通用简报，所需能力按当前宿主验证。 |

需要复现实验时，记录准确模型标识、客户端、推理强度和实际启用的工具。某个型号没有对应实验时，保留表中的文档依据和通用默认值。
