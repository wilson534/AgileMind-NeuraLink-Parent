import express from 'express';
import { getEmotionAnalytics } from '../controllers/emotionController';

const router = express.Router();

/**
 * @route GET /api/emotion/analytics
 * @desc 获取情绪曲线数据
 * @access Public
 */
router.get('/analytics', getEmotionAnalytics);

export default router;