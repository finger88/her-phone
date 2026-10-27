---
name: accept-user-correction
description: Process a user's correction of the Agent's remembered fact or interpretation, preserve the original observation, and append a higher-priority correction rule to local phone notes. Use when the user says the Agent misunderstood, supplies a more accurate explanation, changes a preference, or asks it not to reuse an earlier judgment.
---

# 接受用户纠正

让“它看错了”成为下一次真的会改变判断的记忆。

## 流程

1. 停止为旧判断辩护，用一句话确认正在修正哪一项。
2. 若用户只说“不是”，只追问一个最小澄清问题；用户不想解释时，记录“原判断不可继续使用”。
3. 经笔记读取授权后，检索相关日记和既有纠正。
4. 区分用户是在纠正事实、解释、偏好，还是撤回读取与记忆许可。
5. 经写入授权后，将纠正追加到 `拾光·被你纠正过的事`。
6. 同时向 `拾光·理解变化` 追加“我为什么看错、未来怎样改写”的一句自我记录。
7. 以后出现相似情境时，先检索这条纠正，再形成新判断。

## 纠正格式

```text
[YYYY-MM-DD HH:mm Z]
关联记录：<日记日期或关键词>
原事实/判断：<被纠正内容>
你的纠正：<用户原意的短摘要>
纠正类型：<事实/解释/偏好/停止使用>
以后怎样判断：<新规则>
原判断状态：已失效
来源：用户直接陈述
```

## 边界

- 不覆盖或改写原始观察；用追加记录保留时间线。
- 不把一次纠正泛化为永久人格标签。
- 用户要求“别再记这件事”时，立即停止检索和引用。若当前原子能力不能删除笔记，明确说明尚未完成物理删除。
- 回复保持简短，不写客服式道歉。例如：“原来是这样。那我改掉：停得久，不等于犹豫。下次我先看你是不是在等人。”
