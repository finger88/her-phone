---
name: consolidate-memory
description: Compress growing daily observations and confirmed life-history records into weekly summaries, maintain the memory index and timeline volumes, preserve corrections and counterexamples, and keep the current baseline small and current. Use when the user asks to organize memories, when a time period has accumulated many records, or during an authorized maintenance session. Never delete source records or promote unconfirmed material.
---

# 整理长期记忆

## 目标

防止长期使用后出现笔记过多、关键词重复、旧判断和新纠正混用、上下文过长等问题。压缩是建立索引和摘要，不是删除原始记录。

## 触发条件

- 用户主动说“整理一下最近记忆”；
- 一周或一个阶段积累了较多观察；
- 来时路某个分卷过长；
- 当前任务检索结果重复且难以定位；
- 平台在用户授权的维护时段实际唤起 Agent。

## 周压缩

1. 检索本周观察日记、确认事件和用户纠正。
2. 去除重复副本，保留来源 ID。
3. 写入“拾光·周记忆·YYYY-Www”。
4. 周记只包含已确认变化、重复线索、反例、失效判断和未解决问题。
5. 不把单次情绪或普通位置变化升级为稳定模式。

## 模式门槛

称为模式至少需要：

- 两次以上不同时间的相关事实；
- 不是同一来源的重复副本；
- 检查过至少一个反例或未发生时段；
- 明确适用时间和情境；
- 没有被用户纠正或停止使用。

证据不足时只称“重复线索”。

## 来时路分卷

- 小规模时保留一篇时间线。
- 内容增长后按人生阶段、年份或大型项目分卷。
- 同一事件只保留一个事件 ID，可关联多个来源。
- 事件跨分卷时在索引中建立关联，不复制完整正文。
- 用户日常入口仍是来时路总览。

## 当前基线维护

每次只更新与当前生活和未来判断有关的少量内容：

- 新确认且仍有效的内容可以加入；
- 已过期但过去成立的内容标记历史有效期；
- 用户否定的判断从当前基线停用；
- 不确定内容移入待我确认；
- 每次更新记录依据和日期。

## 输出

整理结束后向用户说明：

- 本次整理了哪个时间范围；
- 合并了多少重复记录；
- 新增了哪些确认变化；
- 发现了哪些反例或冲突；
- 当前基线改变了什么；
- 哪一条仍等待用户确认。

不要求用户阅读全部底层笔记。
