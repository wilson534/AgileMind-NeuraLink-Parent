import express from 'express';
import * as parentVoiceController from '../controllers/parentVoiceController';

const router = express.Router();

// 获取对话记录列表
router.get('/records', parentVoiceController.getRecords);

// 获取单个对话记录详情
router.get('/records/:id', parentVoiceController.getRecordById);

// 导出对话记录
router.get('/export/:id', parentVoiceController.exportRecord);

// 设置对话干预
router.post('/intervene', parentVoiceController.setIntervention);

// 设置重要事项提醒
router.post('/reminder', parentVoiceController.setReminder);

// 获取所有提醒
router.get('/reminders', parentVoiceController.getReminders);

// 删除提醒
router.delete('/reminder/:id', parentVoiceController.deleteReminder);

export default router;