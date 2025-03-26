# 心灵纽带NeuraLink

心灵纽带NeuraLink是一个"孩子端实体小熊 + 家长端Web应用"的情感交互平台，用于捕捉并分析孩子的日常情绪、语音及需求，反馈给家长。本项目实现了家长端Web应用的七大功能模块。

## 功能模块

1. **文生图 (Text-to-Image)**：输入"诉说对象"与"想说的话"，选择图片风格，生成可爱疗愈风动漫图片。按钮点击时有星光粒子扩散效果，生成后以瀑布流形式平滑展示图片。

2. **身体小管家 (Health Manager)**：家长可每日上传或填写孩子的饮食、运动与睡眠信息。支持三餐图片上传、运动类型与时长记录、睡眠时长记录，并生成个性化健康建议。

3. **每日报告 (Daily Report)**：以卡片形式罗列孩子当天或历次情绪总结，包含日期、概括、情绪指数和标签。支持切换"最新报告/积极情绪/需要关注"，点击卡片可展开查看详细分析和建议。

4. **情绪图表 (Emotion Chart)**：使用ECharts展示不同时间范围(3天、7天、30天或自定义)的情绪变化，支持多情绪标签对比。包含悬浮提示、关键节点标记、初次加载"生长感"动画，以及周度情绪占比饼图。

5. **声音克隆 (Voice Clone)**：上传音频文件，AI声纹克隆，支持试听、与原音对比、多角色模板选择(妈妈/爸爸/爷爷)。提供"情感语调"选项，如安慰或鼓励，带对应的表达方式和小熊张口动效。

6. **家长之声 (Parent Voice)**：查看并管理孩子与小熊的对话记录，支持按日期、情绪类型、关键词筛选。提供"对话干预"功能，让家长能在特定场景下个性化管理或纠正AI玩偶的自动回复逻辑。支持设定作业提醒、就寝提醒等重要事项。

7. **社区交流 (Community)**：家长互助交流平台，提供发帖、评论、点赞等基本社交功能。包含育儿经验、教育案例、心得分享、问题求助等板块分类，以及基于AI分析的个性化热门话题推荐和专家入驻区域。

## 技术栈

### 前端
- React + TypeScript + Vite
- React Router
- Styled Components / Tailwind CSS
- Framer Motion (动画)
- ECharts (数据可视化)

### 后端
- Node.js + TypeScript + Express
- OpenAI API / 火山引擎 API

### 部署
- Docker (多阶段构建)
- GitHub Actions (CI/CD)

## 安装与运行

### 前提条件
- Node.js 18+
- npm 或 yarn
- Docker (可选)

### 本地开发

1. 克隆仓库
```bash
git clone https://github.com/yourusername/neuralink.git
cd neuralink
```

2. 安装依赖
```bash
# 安装前端依赖
cd frontend
npm install

# 安装后端依赖
cd ../backend
npm install
```

3. 配置环境变量
```bash
# 在backend目录下创建.env文件
OPENAI_API_KEY=your_openai_api_key
HUOSHAN_API_KEY=your_huoshan_api_key
PORT=3001
```

4. 启动开发服务器
```bash
# 启动后端服务
cd backend
npm run dev

# 启动前端服务（新终端）
cd frontend
npm run dev
```

5. 访问应用
- 前端: http://localhost:5173
- 后端: http://localhost:3001

### 使用Docker

```bash
# 构建并启动容器
docker-compose up -d

# 访问应用
# http://localhost:8080
```

## 部署

项目可以部署到Vercel、Netlify或火山引擎等平台。GitHub Actions配置已包含在`.github/workflows/main.yml`中，可自动构建、测试和部署。

## 项目结构

