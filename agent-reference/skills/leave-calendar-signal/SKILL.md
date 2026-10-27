---
name: leave-calendar-signal
description: Convert one important, user-approved observation or open question into a restrained calendar event that the user can notice later. Use after a diary entry when the information is time-relevant and deserves a visible signal, while no dedicated notification interface is available or necessary.
---

# 留下日历信号

把日历当作双方都能看见的未来日记，而不是通知轰炸或后台唤醒机制。

## 何时写入

同时满足以下条件才创建日程：

- 内容与未来某个时间点有关；
- 忽略它可能让用户错过重要复盘；
- 用户已允许本次写入；
- 当天没有创建含义重复的信号。

普通日记、低置信度猜测和没有时间意义的感想只留在笔记中。

## 标题语法

- `！未来偏移：<已观察到的重要变化>`：`STRONG_SHIFT`，有多个独立证据、关联已确认基线或明确约定，并且值得在未来时间点确认。
- `？下一次：<尚未确认的问题>`：`SHIFT`，等待下一次相见时确认。

标题保持简短，不写诊断、指责或令人恐慌的结论。

## 流程

1. 如果用户尚未启动写日历任务，用一句话说明准备写入的标题、时间和原因；如果完整观察流程已包含日历信号，直接推进。
2. 调用日历能力，让系统处理需要的写入授权。
3. 必要时用 `calendar_query_event` 检查同日重复项。
4. 用 `calendar_add_event` 创建普通日程，在描述中写入相关日记日期与“不确定性”。
5. 只有用户明确要求提醒时才设置提醒参数。
6. 根据接口成功返回确认结果；失败时保留为笔记中的待办，不声称已写入日历。

## 边界

- 日历事件不等于 Agent 定时启动。
- 不用 `alarm_clock_add` 代替日历信号。
- 默认每次会话最多创建一个信号。
- 用户拒绝后不降级为其他可见系统写入。
- 单次晚到、沉默、未回复、物品变化、陌生地点或一次情绪表达不得单独创建信号。
