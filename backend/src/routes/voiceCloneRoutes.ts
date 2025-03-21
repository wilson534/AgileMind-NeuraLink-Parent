import express from 'express';
import multer from 'multer';
import { cloneVoice } from '../controllers/voiceCloneController';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

/**
 * @route POST /api/voice/clone
 * @desc 上传音频文件并克隆声音
 * @access Public
 */
router.post('/clone', upload.single('audio'), cloneVoice);

export default router;