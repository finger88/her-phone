# 导入数据格式

## 来源记录

    source_id: SRC-YYYYMMDD-NNN
    import_id: IMPORT-YYYYMMDD-NN
    filename: 原文件名
    imported_at: 时间
    time_range: 已识别时间范围
    status: scanning | processing | pending_review | completed | paused
    persistence: retained | session_only | unknown
    sensitivity: normal | private | highly_sensitive
    processed_sections: 已处理章节
    pending_sections: 待处理章节

## 事件草稿

    event_id: EVT-时间或序号
    title: 简短事件名
    time: 明确时间或未知
    event: 发生了什么
    action: 用户实际做了什么
    then_view: 用户当时如何理解
    current_view: 当前理解，若有
    uncertainty: 仍不确定的内容
    sources: 来源 ID 与章节
    status: pending | confirmed | modified | rejected | deferred

## 去重键

优先使用时间范围、事件对象、地点、项目名和关键行动组合判断。只凭相同关键词不得自动合并。

