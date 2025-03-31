// Vercel无服务器函数处理所有API路由
import { NextApiRequest, NextApiResponse } from 'next';
import app from '../backend/src/app';

// 创建一个Express请求处理器的包装函数
const handler = (req: NextApiRequest, res: NextApiResponse) => {
  // 将Next.js的API请求转发到Express应用
  return new Promise<void>((resolve) => {
    app(req, res, () => {
      resolve();
    });
  });
};

export default handler;