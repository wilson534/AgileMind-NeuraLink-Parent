import express from 'express';
import { analyzeHealthData } from '../controllers/healthController';
import multer from 'multer';

const router = express.Router();

// 配置文件上传
const storage = multer.memoryStorage();
const upload = multer({ storage });

/**
 * @route POST /api/health-check
 * @desc 分析健康数据并生成建议
 * @access Public
 */
router.post('/check', upload.fields([
  { name: 'breakfastImage', maxCount: 1 },
  { name: 'lunchImage', maxCount: 1 },
  { name: 'dinnerImage', maxCount: 1 }
]), analyzeHealthData);

export default router;