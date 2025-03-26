import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';

// 导入路由
import imageRoutes from './routes/imageRoutes';
import healthRoutes from './routes/healthRoutes';
import reportRoutes from './routes/reportRoutes';
import emotionRoutes from './routes/emotionRoutes';
import voiceCloneRoutes from './routes/voiceCloneRoutes';
import parentVoiceRoutes from './routes/parentVoiceRoutes';
import communityRoutes from './routes/communityRoutes';

// 加载环境变量
dotenv.config();

const app = express();

// 中间件
app.use(cors());
app.use(helmet());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 路由
app.use('/api/image', imageRoutes);
app.use('/api/health', healthRoutes);
app.use('/api/report', reportRoutes);
app.use('/api/emotion', emotionRoutes);
app.use('/api/voice', voiceCloneRoutes);
app.use('/api/parent-voice', parentVoiceRoutes);
app.use('/api/community', communityRoutes);

// 根路径处理
app.get('/', (req, res) => {
  res.status(200).json({ status: 'ok', message: '心灵纽带NeuraLink API服务' });
});

// API根路径处理
app.get('/api', (req, res) => {
  res.status(200).json({ status: 'ok', message: '心灵纽带NeuraLink API服务' });
});

// 健康检查路由
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok', message: '心灵纽带NeuraLink后端服务正常运行' });
});

// 错误处理中间件
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error(err.stack);
  res.status(500).json({
    status: 'error',
    message: '服务器内部错误',
    error: process.env.NODE_ENV === 'development' ? err.message : undefined
  });
});

// 处理404
app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    message: '未找到请求的资源'
  });
});

export default app;