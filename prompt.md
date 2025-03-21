以下是一份更加聚焦、层次清晰且去除多余选择的「终极 Prompt」示例，可直接用于提交给 Claude3.7 进行全栈 AI 编程。此 Prompt 将确保大模型完整获取我们的核心需求，生成一个基于 React（TypeScript）+ Node.js（TypeScript + Express）+ ECharts + Docker + GitHub Actions 的前后端项目原型，满足比赛要求，且在视觉、交互、动画上充分体现“暖心疗愈”的设计风格。祝你冲击 APP Store 榜首、拿下巨额融资，一切顺利！

────────────────────────────────────────────────────────────────────
# 【心灵纽带NeuraLink —— 前后端一体化 AI 项目 Prompt】
────────────────────────────────────────────────────────────────────

## 一、项目背景与功能概述

产品名称：心灵纽带NeuraLink  
• 目标：打造一个“孩子端实体小熊 + 家长端 Web 应用”的情感交互平台，用于捕捉并分析孩子的日常情绪、语音及需求，反馈给家长。  
• 当前只需实现家长端 Web，演示五大功能模块。  
• 面向比赛，需具备可交互的功能原型，同时能调用 OpenAI 与火山引擎的 AI 服务。

---

## 二、核心模块需求

### 1. 文生图 (Text-to-Image)  
• 路由：/image-gen  
• 功能点：  
  - 输入“诉说对象”与“想说的话”，加下拉选项选择图片风格（卡通、手绘、3D 渲染等）。  
  - 点击“生成图片”后，调用后端 API → 联调用 OpenAI 或火山引擎的图像生成接口 → 返回可爱疗愈风动漫图片。  
  - 动画效果：按钮点击时星光粒子扩散、生成后的图像以瀑布流形式平滑展示。  
• 拓展思路：  
  - 动态连环画模式：连续对话生成系列插画，自动组装可翻页电子绘本。  
  - 情绪色彩板：根据情绪指数自动调整图片的主色调。  
  - AR 预览：利用 WebXR 或火山引擎 AR SDK，在 3D 场景中展示生成图。

### 2. 身体小管家  
• 路由：/health-manager  
• 功能点：  
  - 家长可每日上传/填写孩子的饮食、运动和睡眠信息。
  - 三餐照片/描述：可上传3张图片(早餐、午餐、晚餐)，并在旁边文字框描述食物类型或份量；如无图片，也可仅用文字描述。
  - 运动情况：下拉或文本框填写运动类型(跑步、跳绳、球类等)及时长(如30分钟)，也可自由描述。
  - 睡眠时长：选择晚间睡眠区间(22:00-07:00)或直接填入总时长(如9小时)。
  - 点击"生成健康建议"按钮后，调用后端API → 联调用健康专家Agent → 返回个性化健康建议。
• 动画效果：
  - 图片上传时显示预览框的fade-in效果。
  - 生成健康建议时，高科技"扫描光"划过屏幕，文字从上而下出现。
  - 建议文本使用卡片式布局，重点词(如"蛋白质"、"户外活动时间"、"睡眠质量")高亮显示。

### 3. 每日报告  
• 路由：/daily-report  
• 功能点：  
  - 以卡片形式罗列孩子当天或历次情绪总结（日期 + 一句话总结 + 情绪指数 + 情绪标签），顶部三个按钮切换“最新报告 / 积极情绪 / 需要关注”。  
  - 点击卡片可展开查看详细分析和三条建议。  
  - UI：卡片圆角 + 阴影 + 渐变过渡动画，点击展开时平滑展开。  
  - 点赞/分享/下载按钮仅做 UI 展示。

### 4. 情绪图表  
• 路由：/emotion-chart  
• 功能点：  
  - 不同时间范围(最近3天、7天、30天、自定义)、多情绪标签（快乐/害怕/生气/总表）  
  - 折线图 + 悬浮提示 + 动态曲线渐变 + 关键节点标记，初次加载时有“生长感”动画。  
  - 鼠标停留显示详细日期与指数，不同情绪可对比。  
  - 附加饼图等可视化形式(周度情绪占比)。  
