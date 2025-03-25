import { Request, Response } from 'express';

// 获取对话记录列表
export const getRecords = (req: Request, res: Response) => {
  // 模拟数据
  const records = [
    {
      id: 1,
      date: '2023-06-15',
      title: '今天有点不开心',
      emotion: '难过',
      emotionColor: '#4A6FA5',
      messages: [
        { id: 1, sender: 'child', content: '小熊，今天在学校有人不和我玩', time: '15:30' },
        { id: 2, sender: 'bear', content: '哦，听起来你很难过呢。能告诉我发生了什么吗？', time: '15:31' },
        { id: 3, sender: 'child', content: '我想和他们一起玩游戏，但是他们说人数已经够了', time: '15:32' },
        { id: 4, sender: 'bear', content: '这种感觉确实不好受。有时候，其他小朋友可能已经开始了游戏，不是因为不喜欢你。明天你可以早点去问他们能不能一起玩，或者找找有没有其他小朋友也想玩？', time: '15:33' },
        { id: 5, sender: 'child', content: '嗯，我明天试试看', time: '15:34' },
      ]
    },
    {
      id: 2,
      date: '2023-06-14',
      title: '数学考试考砸了',
      emotion: '焦虑',
      emotionColor: '#FFA62B',
      messages: [
        { id: 1, sender: 'child', content: '小熊，我数学考试只考了75分', time: '16:20' },
        { id: 2, sender: 'bear', content: '没关系的，考试只是帮助我们找出需要提高的地方。你知道哪些题目做错了吗？', time: '16:21' },
        { id: 3, sender: 'child', content: '分数题和应用题，我总是搞不清楚', time: '16:22' },
      ]
    },
    {
      id: 3,
      date: '2023-06-12',
      title: '今天和朋友一起玩得很开心',
      emotion: '开心',
      emotionColor: '#06D6A0',
      messages: [
        { id: 1, sender: 'child', content: '小熊，今天我和李明一起踢足球，我进了两个球！', time: '17:45' },
        { id: 2, sender: 'bear', content: '哇！那真是太棒了！你一定踢得很好。和朋友一起玩感觉怎么样？', time: '17:46' },
        { id: 3, sender: 'child', content: '超级开心！我们约好周末再一起玩', time: '17:47' },
      ]
    }
  ];

  // 过滤参数
  const { date, emotion, search } = req.query;
  let filteredRecords = [...records];

  if (date) {
    filteredRecords = filteredRecords.filter(record => {
      if (date === 'today') {
        return record.date === new Date().toISOString().split('T')[0];
      } else if (date === 'yesterday') {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        return record.date === yesterday.toISOString().split('T')[0];
      } else if (date === 'lastWeek') {
        const lastWeek = new Date();
        lastWeek.setDate(lastWeek.getDate() - 7);
        return new Date(record.date) >= lastWeek;
      } else {
        return record.date === date;
      }
    });
  }

  if (emotion && emotion !== 'all') {
    filteredRecords = filteredRecords.filter(record => record.emotion === emotion);
  }

  if (search) {
    const searchStr = String(search).toLowerCase();
    filteredRecords = filteredRecords.filter(record => {
      const titleMatch = record.title.toLowerCase().includes(searchStr);
      const contentMatch = record.messages.some(msg => 
        msg.content.toLowerCase().includes(searchStr)
      );
      return titleMatch || contentMatch;
    });
  }

  res.status(200).json({
    status: 'success',
    data: filteredRecords
  });
};

// 获取单个对话记录详情
export const getRecordById = (req: Request, res: Response) => {
  const { id } = req.params;
  
  // 模拟数据查询
  const records = [
    {
      id: 1,
      date: '2023-06-15',
      title: '今天有点不开心',
      emotion: '难过',
      emotionColor: '#4A6FA5',
      messages: [
        { id: 1, sender: 'child', content: '小熊，今天在学校有人不和我玩', time: '15:30' },
        { id: 2, sender: 'bear', content: '哦，听起来你很难过呢。能告诉我发生了什么吗？', time: '15:31' },
        { id: 3, sender: 'child', content: '我想和他们一起玩游戏，但是他们说人数已经够了', time: '15:32' },
        { id: 4, sender: 'bear', content: '这种感觉确实不好受。有时候，其他小朋友可能已经开始了游戏，不是因为不喜欢你。明天你可以早点去问他们能不能一起玩，或者找找有没有其他小朋友也想玩？', time: '15:33' },
        { id: 5, sender: 'child', content: '嗯，我明天试试看', time: '15:34' },
      ]
    },
    // 其他记录...
  ];
  
  const record = records.find(r => r.id === Number(id));
  
  if (!record) {
    return res.status(404).json({
      status: 'fail',
      message: '未找到该对话记录'
    });
  }
  
  res.status(200).json({
    status: 'success',
    data: record
  });
};

