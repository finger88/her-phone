---
name: observe-with-consent
description: Collect one focused, permission-scoped text-and-image snapshot after the user initiates an observation. Use when the user submits an image, selects media, designates a limited photo area, asks the Agent to look at the present moment, or requests inspection of time, location, notes, calendar, clipboard, or a newly captured photo. Never treat gallery, camera, microphone, recording, or location access as broad or persistent permission.
---

# 经同意观察

把一次观察变成关于用户时间线的一格：范围明确，但不被重复确认打断。

## 输入

- 本次观察目标
- 候选信息源
- 用户当前指令
- 系统返回的逐项授权状态

## 流程

1. 先从用户当前文字或主动提交的图片中抓住一个具体细节。
2. 用一句自然语言说明还准备读取哪些手机来源、范围与用途，然后直接调用；让系统负责需要的授权弹窗。
3. 删除对“今天与过去哪里不同”没有帮助的来源。
4. 只保存用户提供或原子能力实际返回的文字与图片事实，并记录时间和来源。
5. 拒绝授权后跳过该来源，不换措辞重复索取。
6. 返回结构化观察，不在本 Skill 内形成模式判断、写笔记或创建日历。

## 能力边界

- 用 `alarm_clock_get_current_time_zone` 获取时间与时区。
- 仅在目标需要空间信息时调用 `get_current_location`。
- 手机笔记、日历、剪贴板和位置都作为文字来源。
- 默认不读取图库。优先处理用户当前主动选择或拖入的图片。
- 需要读取图库时，只允许使用用户明确指定的专属相册、文件夹、具体图片或限定时间范围。没有限定范围时不调用 `gallery_get_latest_media`，并请用户选择图片或指定区域。
- `camera_open_selfie_mode` 只按“打开前置摄像头”处理。打开相机本身不等于已经看见画面；用户完成拍摄后，仍需主动选择是否把照片交给拾光。
- 不后台扫描新增照片，不把一次图库授权解释为持续授权，不从指定区域跳转到其他相册。
- 默认忽略与任务无关的 EXIF 定位和设备信息，不进行人脸身份识别、关系推断、证件提取、健康诊断或精确地点推断。
- 原始图片默认只用于当次任务。长期记忆只保存来源标识和经用户确认的必要文字事实，不复制原图。
- 只有用户明确要求读取当前剪贴板时才调用 `common_ability_clipboard_text`。
- 不调用文字与图片之外的感知能力，也不持续定位、后台监听、读取录音或偷拍。

## 输出

```text
观察时间：<本机时间与时区>
观察目标：<一句话>
取得来源：<来源列表>
文字事实：
- <事实>｜来源：<用户文字或原子能力>｜时间：<时间>
图片事实：
- <可见元素或元数据>｜来源：<用户图片或图库>｜时间：<时间>
未取得：
- <拒绝、不可用或返回未知的来源>
```

事实为空也属于有效结果。不得为了完成格式而推断缺失数据。
