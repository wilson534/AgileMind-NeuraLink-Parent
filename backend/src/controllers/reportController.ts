import { Request, Response } from 'express';

// 模拟每日报告数据
const mockReportData = [
  {
    id: 1,
    date: '2023-05-03',
    summary: '今天小明情绪总体积极，与同学互动良好',
    emotionIndex: 85,
    tags: ['快乐', '兴奋', '好奇'],
    details: {
      analysis: '小明今天在校表现活跃，主动参与课堂讨论，与同学互动频繁。放学后表达了对科学实验的浓厚兴趣，情绪指数较高。',
      suggestions: [
        '可以考虑为小明提供更多科学实验类的课外活动',
        '鼓励小明继续保持积极的社交互动',
        '在家中可以安排一些亲子科学小实验，增强亲子关系'
      ]
    },
    category: 'positive'
  },
  {
    id: 2,
    date: '2023-05-02',
    summary: '小明今天情绪平稳，但对数学作业有些困扰',
    emotionIndex: 70,
    tags: ['平静', '困惑', '专注'],
    details: {
      analysis: '小明今天在大部分时间情绪平稳，但在做数学作业时表现出一定的困扰和焦虑。他尝试独立解决问题，但在某些难题前显得有些沮丧。',
      suggestions: [
        '可以适当关注小明的数学学习情况，必要时提供辅导',
        '鼓励小明在遇到困难时主动寻求帮助',
        '肯定小明的努力和专注，增强其自信心'
      ]
    },
    category: 'neutral'
  },
  {
    id: 3,
    date: '2023-05-01',
    summary: '小明今天情绪低落，可能与昨天的争执有关',
    emotionIndex: 45,
    tags: ['沮丧', '安静', '疲倦'],
    details: {
      analysis: '小明今天整体情绪较低，不太愿意交流，可能与昨天和同学的小争执有关。在课间休息时独自一人，没有参与集体活动。',
      suggestions: [
        '可以找适当时机和小明聊聊，了解他的想法和感受',
        '引导小明学习简单的情绪管理方法',
        '鼓励小明与同学和解，恢复正常社交关系'
      ]
    },
    category: 'concern'
  },
  {
    id: 4,
    date: '2023-04-30',
    summary: '小明今天非常开心，参加了学校的艺术节活动',
    emotionIndex: 95,
    tags: ['兴奋', '自豪', '创造力'],
    details: {
      analysis: '小明今天参加了学校艺术节，在绘画比赛中获得了好评，情绪非常高涨。他主动分享了自己的作品和创作过程，表现出很强的自信心和成就感。',
      suggestions: [
        '可以继续支持小明发展艺术兴趣和才能',
        '在家中展示小明的作品，增强其成就感',
        '鼓励小明在其他领域也保持这种积极主动的态度'
      ]
    },
    category: 'positive'
  },
  {
    id: 5,
    date: '2023-04-29',
    summary: '小明今天有些焦虑，可能与即将到来的考试有关',
    emotionIndex: 60,
    tags: ['焦虑', '紧张', '担忧'],
    details: {
      analysis: '小明今天表现出一定程度的焦虑，主要与下周的期中考试有关。他花了很多时间复习，但对自己的准备状态不太自信，多次表达担忧。',
      suggestions: [
        '帮助小明制定合理的复习计划，减轻考试压力',
        '教授一些简单的放松技巧，如深呼吸和正念冥想',
        '适当降低期望，强调过程重于结果的理念'
      ]
    },
    category: 'concern'
  }
];

/**
 * 获取每日报告数据
 * @param req 请求对象，可包含category参数（positive, neutral, concern）
 * @param res 响应对象
 */
export const getDailyReport = async (req: Request, res: Response) => {
  try {
    const { category } = req.query;
    
    let reports = [...mockReportData];
    
    // 如果指定了分类，则过滤数据
    if (category && ['positive', 'neutral', 'concern'].includes(category as string)) {
      reports = reports.filter(report => report.category === category);
    }
    
    // 按日期降序排序（最新的在前面）
    reports.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    res.status(200).json({
      status: 'success',
      data: reports
    });
  } catch (error: any) {
    console.error('获取每日报告数据时出错:', error);
    res.status(500).json({
      status: 'error',
      message: '获取每日报告数据时出错',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};