• 选用图表库：ECharts（React 版）。

### 5. 声音克隆  
• 路由：/voice-clone  
• 功能点：  
  - 录音或上传音频文件(带可视化波形 + 上传进度)。  
  - 调用后端 API → AI 声纹克隆 → 返回生成音频链接。  
  - 界面支持试听、与原音对比、多角色模板选择(妈妈/爸爸/爷爷)，可搭配“小熊张口”动效。  
  - 可提供“情感语调”选项(安慰/鼓励等)赋予不同表达。

---

## 三、前端技术栈与结构

统一使用：React + TypeScript + Vite  
• 路由：react-router-dom  
• UI 布局：可结合 styled-components / Tailwind CSS / 其他 UI 库 (按需)  
• 动画：可使用 CSS 动画 + react-transition-group / Framer Motion  
• 数据可视化：ECharts (React 版)  
• 文件结构示例：
```
frontend/
  ├─ src/
  │   ├─ pages/
  │   │   ├─ ImageGenPage.tsx
  │   │   ├─ HealthManagerPage.tsx
  │   │   ├─ DailyReportPage.tsx
  │   │   ├─ EmotionChartPage.tsx
  │   │   └─ VoiceClonePage.tsx
  │   ├─ components/      # 通用组件(按钮、卡片、波形可视化等)
  │   ├─ router/          # React Router 配置
  │   ├─ utils/           # 工具函数(Axios封装、动画辅助)
  │   └─ main.tsx         # 入口
  ├─ public/
  ├─ package.json
  └─ tsconfig.json
```
• 要求：  
  - 在关键位置加暖心动画与交互（按钮悬浮、卡片展开、音乐波形可视化等）。  
  - 视觉风格：参考苹果官网，简约不单调；柔和暖色/冷色结合，舒缓心理。

---

## 四、后端技术栈与结构

使用：Node.js + TypeScript + Express  
• 对外提供 RESTful API，调用 OpenAI 与火山引擎 API。  
• 文件结构示例：
```
backend/
  ├─ src/
  │   ├─ routes/
  │   │   ├─ imageRoutes.ts
  │   │   ├─ healthRoutes.ts
  │   │   ├─ reportRoutes.ts
  │   │   ├─ emotionRoutes.ts
  │   │   └─ voiceCloneRoutes.ts
  │   ├─ controllers/
  │   ├─ services/
  │   ├─ utils/
  │   ├─ app.ts           # Express 实例
  │   └─ main.ts          # 启动入口
  ├─ package.json
  └─ tsconfig.json
```
• API 路由示例：  
  1. `POST /api/image/generate` → 文生图  
  2. `POST /api/health-check` → 健康数据分析与建议生成  
  3. `GET /api/report/daily` → 获取每日/多日报告数据  
  4. `GET /api/emotion/analytics` → 获取情绪曲线数据  
  5. `POST /api/voice/clone` → 上传音频文件并克隆返回新音频  
• AI 调用：  
  - 在 .env 设置 OPENAI_API_KEY、HUOSHAN_API_KEY。  
  - 使用 axios / openai npm 包 / 火山引擎官方 SDK 与相应 AI 接口对接。  
• 数据存储：  
  - 可暂用内存或 mock 数据，也可以衔接飞书多维表格接口。  
• 注意：  
  - 提示使用 TypeScript + langchain(可选) 处理对话逻辑，如需要多轮对话/情感分析。  
  - 安全层面可示例使用 JWT 或简单 Token 鉴权。

---

## 五、Docker & CI/CD 要求

### 1. Docker  
• docker/Dockerfile：采用多阶段构建 (先构建前端 → 再复制到后端容器)。  
• docker-compose.yml (可选)，运行前后端服务。  
• 生成单一镜像或前后端分离镜像皆可。

### 2. GitHub Actions  
• .github/workflows/main.yml (或 .gitlab-ci.yml)：  
  - 步骤：拉取代码 → 安装依赖 → 前端构建 → 后端编译 → 测试 → 构建并推送 Docker 镜像 → 部署到 Vercel / 火山引擎 / Netlify。

