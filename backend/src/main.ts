import dotenv from 'dotenv';
import app from './app';

// 加载环境变量
dotenv.config();

// 设置端口
const PORT = process.env.PORT || 3001;

// 启动服务器
app.listen(PORT, () => {
  console.log(`心灵纽带NeuraLink后端服务运行在端口: ${PORT}`);
});