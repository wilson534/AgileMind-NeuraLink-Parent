# 心灵纽带NeuraLink

心灵纽带NeuraLink是一个"孩子端实体小熊 + 家长端Web应用"的情感交互平台，用于捕捉并分析孩子的日常情绪、语音及需求，反馈给家长。本项目实现了家长端Web应用的五大功能模块。

## 功能模块

1. **文生图 (Text-to-Image)**：输入"诉说对象"与"想说的话"，选择图片风格，生成可爱疗愈风动漫图片。
2. **音乐播放器**：根据情绪推荐匹配曲目，支持播放/暂停、进度、音量调节、波形可视化等功能。
3. **每日报告**：以卡片形式罗列孩子当天或历次情绪总结，可查看详细分析和建议。
4. **情绪图表**：使用ECharts展示不同时间范围的情绪变化，支持多情绪标签对比。
5. **声音克隆**：上传音频文件，AI声纹克隆，支持试听、与原音对比、多角色模板选择。

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

```
├─ frontend/           # 前端项目
│   ├─ src/
│   │   ├─ pages/      # 页面组件
│   │   ├─ components/ # 通用组件
│   │   ├─ router/     # 路由配置
│   │   ├─ utils/      # 工具函数
│   │   └─ main.tsx    # 入口文件
│   ├─ public/
│   ├─ package.json
│   └─ tsconfig.json
│
├─ backend/            # 后端项目
│   ├─ src/
│   │   ├─ routes/     # API路由
│   │   ├─ controllers/# 控制器
│   │   ├─ services/   # 服务层
│   │   ├─ utils/      # 工具函数
│   │   ├─ app.ts      # Express实例
│   │   └─ main.ts     # 启动入口
│   ├─ package.json
│   └─ tsconfig.json
│
├─ docker/             # Docker配置
│   └─ Dockerfile
│
├─ .github/            # GitHub配置
│   └─ workflows/      # GitHub Actions
│       └─ main.yml
│
├─ docker-compose.yml  # Docker Compose配置
└─ README.md           # 项目说明
```

## 许可证

MIT
# NeuraLink-parent
心灵纽带NeuraLink家长端应用
