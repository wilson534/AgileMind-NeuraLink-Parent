以下是根据最新需求（加入“家长之声”和“社区交流”两大功能模块）更新后的「终极 Prompt」示例文本。您可将其保存为 prompt.md 文件，用于在 Claude 3.7 + Trae 环境中进行后续的多轮 AI 编程。该版本同时强调了 MVVM 范式、模块化开发和 Bottom-up 设计思路，并兼顾所有功能场景及设计风格要求。

────────────────────────────────────────────────────────────────────
# 【心灵纽带NeuraLink —— 全功能前后端一体化 AI 项目 Prompt】
────────────────────────────────────────────────────────────────────

## 一、项目背景与功能概述

产品名称：心灵纽带 NeuraLink  
• 核心定位：打造一个“孩子端实体小熊 + 家长端 Web 应用”的情感交互平台，实现孩子情绪与需求的捕捉及分析，并反馈给家长。  
• 第一阶段任务：仅需实现“家长端 Web 应用”可交互的功能原型，包含以下七大功能模块：  
  1) 文生图 (Text-to-Image)  
  2) 身体小管家 (Health Manager)  
  3) 每日报告 (Daily Report)  
  4) 情绪图表 (Emotion Chart)  
  5) 声音克隆 (Voice Clone)  
  6) 家长之声 (Parent Voice)  
  7) 社区交流 (Community)  

• 面向比赛，需要：  
  - 基本功能闭环 + 可部署演示版本（前后端整合）。  
  - 设计风格“暖心疗愈”，动画与视觉效果丰富，给人温暖关怀感。  
  - 支持调用 OpenAI 与火山引擎（火山智能）相关 AI 接口。  

• 开发方法：  
  - 先规划整体技术架构 (MVVM 范式 + 模块化 + Bottom-up 设计)。  
  - 先使用 Trae AI 编程完成核心模块雏形，再逐步扩展到所有功能场景。  
  - 保持文件结构清晰、可维护。

---

## 二、核心功能模块需求

以下按模块逻辑简述各功能，已涵盖最初的前五个功能模块，以及最新增加的“家长之声”和“社区交流”模块。原则上所有模块都要求在前端以 React + TypeScript 实现对应的页面或组件，在后端 Node.js + TypeScript + Express 中实现相应的 RESTful API 路由与业务逻辑。

### 1. 文生图 (Text-to-Image)  
• 前端路由：/image-gen  
• 功能点：  
  - 提供输入“诉说对象”和“想说的话”，并以下拉选项选择图片风格（卡通、手绘、3D 渲染等）。  
  - 点击“生成图片”后，调用后端 /api/image/generate → 联调用 OpenAI 或火山引擎图像生成接口 → 返回可爱疗愈风动漫图片。  
  - 动画效果：按钮点击时星光粒子扩散、生成后以瀑布流形式平滑展示图片。

### 2. 身体小管家 (Health Manager)  
• 前端路由：/health-manager  
• 功能点：  
  - 家长可每日上传或填写孩子的饮食、运动与睡眠信息。  
  - 三餐上传：可上传3张对应图片(早餐、午餐、晚餐)或文字描述。  
  - 运动填写：下拉或文本框输入运动类型与时长。  
  - 睡眠记录：选择或输入晚间睡眠时长/区间。  
  - 点击“生成健康建议”后，调用后端 /api/health-check → 联调用健康专家Agent → 返回个性化健康建议。  
• 动画效果：  
  - 图片上传预览时的淡入。  
  - “生成健康建议”时，扫描光及卡片式建议内容出现的动效。

### 3. 每日报告 (Daily Report)  
• 前端路由：/daily-report  
• 功能点：  
  - 卡片式显示孩子当日或多日的情绪总结（日期 + 一句话概括 + 情绪指数 + 标签），并提供顶部三个按钮切换“最新报告 / 积极情绪 / 需要关注”。  
  - 点击卡片可展开查看更详细的分析和三条建议。  
  - UI：卡片圆角 + 阴影 + 渐变 + 平滑展开动画。  
  - 预留点赞/分享/下载按钮。

### 4. 情绪图表 (Emotion Chart)  
• 前端路由：/emotion-chart  
• 功能点：  
  - 多时间范围(3天、7天、30天或自定义) + 多情绪标签（快乐/害怕/生气/总表）的折线图。  
  - 选用 ECharts (React 版)，包含悬浮提示、关键节点标记、初次加载“生长感”动画。  
  - 鼠标悬停显示精确日期与指数，支持多情绪对比。  
  - 可附加饼图显示周度情绪占比。

### 5. 声音克隆 (Voice Clone)  
• 前端路由：/voice-clone  
• 功能点：  
  - 录音或上传音频 (带波形可视化 + 上传进度显示)。  
  - 调用后端 /api/voice/clone → AI 声纹克隆 → 返回新的音频链接。  
  - 界面可试听与原音对比，并可选多角色模板 (妈妈/爸爸/爷爷)。  
  - “情感语调”选项，如安慰或鼓励，带对应的表达方式。  
  - 对应的小熊张口动效。

