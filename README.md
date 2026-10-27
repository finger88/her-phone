# 她的手机

> 你纠正的不是一句回答，而是下一次的她。

一次关于人格、连续记忆、可纠正理解与下一次相见的AI关系实验。这里保存项目介绍页、精选Agent参考材料，以及继续迭代所需的构建与发布流程。

**[打开项目介绍](https://finger88.github.io/her-phone/)** · [阅读基础包指南](docs/reading-guide.md) · [Agent参考目录](agent-reference/) · [项目脉络与边界](docs/project-context.md)

## 先认识这个想法

她能有自己的观察，也可能看错。用户的纠正不只应该得到一句道歉，还应该让旧判断失效，并改变下一次她怎样理解这件事。

“她的手机”起于AI原生手机创客项目，原始工作名为“它的手机”，后续资料出现“时迹”和“拾光”。本仓库并不是白艾莉的源码或衍生项目；白艾莉只是介绍页面向读者的兴趣参考。两个项目没有合作或功能优劣比较的含义。

## 从哪里开始

| 想了解什么 | 文件 |
| --- | --- |
| 她是谁，怎样面对不知道和看错 | [SOUL.md](agent-reference/SOUL.md) |
| 原始表达、事实、判断、纠正怎样分开 | [MEMORY.md](agent-reference/MEMORY.md) |
| 一次纠正怎样改变下一次 | [接受用户纠正](agent-reference/skills/accept-user-correction/SKILL.md) |
| 下次相见为什么还需要开场书签 | [约定相见](agent-reference/skills/schedule-rendezvous/SKILL.md) |
| 主Agent怎样组织完整流程 | [AGENTS.md](agent-reference/AGENTS.md) |

参考目录共25份原始文本，包含核心人格/记忆/安全/心跳协议、12项Skill及相关参考。它们是开发与阅读起点，不是一键安装包。尚未在此仓库证明真实手机接口、后台唤醒、正式安装和长期使用效果。

## 目录

```text
src/index.template.html       宣传页源稿：文案、样式、情境与原文阅读
assets/hero.webp              原创AI概念视觉，不是实机界面
agent-reference/              精选手机Agent协议与Skill
docs/                        阅读路线、项目背景和来源清单
scripts/build.mjs             单文件HTML、资料ZIP和来源清单构建
tests/site.test.mjs           原文/ZIP一致性、脚本语法、隐私路径等检查
.github/workflows/pages.yml  检查通过后发布GitHub Pages
```

## 本地迭代

需要Node.js 22或更高版本：

```bash
npm ci
npm run build
npm test
```

构建输出：

- `dist/index.html`：网站入口，也是可离线打开的单文件；内嵌图像、图标、四份原文和资料ZIP。
- `dist/downloads/her-phone-source-kit.zip`：源码阅读基础包。
- `dist/downloads/her-phone-introduction.html`：可单独传阅的离线介绍页。
- `dist/source-manifest.json`：基础包原文件SHA-256清单。

通常只需要修改`src/index.template.html`。源文件、基础包和介绍页由同一份参考目录构建，避免三处内容独立漂移。提交推送至`main`后，GitHub Actions会重新构建、检查并发布；进展见仓库Actions页。

## 事实与使用边界

- 页面情境为固定示意，不连接模型、不读取设备、不采集输入。图像为原创AI概念视觉。
- `.metadata.json`标记1.6.0，`IDENTITY.md`仍为1.5.0；历史冲突原样保留，不当作已核定的发布版本。
- 本仓库不包含完整内部资料库、私人会话、真实记忆、账号密钥、业务合同或AI项目全流程管理助手的业务代码。
- 本仓库是按项目持有者本次要求公开的资料与宣传页，不因此自动授予商用、再许可或其他素材使用权。归属和第三方许可见[RIGHTS.md](RIGHTS.md)。
