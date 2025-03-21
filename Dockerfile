# 多阶段构建 Dockerfile
# 第一阶段：构建前端
FROM node:18-alpine AS frontend-builder
WORKDIR /app/frontend

# 复制前端依赖文件
COPY frontend/package*.json ./

# 安装依赖
RUN npm install

# 复制前端源代码
COPY frontend/ ./

# 构建前端
RUN npm run build

# 第二阶段：构建后端
FROM node:18-alpine AS backend-builder
WORKDIR /app/backend

# 复制后端依赖文件
COPY backend/package*.json ./

# 安装依赖
RUN npm install

# 复制后端源代码
COPY backend/ ./

# 构建后端
RUN npm run build

# 第三阶段：最终镜像
FROM node:18-alpine
WORKDIR /app

# 复制后端构建产物
COPY --from=backend-builder /app/backend/dist ./dist
COPY --from=backend-builder /app/backend/package*.json ./

# 安装生产环境依赖
RUN npm install --only=production

# 复制前端构建产物到后端静态文件目录
RUN mkdir -p ./dist/public
COPY --from=frontend-builder /app/frontend/dist ./dist/public

# 设置环境变量
ENV NODE_ENV=production
ENV PORT=3000

# 暴露端口
EXPOSE 3000

# 启动命令
CMD ["node", "dist/main.js"]