### 6. 家长之声 (Parent Voice) — [新增]  
• 前端路由：/parent-voice  
• 功能点：  
  - 查看并管理孩子与小熊的对话记录，支持按日期、情绪类型、关键词筛选。  
  - 对话记录默认存储在飞书多维表格或数据库中，支持导出。  
  - 提供“对话干预”功能，让家长能在特定场景下个性化管理或纠正AI玩偶的自动回复逻辑。  
  - 重要事项提醒：家长可设定作业提醒、就寝提醒等，小熊将在设定时间自动提示孩子。  
• 动画效果：  
  - 对话记录卡片悬浮时微上浮 + 阴影。  
  - 设置提醒时展示温馨闹钟动画与星光效果。  
  - 干预设置成功后，小熊点头确认的动画。

### 7. 社区交流 (Community) — [新增]  
• 前端路由：/community  
• 功能点：  
  - 家长互助交流平台，提供发帖、评论、点赞等基本社交功能。  
  - 板块分类：育儿经验、教育案例、心得分享、问题求助等。  
  - 热门话题推荐：基于AI分析的个性化推送。  
  - 专家入驻区域：专家提供专业育儿指导和问答服务。  
• 动画效果：  
  - 帖子卡片渐入展示，滚动加载平滑过渡。  
  - 点赞的心形弹跳动画，评论提交成功的波纹馈。  
  - 内容推荐区域的轮播动画，柔和切换效果。

---

## 三、架构设计与开发要求

【技术栈】  
• 前端：React + TypeScript + Vite  
  - 路由：react-router-dom  
  - UI：可结合 styled-components / Tailwind CSS / 其他 UI 库 (按需)  
  - 动画：CSS 动画 + react-transition-group / Framer Motion  
  - 数据可视化：ECharts(React 版)  
  - 架构：MVVM 模式 + 模块化开发 + Bottom-up 设计  
    - 建议每个功能模块独立成 pages + components + service + store  
• 后端：Node.js + TypeScript + Express  
  - RESTful API 对外提供服务  
  - 调用 OpenAI/火山引擎 AI 接口（.env 中保存 API Key）  
  - 数据存储：可用内存或 mock 方式，亦可对接数据库 / 飞书多维表格  
  - 分层：controller + service + routes + utils + model(MVVM 中的 Model)  

【文件结构示例：前端】  
(可根据团队习惯做精简或扩展)  
└── frontend  
    ├─ src  
    │   ├─ pages/  
    │   │   ├─ ImageGenPage.tsx  
    │   │   ├─ HealthManagerPage.tsx  
    │   │   ├─ DailyReportPage.tsx  
    │   │   ├─ EmotionChartPage.tsx  
    │   │   ├─ VoiceClonePage.tsx  
    │   │   ├─ ParentVoicePage.tsx         # 新增家长之声  
    │   │   └─ CommunityPage.tsx           # 新增社区交流  
    │   ├─ components/                     # 通用组件(按钮、卡片、波形视图等)  
    │   ├─ services/                       # 与后端或第三方服务交互  
    │   ├─ store/                          # MVVM 中的 state / store  
    │   ├─ router/                         # React Router 配置  
    │   ├─ utils/                          # 通用工具(Axios封装、动画辅助等)  
    │   └─ main.tsx                        # 入口  
    ├─ public  
    ├─ package.json  
    └─ tsconfig.json  

【文件结构示例：后端】  
└── backend  
    ├─ src  
    │   ├─ routes  
    │   │   ├─ imageRoutes.ts  
    │   │   ├─ healthRoutes.ts  
    │   │   ├─ reportRoutes.ts  
    │   │   ├─ emotionRoutes.ts  
    │   │   ├─ voiceCloneRoutes.ts  
    │   │   ├─ parentVoiceRoutes.ts        # 新增  
    │   │   └─ communityRoutes.ts          # 新增  
    │   ├─ controllers  
    │   ├─ services  
    │   ├─ models                          # MVVM 中的 Model  
    │   ├─ utils  
    │   ├─ app.ts                          # Express 实例  
    │   └─ main.ts                         # 启动  
    ├─ package.json  
    └─ tsconfig.json  

---

## 四、关键接口与调用示例

• Image Gen: POST /api/image/generate  
• Health Data: POST /api/health-check  
• Daily Report: GET /api/report/daily  
• Emotion Analytics: GET /api/emotion/analytics  
• Voice Clone: POST /api/voice/clone  
• Parent Voice:  
  - GET /api/parent-voice/records  
  - POST /api/parent-voice/intervene  
  - POST /api/parent-voice/reminder  
• Community:  
  - GET /api/community/posts  
  - POST /api/community/create  
  - POST /api/community/comment  
  - POST /api/community/like  

