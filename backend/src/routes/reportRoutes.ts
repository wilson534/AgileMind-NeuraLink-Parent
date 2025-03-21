import express from 'express';
import { getDailyReport } from '../controllers/reportController';

const router = express.Router();

/**
 * @route GET /api/report/daily
 * @desc 获取每日/多日报告数据
 * @access Public
 */
router.get('/daily', getDailyReport);

export default router;