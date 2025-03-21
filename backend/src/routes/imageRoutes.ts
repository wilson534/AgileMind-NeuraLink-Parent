import express from 'express';
import multer from 'multer';
import { generateImage } from '../controllers/imageController';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @route POST /api/image/generate
 * @desc 根据文本生成图片
 * @access Public
 */
router.post('/generate', upload.none(), generateImage);

export default router;