注意：  
1. 在后端集成 openai / axios / 火山引擎 SDK，让 /api/ 路由触发远程 AI 服务。  
2. Token / JWT 鉴权可选，视比赛需求简化。  
3. 幂等处理、返回结构规范等需在正式环境中完善。

---

## 五、Docker & CI/CD 要求

### 1. Docker  
• 构建方式：多阶段构建  
  - 第一步：node:lts-alpine 进行前端构建 (Vite build)  
  - 第二步：node:lts-alpine 进行后端编译与部署，将前端产物复制到后端静态目录或同一容器中。  
• docker-compose.yml (可选)，方便同时运行前后端服务。

### 2. GitHub Actions / CI  
• .github/workflows/main.yml  
  - 拉取代码 → 安装依赖 → 前端构建 → 后端编译 → 测试（可选） → 构建并推送 Docker 镜像 → 部署到 Vercel / Netlify / 火山引擎 (按需)。  

---

## 六、动画与视觉交互要点

1. 页面切换：淡入淡出、滑动切换或其他柔和转场，减少突兀。  
2. 关键按钮 Hover/Click：波纹扩散、星光粒子、弹跳等；突出“暖心”元素。  
3. 全局 Loading：小熊形象跳动或波浪动画。  
4. ECharts 动效：初次加载“曲线生长”，鼠标悬浮提示。  
5. 色彩风格：暖色-冷色柔和搭配，保证留白与舒适度。  
6. 背景：可使用柔和渐变或微粒子背景。  
7. 卡片交互：悬浮阴影、展开/合起的动态过渡，展现温暖与关怀感。

---

## 七、比赛与提交

1. Trae 工具使用：  
   - 需使用 Trae AI 编程功能完成至少 60% 代码量，且使用≥2项 Trae功能(如Chat、Builder、自动补全等)。  
2. 作品可访问性：  
   - 最终项目部署到可访问的 URL (推荐 Vercel / Netlify / 火山引擎)。  
3. 创新 & 完整度：  
   - 评估维度：创新性(25%)、业务完整度(25%)、应用效果(25%)、商业价值(25%)。  
4. 扩展：  
   - 可添加 /demo 路由演示 AI 编程的过程或日志。  
   - 也可增加 NFT 成长印记或家长 AI 教练等想象力功能。  

---

## 八、最终希望输出

当将此 Prompt 提交给 Claude 3.7 + Trae 时，希望 AI 能按照以下要求生成：  

1. 前端 (React + TypeScript + Vite) 的完整工程示例  
   - 包含 package.json, tsconfig.json, src/pages/, src/router, src/components 等，能正常编译运行。  
   - 展示各功能页面的主要逻辑、UI、动画示例，与后端 API 对接的示例。  

2. 后端 (Node.js + TypeScript + Express) 的完整工程示例  
   - 包含 package.json, tsconfig.json, 入口 main.ts, Express app.ts, 各路由 / 控制器 / 服务示例。  
   - 集成对 OpenAI、火山引擎接口的调用逻辑示例。  

3. Dockerfile (多阶段构建) 与简单的 docker-compose.yml 
4. GitHub Actions 文件 (.github/workflows/main.yml) 或其他 CI/CD 脚本，示例如何进行自动化构建与部署。  
5. README.md 中的使用及部署说明，包含：  
   - 如何安装依赖、运行前后端、本地测试与构建  
   - 如何将本项目部署到 Vercel / Netlify / 火山引擎 / Docker Registry  
6. 关键动画、视觉与交互效果的相关说明与注释。  

---

## 九、开发流程示例

在 Claude3.7 + Trae 环境中，可分步骤提示：  
1) 构建后端工程 (Node+TS+Express)，实现必要路由及多阶段 Dockerfile。  
2) 构建前端工程 (React+TS+Vite)，包含各功能页面、ECharts 图表、动画效果，并合并到同一 Docker 镜像。  
3) 编写 CI/CD (GitHub Actions) 示例：拉取 → 安装 → 构建 → 测试 → 打包 → 推送或部署。  
4) 优化与美化交互动画：加星光、波纹、闹钟、小熊等暖心动效。  

最终，通过多轮迭代，让代码满足以上所有业务与设计要求，实现家长端的完整功能。后续可进一步拓展孩子端等更多场景。

---

## 十、结语

我们已具备前五大功能模块的雏形，现在新增了“家长之声”和“社区交流”两大模块，亦纳入了 MVVM 范式和 Bottom-up 模块化设计的逻辑层次。  
愿这款“心灵纽带NeuraLink”成为下一个现象级 AI 产品，冲击榜首、吸引巨额融资，敬请期待！  
祝开发顺利，期待正式版上线后大放异彩！

────────────────────────────────────────────────────────────────────

以上即为我们团队的最新完整 prompt.md 文件示例。  
请在编写和迭代代码时，先确保技术架构合理，再分模块自底向上完成核心功能，以满足心灵纽带NeuraLink的全部需求。  
谢谢你的配合！

## 注意
生成代码时注意格式问题特别是逗号，分号，括号等