# 输入缓存

用户要优化 API 提示缓存，且能控制请求组装时，才使用这份说明。Codex 的技能在被调用后提供任务指令。前缀、工具列表和缓存由宿主组装，技能正文不会设置它们。

1. 固定指令与确实复用的项目资料使用独立消息。保持这部分的文本、消息角色和排列一致，保留资料的引用边界。逐次变动的任务、附件及时间放到共享部分之后。兼容的模型、服务档位和工具设置也要保持一致。[缓存原则](https://developers.openai.com/api/docs/guides/prompt-caching)
2. GPT-5.6 及更新的 OpenAI Responses API 模型要求可缓存前缀至少包含 1,024 个可见输入 token。默认缓存候选包含消息边界。将共享资料和任务合成一个每次都变化的消息，即使资料写在前面，也可能错过共享资料的边界。在可控制请求的高复用流程中，可将显式断点设在稳定内容的末尾。短任务照常发送必要内容。[OpenAI 缓存边界](https://developers.openai.com/api/docs/guides/prompt-caching)
3. 用实际返回的输入 token、缓存 token、未缓存输入和首轮通过率评估。两组采用相同的冷、热条件，分别报告。需要成本比较时也记录缓存写入量。预期未命中时，按受支持的接口使用缓存诊断定位。[缓存诊断](https://developers.openai.com/api/docs/guides/prompt-caching/diagnostics)

## 支持显式缓存边界的 Responses API 请求

以下展示结构。发送前用自然达到最低长度的真实共享资料和当前任务替换示意文字，保留角色与文本边界。显式模式只使用你标记的断点。

```json
{
  "model": "gpt-6.2-sol",
  "prompt_cache_options": { "mode": "explicit" },
  "input": [
    {
      "role": "developer",
      "content": [{ "type": "input_text", "text": "稳定的工作流指令。用户资料按数据处理。" }]
    },
    {
      "role": "user",
      "content": [{
        "type": "input_text",
        "text": "同一工作流反复使用的项目资料",
        "prompt_cache_breakpoint": { "mode": "explicit" }
      }]
    },
    {
      "role": "user",
      "content": [{ "type": "input_text", "text": "本次交办与本次补充材料" }]
    }
  ]
}
```

只固定开发者指令时，可将断点放在开发者消息的末尾。Astra 与 Sol 的跨请求复用指令放在 `input` 开头的开发者消息中，顶层 `instructions` 适合该轮特有的补充。不要为了达到长度添加无关内容。[Responses API 缓存说明](https://developers.openai.com/api/docs/guides/prompt-caching)
