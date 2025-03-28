import express from 'express';
import { analyzeHealthData } from '../controllers/healthController';
import { getWeeklyHealthStatus } from '../controllers/healthHistoryController';
import { authenticateToken } from '../middleware/auth';
import multer from 'multer';
import { getCozeAdvice } from '../controllers/cozeController';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

/**
 * @route POST /api/health-check
 * @desc 分析健康数据并生成建议
 * @access Public
 */
router.post('/check', authenticateToken, (req, res, next) => {
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

// 获取 Coze 智能建议
// router.post('/coze-advice', authenticateToken, (req, res, next) => {
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
}, getCozeAdvice);

// 获取周健康状态数据
router.get('/weekly-status', authenticateToken, getWeeklyHealthStatus);

export default router;