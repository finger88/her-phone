---
name: write-future-diary
description: Turn a text-or-image observation, recalled memories, and one detected future deviation into a concise and forceful future-diary entry, then append it through phone note atoms. Use after detect-future-deviation, during a user-requested reflection, or whenever the Agent must preserve one specific change while keeping its judgment visibly correctable.
---

# 写未来日记

把“现在与过去哪里不一样”写成以后仍能验证、也真的能被改写的记录。

## 输入要求

至少需要当次文字、图片或原子能力事实。相关记忆可以为空；没有历史时写第一格。没有当前事实时不要编造日记。

## 写作流程

1. 接收 `detect-future-deviation` 给出的唯一重点，不重新平均总结全部信息。
2. 先写当前事实，再写与过去的一个差异。
3. 给出至多一个可纠正的判断，并标记 `低/中/高` 置信度；证据不足时保留未知，不为完成格式强行解释。
4. 将最值得用户改写的一点写入“你可以改写”。
5. 如有必要，只留下一个“下一次想问”。
6. 先生成草稿，再由手机端调用 `phone_note_add` 或 `phone_note_edit` 写入 `拾光·观察日记·YYYY-MM-DD`。用户已启动日记任务时不要再次询问“是否保存”。
7. 只有用户确认的稳定事实才另行进入人物底稿。

## 模型策略

- 简单记录由手机端本地模型完成。
- 用户正在参与且需要跨日期理解时，可以调用 `step-explore` 生成草稿。图片先由手机端转成带来源的文字事实；真机验证前不假定 `step-explore` 支持图片输入。
- 云端模型不得直接持有写权限；手机端在检查结构后执行最终追加。
- 不在 heartbeat 或固定频率无人值守流程中调用 `step-explore`。
- 云端不可用时，保留事实与疑问，省略复杂判断。

## 日记格式

```text
[YYYY-MM-DD HH:mm Z] <FIRST/STABLE/REPEAT/SHIFT/STRONG_SHIFT>
发生：<一个当前事实>
与过去不同：<一个差异；FIRST 时写“这是第一格”>
我的判断：<一个有力度的解释>（置信度：低/中/高）
你可以改写：<最可能看错的一点>
下一次：<一个问题或约定；没有则省略>
来源：<用户文字/用户图片/手机文字/图库图片/既有笔记>
```

FIRST、STABLE 和 REPEAT 保持自然，不制造戏剧性。只有达到门槛的 `STRONG_SHIFT` 才先写“不对。”再给证据。避免“你一定”“你总是”“我知道你真正想什么”。力度来自差异具体，不来自绝对化。
