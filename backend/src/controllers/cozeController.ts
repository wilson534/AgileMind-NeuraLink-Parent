import { Request, Response } from 'express';
import axios from 'axios';
import { COZE_API_KEY, COZE_BOT_ID } from '../config/coze';

// 定义文件类型
interface MulterRequest extends Request {
  files?: {
    [fieldname: string]: Express.Multer.File[];
  };
}

export const getCozeAdvice = async (req: MulterRequest, res: Response) => {
  try {
    // 构建发送给 Coze 的消息
    const healthData = {
      breakfast: {
        description: req.body.breakfastDescription || '',
        image: req.files?.breakfastImage?.[0]?.path || null
      },
      lunch: {
        description: req.body.lunchDescription || '',
        image: req.files?.lunchImage?.[0]?.path || null
      },
      dinner: {
        description: req.body.dinnerDescription || '',
        image: req.files?.dinnerImage?.[0]?.path || null
      },
      exercise: {
        type: req.body.exerciseType || '',
        duration: req.body.exerciseDuration || '',
        description: req.body.exerciseDescription || ''
      },
      sleep: {
        startTime: req.body.sleepStartTime || '',
        endTime: req.body.sleepEndTime || '',
        totalHours: req.body.sleepTotalHours || ''
      }
    };

    // 构建提示词
    const prompt = `
请根据以下健康数据分析并给出专业建议：

1. 饮食情况：
早餐：${healthData.breakfast.description}
午餐：${healthData.lunch.description}
晚餐：${healthData.dinner.description}

2. 运动情况：
类型：${healthData.exercise.type}
时长：${healthData.exercise.duration}
描述：${healthData.exercise.description}

3. 睡眠情况：
开始时间：${healthData.sleep.startTime}
结束时间：${healthData.sleep.endTime}
总时长：${healthData.sleep.totalHours}小时

请从以下几个方面给出建议：
1. 饮食营养分析和建议
2. 运动强度和时间评估
3. 睡眠质量分析
4. 综合健康建议
`;

    // 调用 Coze API
    const authHeader = `Bearer ${COZE_API_KEY?.trim() || ''}`;
    console.log('===>getCozeAdvice key', authHeader);
    const response = await axios.post(
      `${process.env.COZE_API_ENDPOINT}/api/v1/bot/${COZE_BOT_ID}/chat`,
      {
        messages: [
          {
            role: "system",
            content: "你是一位专业的儿童健康顾问，请根据用户提供的健康数据进行分析并给出专业的建议。"
          },
          {
            role: "user",
            content: prompt
          }
        ]
      },
      {
        headers: {
          // 'Authorization': `Bearer ${COZE_API_KEY.trim()}`,
          'Authorization': authHeader,
          'Content-Type': 'application/json'
        },
        timeout: 30000 // 30秒超时
      }
    );

    // 返回 Coze 的建议
    console.log('===>getCozeAdvice response555:', response);
    res.json({
      status: 'success',
      data: {
        // advice: response.data.choices[0].message.content
        advice: response.data.messages[1].content
      }
    });
  } catch (error: any) {
    console.error('获取 Coze 建议失败:', error);
    
    // 根据错误类型返回不同的错误信息
    if (axios.isAxiosError(error)) {
      if (error.code === 'ECONNREFUSED') {
        return res.status(503).json({
          status: 'error',
          message: '无法连接到 Coze 服务器，请检查网络连接'
        });
      }
      if (error.response?.status === 401) {
        return res.status(401).json({
          status: 'error',
          message: 'Coze API 认证失败，请检查 API 密钥'
        });
      }
      if (error.response?.status === 429) {
        return res.status(429).json({
          status: 'error',
          message: '请求过于频繁，请稍后再试'
        });
      }
    }
    
    console.error('===>getCozeAdvice catch err:', error);
    res.status(500).json({
      status: 'error',
      message: '获取健康建议失败，请稍后重试'
    });
  }
}; 