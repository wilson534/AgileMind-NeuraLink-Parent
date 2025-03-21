import { Request, Response } from 'express';

// 模拟情绪数据
const mockEmotionData = {
  // 最近3天的数据
  '3days': {
    dates: ['2023-05-01', '2023-05-02', '2023-05-03'],
    happy: [85, 90, 75],
    sad: [15, 10, 25],
    angry: [5, 15, 20],
    scared: [10, 5, 15],
    overall: [80, 85, 70]
  },
  // 最近7天的数据
  '7days': {
    dates: ['2023-04-27', '2023-04-28', '2023-04-29', '2023-04-30', '2023-05-01', '2023-05-02', '2023-05-03'],
    happy: [70, 75, 80, 85, 85, 90, 75],
    sad: [20, 15, 10, 15, 15, 10, 25],
    angry: [25, 20, 15, 10, 5, 15, 20],
    scared: [15, 10, 5, 10, 10, 5, 15],
    overall: [65, 70, 75, 80, 80, 85, 70]
  },
  // 最近30天的数据
  '30days': {
    dates: Array.from({ length: 30 }, (_, i) => {
      const date = new Date('2023-05-03');
      date.setDate(date.getDate() - 29 + i);
      return date.toISOString().split('T')[0];
    }),
    happy: Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 60),
    sad: Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 5),
    angry: Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 5),
    scared: Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 5),
    overall: Array.from({ length: 30 }, () => Math.floor(Math.random() * 30) + 60)
  },
  // 情绪占比数据
  'distribution': {
    labels: ['快乐', '悲伤', '生气', '害怕', '其他'],
    data: [60, 15, 10, 10, 5]
  }
};

/**
 * 获取情绪分析数据
 * @param req 请求对象，可包含timeRange参数（3days, 7days, 30days）
 * @param res 响应对象
 */
export const getEmotionAnalytics = async (req: Request, res: Response) => {
  try {
    const { timeRange = '7days', emotionType = 'overall' } = req.query;
    
    // 验证时间范围参数
    if (!['3days', '7days', '30days'].includes(timeRange as string)) {
      return res.status(400).json({
        status: 'error',
        message: '无效的时间范围参数，可选值：3days, 7days, 30days'
      });
    }
    
    // 验证情绪类型参数
    if (!['happy', 'sad', 'angry', 'scared', 'overall'].includes(emotionType as string)) {
      return res.status(400).json({
        status: 'error',
        message: '无效的情绪类型参数，可选值：happy, sad, angry, scared, overall'
      });
    }
    
    // 获取对应时间范围的数据
    const data = mockEmotionData[timeRange as keyof typeof mockEmotionData];
    
    // 如果请求的是分布数据
    if (timeRange === 'distribution') {
      return res.status(200).json({
        status: 'success',
        data: mockEmotionData.distribution
      });
    }
    
    // 返回线性数据
    res.status(200).json({
      status: 'success',
      data: {
        dates: data.dates,
        values: data[emotionType as keyof typeof data] || data.overall
      }
    });
  } catch (error: any) {
    console.error('获取情绪分析数据时出错:', error);
    res.status(500).json({
      status: 'error',
      message: '获取情绪分析数据时出错',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};