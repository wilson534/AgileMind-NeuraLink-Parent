import { Router } from 'express';
import { generateImage } from '../controllers/imageController';

const router = Router();

router.post('/generate', generateImage);  // 确保 generateImage 被正确导出和导入

export default router;