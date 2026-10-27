# 约定相见记录结构

固定笔记标题：`拾光·约定相见`

每次约见追加一个独立记录：

```yaml
meeting_id: MEET-20260815-001
status: proposed | confirmed | completed | cancelled | missed
trigger_type: discovery | deadline
reason: 为什么值得在这个时间见面
scheduled_at: 带时区的日期时间
remind_before: 提前多久
first_message: 下次会话的第一句话
linked_item:
  type: memory | baseline | task | calendar | none
  id: 稳定 ID 或空
calendar:
  title: 拾光·约定相见｜我们约好的事
  title_mode: private | explicit
  event_id: 接口返回 ID 或空
  query_result: none | duplicate | possible_duplicate | failed | unsupported | denied
  result: success | failed | unsupported | denied | pending
alarm:
  name: 拾光来电｜我们约好的事
  alarm_id: 接口返回 ID 或空
  enable_result: enabled | disabled | unknown | unsupported | denied
  result: success | failed | unsupported | denied | pending
ringtone:
  mode: system_default | existing_theme
  result: success | unsupported | not_requested
created_by: user | agent
created_at: 带时区的日期时间
updated_at: 带时区的日期时间
outcome: 完成后的简短结果或空
```

## 状态转换

- proposed：Agent 提议，尚未得到用户确认。
- confirmed：用户已同意，或用户直接下达了明确设置指令。
- completed：用户到场并完成了约定主题。
- cancelled：用户取消；不再主动恢复。
- missed：约定时间已过且用户没有进入会话。不得据此推断用户态度。

每次更新保留原 meeting_id。修改时间时更新原记录和外部事件，不为同一事项另建重复约见。
