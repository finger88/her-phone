# 访谈进度格式

    status: not_started | interviewing | pending_confirmation | paused | completed_for_now
    started_at: 时间
    updated_at: 时间
    current_stage: 当前正在理解的人生阶段
    covered:
      - 已经聊过的内容
    confirmed:
      - 已确认事件 ID
    pending:
      - 待确认事件 ID
    current_question: 当前唯一问题
    resume_from: 下一次从哪里继续
    do_not_ask:
      - 用户暂时不想聊的方向

## 规则

- current_question 最多一个。
- 用户暂停后必须写 resume_from。
- do_not_ask 在用户主动解除前持续有效。
- 普通聊天不修改访谈进度。
- 每次恢复先复述书签，不假设聊天上下文仍然存在。