### 前端结构
```
frontend/
├─ src/
│  ├─ pages/                # 页面组件
│  │  ├─ ImageGenPage.tsx   # 文生图页面
│  │  ├─ HealthManagerPage.tsx # 身体小管家页面
│  │  ├─ DailyReportPage.tsx # 每日报告页面
│  │  ├─ EmotionChartPage.tsx # 情绪图表页面
│  │  ├─ VoiceClonePage.tsx # 声音克隆页面
│  │  ├─ ParentVoicePage.tsx # 家长之声页面
│  │  ├─ CommunityPage.tsx  # 社区交流页面
│  │  └─ PostDetailPage.tsx # 帖子详情页面
│  ├─ components/           # 通用组件
│  │  ├─ Layout.tsx         # 布局组件
│  │  ├─ EmotionFace.tsx    # 情绪表情组件
│  │  ├─ MusicPlayer.tsx    # 音乐播放器组件
│  │  ├─ BackgroundEffect.tsx # 背景效果组件
│  │  └─ EmotionDistribution.tsx # 情绪分布组件
│  ├─ utils/                # 工具函数
│  │  └─ api.ts             # API调用封装
│  ├─ assets/               # 静态资源
│  ├─ mock/                 # 模拟数据
│  ├─ App.tsx               # 应用入口
│  ├─ main.tsx              # 主入口
│  └─ index.css             # 全局样式
├─ public/                  # 公共资源
│  └─ images/               # 图片资源
├─ index.html               # HTML模板
├─ package.json             # 依赖配置
├─ tsconfig.json            # TypeScript配置
└─ vite.config.ts           # Vite配置
```

### 后端结构
```
backend/
├─ src/
│  ├─ controllers/          # 控制器
│  │  ├─ imageController.ts  # 文生图控制器
│  │  ├─ healthController.ts # 身体小管家控制器
│  │  ├─ reportController.ts # 每日报告控制器
│  │  ├─ emotionController.ts # 情绪图表控制器
│  │  ├─ voiceCloneController.ts # 声音克隆控制器
│  │  ├─ parentVoiceController.ts # 家长之声控制器
│  │  └─ communityController.ts # 社区交流控制器
│  ├─ routes/               # 路由
│  │  ├─ imageRoutes.ts     # 文生图路由
│  │  ├─ healthRoutes.ts    # 身体小管家路由
│  │  ├─ reportRoutes.ts    # 每日报告路由
│  │  ├─ emotionRoutes.ts   # 情绪图表路由
│  │  ├─ voiceCloneRoutes.ts # 声音克隆路由
│  │  ├─ parentVoiceRoutes.ts # 家长之声路由
│  │  └─ communityRoutes.ts # 社区交流路由
│  ├─ app.ts                # Express应用配置
│  └─ main.ts               # 服务器入口
├─ package.json             # 依赖配置
└─ tsconfig.json            # TypeScript配置
```

## 关键API接口

- 文生图: `POST /api/image/generate`
- 身体小管家: `POST /api/health-check`
- 每日报告: `GET /api/report/daily`
- 情绪分析: `GET /api/emotion/analytics`
- 声音克隆: `POST /api/voice/clone`
- 家长之声:
  - `GET /api/parent-voice/records`
  - `POST /api/parent-voice/intervene`
  - `POST /api/parent-voice/reminder`
- 社区交流:
  - `GET /api/community/posts`
  - `POST /api/community/create`
  - `POST /api/community/comment`
  - `POST /api/community/like`

## 设计风格

项目采用"暖心疗愈"的设计风格，动画与视觉效果丰富，给人温暖关怀感。主要特点包括：

1. 页面切换：淡入淡出、滑动切换或其他柔和转场，减少突兀感
2. 关键按钮交互：波纹扩散、星光粒子、弹跳等效果，突出"暖心"元素
3. 全局Loading：小熊形象跳动或波浪动画
4. 数据可视化：初次加载"曲线生长"，鼠标悬浮提示
5. 色彩风格：暖色-冷色柔和搭配，保证留白与舒适度
6. 背景：柔和渐变或微粒子背景
7. 卡片交互：悬浮阴影、展开/合起的动态过渡，展现温暖与关怀感

## 开发团队

心灵纽带NeuraLink项目由一支热爱创新的团队开发，致力于通过AI技术连接孩子与家长的情感纽带，创造更温暖、更有爱的家庭互动体验。