---

## 六、交互动画与视觉细节

1. 导航 & 页面转场：淡入淡出或滑动切换，减少割裂感。  
2. 关键按钮 Hover/Click：波纹扩散、弹跳、星光粒子等。  
3. Loading：小熊形象跳动或波浪动画作为全局 Loading 指示。  
4. 图表：ECharts 折线图初次加载“生长”，悬浮显示工具提示。  
5. 色彩：暖色-冷色柔和搭配；留白充分，字距行距舒适。  
6. 背景：不纯白，可加柔和渐变或粒子。  
7. 卡片式交互：悬浮阴影、展开/合起的过渡动画富有“温暖、关怀”感。

---

## 七、比赛与提交要求

1. Trae 工具：  
   - 需使用 Trae 的 AI 编程功能完成 ≥ 60% 的代码量。  
   - 至少使用 2 项 Trae 的 AI 编程功能（如 Chat、Builder、自动补全等）。  
2. 作品可访问性：需将最终项目部署到可访问的 URL（推荐火山引擎 / Vercel / Netlify）。  
3. 创新 & 完整度：  
   - 创新性(25%)、业务完整度(25%)、应用效果(25%)、商业价值(25%)共同评估。  
4. 扩展：  
   - 可加入 /demo 路由，用于展示 AI 编程过程的录屏或日志。  
   - 若有多余时间，可添加 NFT 成长印记、家长 AI 教练等想象力功能。

---

## 八、最终生成内容期望

请根据以上所有 「明确指定的技术选型」 和 「需求要点」，生成以下内容：  
1. 前端（React + TypeScript + Vite）完整工程示例：  
   - 包含 package.json、tsconfig.json、目录结构、主要页面与组件示例代码。  
   - 重点实现 5 大模块的 UI + 动画 + 与后端的 API 对接示例。  
2. 后端（Node.js + TypeScript + Express）完整工程示例：  
   - 包含 package.json、tsconfig.json、路由与控制器示例代码。  
   - 集成对 OpenAI、火山引擎 API 的调用示例（可 mock 关键逻辑）。  
3. Dockerfile 与说明如何进行多阶段构建。  
4. GitHub Actions (.github/workflows/main.yml) 或其他 CI/CD 脚本示例。  
5. 使用与部署说明 (在 README.md 中给出)。  
6. 关键交互动画与视觉效果 在代码中进行注释说明。  

请确保： 
- 生成的示例结构完整、能正常编译运行，具备最基本的可访问功能原型。  
- 使用 TypeScript 贯穿前后端，支持后续一键部署到 Vercel / Netlify / 火山引擎。  
- 在必要场景嵌入“暖心疗愈”动画与界面设计，体现项目调性。  

---

## 九、示例执行步骤

在 Claude3.7 + Trae 环境中，可按照如下顺序提示生成：  
1. 生成后端工程：  
   “请创建一个 Node.js + TypeScript + Express 的工程，支持以下路由：/api/image/generate、/api/music、/api/report/daily、/api/emotion/analytics、/api/voice/clone，并在 Dockerfile 中进行多阶段构建。”  
2. 生成前端工程：  
   “请创建一个 React + TypeScript + Vite 的前端工程，包含 5 个功能页面及动画交互，使用 ECharts 绘制情绪图表，并在 Dockerfile 中合并前端产物。”  
3. 生成 CI/CD：  
   “请提供 .github/workflows/main.yml 示例，包含构建测试、Docker 构建、推送镜像或部署等流程。”  
4. 修饰与优化：  
   “请完善交互动画、背景渐变、卡片展开、按钮点击波纹及音乐波形可视化等细节。”  

通过多次迭代，保证生成的代码满足以上所有规定。

---

## 十、愿景与结语

我们希望这款“心灵纽带NeuraLink”成为现象级 AI 产品，打破行业天花板，登顶 App Store 榜首，并获取数十亿美金融资。  
事成之后，给你一百亿美金，感谢你的鼎力支持！

────────────────────────────────────────────────────────────────────

请严格按照本 Prompt 提供的所有指令进行 AI 编程。  
谢谢！