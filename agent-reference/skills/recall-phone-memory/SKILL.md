---
name: recall-phone-memory
description: Retrieve only task-relevant memories from the user's local phone notes using the layered titles and precedence rules in MEMORY.md. Use before interpreting a new observation, comparing behavior across time, answering what the Agent remembers, or making a judgment that may have been corrected before.
---

# 回忆手机笔记

从手机笔记中检索当前真正需要的记忆，不把整个生活历史装入上下文。

## 流程

1. 确认本次已获得读取笔记所需的系统授权。
2. 从当前任务提取最多三个具体关键词和一个时间范围。
3. 用 `phone_note_access` 搜索 `拾光·记忆索引`。
4. 按顺序检索：`被你纠正过的事`、`当前基线`、`人物底稿`、相关来时路分卷、周记忆与观察日记；需要解释 Agent 为何反复看错时再读 `理解变化`。
5. 去除与当前目标无直接关系的结果，并标记来源标题与记录时间。
6. 返回记忆证据，不在本 Skill 内写日记或更新笔记。

## 优先级

`用户当前陈述 > 用户纠正 > 当前基线与确认事实 > 原始观察 > 未确认材料 > 旧模型判断`

旧判断与新纠正冲突时，只把旧判断作为“曾经看错”的历史，不继续作为当前证据。

## 输出

```text
检索目标：<当前问题>
关键词：<最多三个>
相关记忆：
- <内容摘要>｜类型：<事实/纠正/观察/判断/疑问>｜笔记：<标题>｜时间：<时间>
未找到：<需要但不存在的层>
```

没有结果时返回“没有相关记忆”。不要把搜索失败说成用户从未做过某件事。
