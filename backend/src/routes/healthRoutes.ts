import express from 'express';
import { analyzeHealthData, analyzeHealthDataWithGPT } from '../controllers/healthController';
import { getWeeklyHealthStatus } from '../controllers/healthHistoryController';
import { authenticateToken } from '../middleware/auth';
import multer from 'multer';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

/**
 * @route POST /api/health-check
 * @desc 分析健康数据并生成建议
 * @access Public
 */
router.post('/check', (req, res, next) => {
  // 如果没有文件上传，直接进入下一个中间件
  if (!req.is('multipart/form-data')) {
    return next();
  }
  // 如果有文件上传，使用 multer 处理
  upload.fields([
    { name: 'breakfastImage', maxCount: 1 },
    { name: 'lunchImage', maxCount: 1 },
    { name: 'dinnerImage', maxCount: 1 }
  ])(req, res, next);
}, analyzeHealthData);

// 获取 GPT 智能建议 - 旧路径保留向后兼容
router.post('/coze-advice', (req, res, next) => {
  // 如果没有文件上传，直接进入下一个中间件
  if (!req.is('multipart/form-data')) {
    return next();
  }
  // 如果有文件上传，使用 multer 处理
  upload.fields([
    { name: 'breakfastImage', maxCount: 1 },
    { name: 'lunchImage', maxCount: 1 },
    { name: 'dinnerImage', maxCount: 1 }
  ])(req, res, next);
}, analyzeHealthDataWithGPT); // 确保使用analyzeHealthDataWithGPT函数处理请求

// 新的GPT健康建议接口
router.post('/gpt-advice', (req, res, next) => {
  // 如果没有文件上传，直接进入下一个中间件
  if (!req.is('multipart/form-data')) {
    return next();
  }
  // 如果有文件上传，使用 multer 处理
  upload.fields([
    { name: 'breakfastImage', maxCount: 1 },
    { name: 'lunchImage', maxCount: 1 },
    { name: 'dinnerImage', maxCount: 1 }
  ])(req, res, next);
}, analyzeHealthDataWithGPT); // 使用analyzeHealthDataWithGPT函数处理请求

// 获取周健康状态数据
router.get('/weekly-status', authenticateToken, getWeeklyHealthStatus);

export default router;