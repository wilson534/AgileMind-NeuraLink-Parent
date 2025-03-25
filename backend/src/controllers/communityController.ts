import { Request, Response } from 'express';

// 获取社区帖子列表
export const getPosts = (req: Request, res: Response) => {
  // 模拟数据
  const posts = [
    {
      id: 1,
      title: '如何帮助孩子建立良好的学习习惯？',
      author: '李妈妈',
      date: '2023-06-15',
      content: '我的孩子今年上小学二年级，但是很难静下心来学习，总是三分钟热度。我尝试了很多方法，比如制定时间表、设置奖励机制等，但效果不明显。有没有家长遇到类似的问题，能分享一些有效的方法？',
      likes: 24,
      comments: 15,
      views: 142,
      tags: ['学习习惯', '小学生']
    },
    {
      id: 2,
      title: '分享：如何与青春期孩子有效沟通',
      author: '王爸爸',
      date: '2023-06-14',
      content: '最近我的孩子进入青春期，变得很难沟通，动不动就发脾气或者不理人。经过一段时间的摸索，我发现了一些有效的沟通技巧，比如选择合适的时机、尊重他们的隐私、多倾听少说教等。想在这里分享给大家，也希望能听到更多家长的经验。',
      likes: 36,
      comments: 22,
      views: 198,
      tags: ['青春期', '沟通技巧']
    },
    {
      id: 3,
      title: '孩子沉迷手机游戏怎么办？',
      author: '张妈妈',
      date: '2023-06-12',
      content: '我家孩子今年初中一年级，最近非常沉迷手机游戏，作业也不认真做，成绩直线下滑。我和他爸爸试过没收手机、限制时间等方法，但效果不好，反而导致亲子关系紧张。有没有更好的方法来引导孩子合理使用电子设备？',
      likes: 42,
      comments: 31,
      views: 256,
      tags: ['电子产品', '游戏成瘾', '初中生']
    }
  ];

  // 过滤参数
  const { category, search, sort } = req.query;
  let filteredPosts = [...posts];

  if (category && category !== 'all') {
    filteredPosts = filteredPosts.filter(post => 
      post.tags.includes(String(category))
    );
  }

  if (search) {
    const searchStr = String(search).toLowerCase();
    filteredPosts = filteredPosts.filter(post => {
      const titleMatch = post.title.toLowerCase().includes(searchStr);
      const contentMatch = post.content.toLowerCase().includes(searchStr);
      const authorMatch = post.author.toLowerCase().includes(searchStr);
      return titleMatch || contentMatch || authorMatch;
    });
  }

  // 排序
  if (sort) {
    if (sort === 'latest') {
      filteredPosts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    } else if (sort === 'popular') {
      filteredPosts.sort((a, b) => b.likes - a.likes);
    }
  }

  res.status(200).json({
    status: 'success',
    data: filteredPosts
  });
};

// 获取单个帖子详情
export const getPostById = (req: Request, res: Response) => {
  const { id } = req.params;
  
  // 模拟数据查询
  const posts = [
    {
      id: 1,
      title: '如何帮助孩子建立良好的学习习惯？',
      author: '李妈妈',
      date: '2023-06-15',
      content: '我的孩子今年上小学二年级，但是很难静下心来学习，总是三分钟热度。我尝试了很多方法，比如制定时间表、设置奖励机制等，但效果不明显。有没有家长遇到类似的问题，能分享一些有效的方法？',
      likes: 24,
      comments: [
        { id: 1, author: '王老师', content: '可以尝试将学习任务分解成小块，每完成一块给予及时的鼓励和小奖励。', date: '2023-06-15', likes: 5 },
        { id: 2, author: '张妈妈', content: '我家孩子也有这个问题，我发现让他和小伙伴一起学习效果不错，互相监督。', date: '2023-06-16', likes: 3 }
      ],
      views: 142,
      tags: ['学习习惯', '小学生']
    }
  ];
  
  const post = posts.find(p => p.id === Number(id));
  
  if (!post) {
    return res.status(404).json({
      status: 'fail',
      message: '未找到该帖子'
    });
  }
  
  res.status(200).json({
    status: 'success',
    data: post
  });
};

// 创建新帖子
export const createPost = (req: Request, res: Response) => {
  const { title, content, tags } = req.body;
  
  // 验证请求数据
  if (!title || !content) {
    return res.status(400).json({
      status: 'fail',
      message: '标题和内容不能为空'
    });
  }
  
  // 模拟创建帖子
  // 实际项目中，这里会将数据保存到数据库
  const newPost = {
    id: Math.floor(Math.random() * 1000) + 1,
    title,
    author: '当前用户', // 实际项目中，这里会从用户会话中获取
    date: new Date().toISOString().split('T')[0],
    content,
    likes: 0,
    comments: [],
    views: 0,
    tags: tags || []
  };
  
  res.status(201).json({
    status: 'success',
    message: '帖子创建成功',
    data: newPost
  });
};

// 添加评论
export const addComment = (req: Request, res: Response) => {
  const { postId, content } = req.body;
  
  // 验证请求数据
  if (!postId || !content) {
    return res.status(400).json({
      status: 'fail',
      message: '帖子ID和评论内容不能为空'
    });
  }
  
  // 模拟添加评论
  // 实际项目中，这里会将数据保存到数据库
  const newComment = {
    id: Math.floor(Math.random() * 1000) + 1,
    author: '当前用户', // 实际项目中，这里会从用户会话中获取
    content,
    date: new Date().toISOString().split('T')[0],
    likes: 0
  };
  
  res.status(201).json({
    status: 'success',
    message: '评论添加成功',
    data: newComment
  });
};

// 点赞帖子
export const likePost = (req: Request, res: Response) => {
  const { postId } = req.body;
  
  // 验证请求数据
  if (!postId) {
    return res.status(400).json({
      status: 'fail',
      message: '帖子ID不能为空'
    });
  }
  
  // 模拟点赞操作
  // 实际项目中，这里会更新数据库中的点赞数
  
  res.status(200).json({
    status: 'success',
    message: '点赞成功'
  });
};

// 获取热门话题
export const getTrendingTopics = (req: Request, res: Response) => {
  // 模拟数据
  const topics = [
    { id: 1, name: '学习方法' },
    { id: 2, name: '亲子沟通' },
    { id: 3, name: '情绪管理' },
    { id: 4, name: '电子产品使用' },
    { id: 5, name: '青春期教育' },
    { id: 6, name: '阅读习惯' },
    { id: 7, name: '体育锻炼' },
    { id: 8, name: '营养健康' }
  ];
  
  res.status(200).json({
    status: 'success',
    data: topics
  });
};

// 获取专家列表
export const getExperts = (req: Request, res: Response) => {
  // 模拟数据
  const experts = [
    { id: 1, name: '王教授', title: '儿童心理学专家', avatar: 'W' },
    { id: 2, name: '李医生', title: '儿科医生', avatar: 'L' },
    { id: 3, name: '张老师', title: '特殊教育专家', avatar: 'Z' },
    { id: 4, name: '刘博士', title: '青少年发展心理学家', avatar: 'L' }
  ];
  
  res.status(200).json({
    status: 'success',
    data: experts
  });
};