// 导出对话记录
export const exportRecord = (req: Request, res: Response) => {
  const { id } = req.params;
  
  // 模拟数据查询
  const records = [
    {
      id: 1,
      date: '2023-06-15',
      title: '今天有点不开心',
      emotion: '难过',
      emotionColor: '#4A6FA5',
      messages: [
        { id: 1, sender: 'child', content: '小熊，今天在学校有人不和我玩', time: '15:30' },
        { id: 2, sender: 'bear', content: '哦，听起来你很难过呢。能告诉我发生了什么吗？', time: '15:31' },
        { id: 3, sender: 'child', content: '我想和他们一起玩游戏，但是他们说人数已经够了', time: '15:32' },
        { id: 4, sender: 'bear', content: '这种感觉确实不好受。有时候，其他小朋友可能已经开始了游戏，不是因为不喜欢你。明天你可以早点去问他们能不能一起玩，或者找找有没有其他小朋友也想玩？', time: '15:33' },
        { id: 5, sender: 'child', content: '嗯，我明天试试看', time: '15:34' },
      ]
    },
    // 其他记录...
  ];
  
  const record = records.find(r => r.id === Number(id));
  
  if (!record) {
    return res.status(404).json({
      status: 'fail',
      message: '未找到该对话记录'
    });
  }
  
  // 格式化导出内容
  const exportContent = {
    title: record.title,
    date: record.date,
    emotion: record.emotion,
    conversation: record.messages.map(msg => `[${msg.time}] ${msg.sender === 'child' ? '孩子' : '小熊'}: ${msg.content}`).join('\n')
  };
  
  res.status(200).json({
    status: 'success',
    data: exportContent
  });
};

// 设置对话干预
export const setIntervention = (req: Request, res: Response) => {
  const { keyword, response } = req.body;
  
  // 验证请求数据
  if (!keyword || !response) {
    return res.status(400).json({
      status: 'fail',
      message: '关键词和回复内容不能为空'
    });
  }
  
  // 模拟保存干预设置
  // 实际项目中，这里会将数据保存到数据库
  
  res.status(201).json({
    status: 'success',
    message: '干预设置成功',
    data: {
      id: Math.floor(Math.random() * 1000) + 1,
      keyword,
      response,
      createdAt: new Date().toISOString()
    }
  });
};

// 设置重要事项提醒
export const setReminder = (req: Request, res: Response) => {
  const { title, date, time, content } = req.body;
  
  // 验证请求数据
  if (!title || !date || !time || !content) {
    return res.status(400).json({
      status: 'fail',
      message: '提醒标题、日期、时间和内容不能为空'
    });
  }
  
  // 模拟保存提醒设置
  // 实际项目中，这里会将数据保存到数据库
  
  res.status(201).json({
    status: 'success',
    message: '提醒设置成功',
    data: {
      id: Math.floor(Math.random() * 1000) + 1,
      title,
      date,
      time,
      content,
      createdAt: new Date().toISOString()
    }
  });
};

// 获取所有提醒
export const getReminders = (req: Request, res: Response) => {
  // 模拟数据
  const reminders = [
    {
      id: 1,
      title: '完成数学作业',
      date: '2023-06-20',
      time: '18:00',
      content: '记得完成数学作业第35页的习题',
      createdAt: '2023-06-15T10:30:00Z'
    },
    {
      id: 2,
      title: '准备英语考试',
      date: '2023-06-22',
      time: '19:30',
      content: '明天有英语考试，记得复习单词和语法',
      createdAt: '2023-06-16T09:15:00Z'
    }
  ];
  
  res.status(200).json({
    status: 'success',
    data: reminders
  });
};

// 删除提醒
export const deleteReminder = (req: Request, res: Response) => {
  const { id } = req.params;
  
  // 模拟删除操作
  // 实际项目中，这里会从数据库中删除对应ID的提醒
  
  res.status(200).json({
    status: 'success',
    message: '提醒删除成功'
  });
};