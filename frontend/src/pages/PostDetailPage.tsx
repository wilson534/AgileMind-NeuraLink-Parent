import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 800px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 1rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-bottom: 2rem;
  padding: 0;
  
  &:hover {
    text-decoration: underline;
  }
`;

const PostContainer = styled(motion.div)`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: var(--card-shadow);
`;

const PostHeader = styled.div`
  margin-bottom: 2rem;
`;

const PostTitle = styled.h1`
  font-size: 2rem;
  color: var(--text-color);
  margin: 0 0 1rem;
`;

const PostMeta = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #666;
  font-size: 0.9rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthorAvatar = styled.div<{ $isExpert: boolean }>`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background-color: ${props => props.$isExpert ? 'var(--primary-color)' : '#FFB5A7'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;

const AuthorName = styled.span<{ $isExpert: boolean }>`
  font-weight: ${props => props.$isExpert ? '600' : '500'};
  color: ${props => props.$isExpert ? 'var(--primary-color)' : 'var(--text-color)'};
`;

const ExpertBadge = styled.span`
  background-color: #f0f0f0;
  color: var(--primary-color);
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const PostContent = styled.div`
  font-size: 1.1rem;
  line-height: 1.8;
  color: var(--text-color);
  margin-bottom: 2rem;
  white-space: pre-wrap;
`;

const TagsContainer = styled.div`
  display: flex;
  gap: 0.5rem;
  margin-bottom: 2rem;
`;

const Tag = styled.span`
  background-color: #f0f0f0;
  color: #666;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.875rem;
`;

const StatsContainer = styled.div`
  display: flex;
  gap: 2rem;
  padding: 1rem 0;
  border-top: 1px solid #f0f0f0;
  border-bottom: 1px solid #f0f0f0;
  margin-bottom: 2rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #666;
  font-size: 0.9rem;
  cursor: pointer;
  transition: color 0.3s;
  
  &:hover {
    color: var(--primary-color);
  }
`;

const CommentsSection = styled.div`
  margin-top: 3rem;
`;

const CommentForm = styled.form`
  margin-bottom: 2rem;
`;

const CommentInput = styled.textarea`
  width: 100%;
  padding: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 100px;
  resize: vertical;
  margin-bottom: 1rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const SubmitButton = styled.button`
  background-color: var(--primary-color);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(106, 90, 205, 0.3);
  }
`;

const CommentsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CommentCard = styled.div`
  background-color: #f8f9fa;
  border-radius: 12px;
  padding: 1.5rem;
`;

const CommentHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;

const CommentAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const CommentDate = styled.span`
  color: #999;
  font-size: 0.875rem;
`;

const CommentContent = styled.p`
  margin: 0;
  color: var(--text-color);
  font-size: 1rem;
  line-height: 1.6;
`;

interface Comment {
  id: number;
  author: string;
  date: string;
  content: string;
  isExpert: boolean;
}

const PostDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [post, setPost] = useState<any>(null);
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [isLiked, setIsLiked] = useState(false);
  
  useEffect(() => {
    // 实际项目中这里会调用API获取帖子详情
    api.get(`/api/posts/${id}`).then(response => setPost(response.data))
    
    // 如果API调用失败，使用模拟数据作为后备
    .catch(error => {
      console.error('获取帖子详情失败:', error);
      
      // 根据不同的帖子ID返回不同的模拟数据
      const mockPosts = {
        // 帖子1：STEM教育
        1: {
          id: 1,
          title: '孩子对STEM教育很感兴趣，如何培养？',
          author: '王教授',
          isExpert: true,
          date: '2024-03-24',
          content: '最近发现我家孩子对编程和机器人制作特别感兴趣。作为一名教育工作者，我认为STEM教育对孩子的创新思维和问题解决能力培养非常重要。\n\n以下是一些具体的建议：\n\n1. 从孩子的兴趣出发\n- 观察孩子对什么类型的科技活动最感兴趣\n- 选择适合年龄的STEM玩具和工具\n- 让学习过程充满趣味性\n\n2. 动手实践很重要\n- 购置基础的编程套件（如Scratch Junior、micro:bit等）\n- 参与动手制作的科学实验\n- 鼓励创新和探索精神\n\n3. 寻找优质的教育资源\n- 参加校内外的STEM课程\n- 利用线上学习平台\n- 关注科技馆的教育活动\n\n4. 培养解决问题的能力\n- 遇到困难时引导而不是直接告知答案\n- 鼓励多角度思考\n- 培养独立思考的习惯\n\n希望这些建议对大家有帮助，也欢迎分享你们的经验！',
          likes: 45,
          comments: 28,
          views: 320,
          tags: ['STEM教育', '创新思维', '科技教育']
        },
        // 帖子2：学习时间管理
        2: {
          id: 2,
          title: '分享：我家孩子的学习时间管理经验',
          author: '快乐妈妈',
          isExpert: false,
          date: '2024-03-24',
          content: '作为两个孩子的妈妈，我想分享一下如何帮助孩子合理安排学习和休息时间。\n\n我们家使用时间块管理法，把一天分成几个时间段，每个时段都有明确的任务。周末也会预留自由活动时间，让孩子能劳逸结合。\n\n具体方法如下：\n\n1. 制定合理的时间表\n- 根据孩子的生物钟安排学习时间\n- 每个学习时段不超过40分钟\n- 学习间隙安排10-15分钟休息\n\n2. 使用视觉提示工具\n- 在家里放置大型日历或时间表\n- 使用计时器帮助孩子了解时间流逝\n- 用不同颜色标记不同类型的活动\n\n3. 培养自我管理能力\n- 让孩子参与制定计划\n- 教会孩子评估任务所需时间\n- 鼓励孩子反思和调整时间安排\n\n这个方法使用半年多了，效果不错，孩子的学习效率提高了，也不会太累。希望对大家有所帮助！',
          likes: 32,
          comments: 18,
          views: 245,
          tags: ['时间管理', '学习方法', '育儿经验']
        },
        // 帖子3：考试焦虑
        3: {
          id: 3,
          title: '如何帮助孩子克服考试焦虑？',
          author: '李心理师',
          isExpert: true,
          date: '2024-03-23',
          content: '作为一名儿童心理咨询师，我经常遇到因考试压力而产生焦虑的孩子。这里分享一些实用的减压技巧。\n\n考试焦虑的表现：\n- 考前失眠、食欲不振\n- 注意力难以集中\n- 过度担忧失败后果\n- 考试时大脑一片空白\n\n有效的应对策略：\n\n1. 教授放松技巧\n- 正念呼吸练习（每天5-10分钟）\n- 渐进式肌肉放松训练\n- 引导想象和冥想\n\n2. 认知调整\n- 帮助孩子识别非理性想法\n- 将"必须成功"转变为"尽力而为"\n- 教导孩子接受不完美\n\n3. 良好的学习习惯\n- 合理规划学习时间，避免临时抱佛脚\n- 使用有效的学习策略，如间隔复习\n- 模拟考试环境进行练习\n\n4. 家长支持\n- 避免给孩子施加过大压力\n- 关注过程而非结果\n- 无条件的爱和支持\n\n希望这些建议能帮助到焦虑的孩子和家长。欢迎交流经验！',
          likes: 56,
          comments: 42,
          views: 415,
          tags: ['心理健康', '考试焦虑', '情绪管理']
        },
        // 其他帖子...
        4: {
          id: 4,
          title: '求助：孩子沉迷手机游戏怎么办？',
          author: '困惑爸爸',
          isExpert: false,
          date: '2024-03-23',
          content: '最近发现孩子一放学回家就想玩手机游戏，作业也不认真做了。我和他说过很多次，但效果不大。\n\n孩子今年上初中一年级，以前学习一直很自觉，但自从接触了手机游戏后，整个人都变了。每天放学回家第一件事就是要玩游戏，说是放松一下，但往往一玩就是几个小时。作业经常应付了事，成绩也开始下滑。\n\n我们尝试过的方法：\n- 限制游戏时间，但他总能找到借口延长\n- 没收手机，结果他就去同学家玩\n- 和他讲道理，他表面答应但转身就忘\n\n我们不想过度干涉孩子的生活，但也担心游戏成瘾影响他的未来。有经验的家长能分享一下如何引导孩子合理使用电子设备吗？现在真的很困扰。',
          likes: 28,
          comments: 35,
          views: 320,
          tags: ['电子产品', '行为管理', '求助']
        },
        5: {
          id: 5,
          title: '分享：音乐教育对孩子成长的影响',
          author: '张音乐老师',
          isExpert: true,
          date: '2024-03-22',
          content: '从事音乐教育多年，深深感受到音乐对孩子智力发展、情感表达和社交能力的积极影响。\n\n音乐教育的益处：\n\n1. 促进大脑发展\n- 增强空间推理能力\n- 提高语言处理能力\n- 增强记忆力和注意力\n\n2. 培养情感表达能力\n- 提供情绪宣泄的健康渠道\n- 增强情绪识别和管理能力\n- 培养艺术感知力和审美能力\n\n3. 培养重要品质\n- 耐心和毅力（通过长期练习）\n- 自律性（坚持日常练习）\n- 接受反馈和不断改进的能力\n\n4. 不同年龄段的音乐启蒙方法\n- 0-3岁：简单的音乐游戏，节奏拍打\n- 4-6岁：尝试简单乐器，如打击乐器\n- 7岁以上：可以开始系统学习乐器\n\n音乐不应该成为负担，而是一种享受和表达。希望每个孩子都能在音乐中找到属于自己的快乐！欢迎分享你们家的音乐教育经验！',
          likes: 38,
          comments: 25,
          views: 280,
          tags: ['音乐教育', '艺术启蒙', '儿童发展']
        }
      };
      
      // 根据ID获取对应的帖子，如果不存在则使用默认帖子
      const postId = Number(id);
      const mockPost = mockPosts[postId] || {
        id: postId,
        title: '默认帖子标题',
        author: '系统用户',
        isExpert: false,
        date: new Date().toISOString().split('T')[0],
        content: '该帖子内容不存在或已被删除。',
        likes: 0,
        comments: 0,
        views: 1,
        tags: ['默认分类']
      };
      
      setPost(mockPost);
    });
    
    // 模拟评论数据
    const mockComments = [
      {
        id: 1,
        author: '创新妈妈',
        isExpert: false,
        date: '2024-03-24',
        content: '感谢分享！我家孩子也对编程很感兴趣，想请教一下从几岁开始接触STEM教育比较合适？'
      },
      {
        id: 2,
        author: '李老师',
        isExpert: true,
        date: '2024-03-24',
        content: '建议可以从5-6岁开始，先用一些图形化的编程工具，比如Scratch Junior，让孩子在游戏中学习编程思维。'
      },
      {
        id: 3,
        author: '科技爸爸',
        isExpert: false,
        date: '2024-03-24',
        content: '分享一下我们的经验，我们家用乐高机器人启蒙，孩子非常喜欢，现在已经能自己编程控制机器人了。'
      }
    ];
    setComments(mockComments);
  }, [id]);
  
  const handleSubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    
    // 实际项目中这里会调用API提交评论
    // api.post(`/api/posts/${id}/comments`, { content: newComment });
    
    const newCommentObj = {
      id: comments.length + 1,
      author: '当前用户',
      isExpert: false,
      date: new Date().toISOString().split('T')[0],
      content: newComment
    };
    
    setComments(prev => [...prev, newCommentObj]);
    setNewComment('');
  };
  
  if (!post) return null;
  
  return (
    <PageContainer>
      <BackButton onClick={() => navigate('/community')}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 12H5M5 12L12 19M5 12L12 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
        返回社区
      </BackButton>
      
      <PostContainer
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
      >
        <PostHeader>
          <PostTitle>{post.title}</PostTitle>
          <PostMeta>
            <AuthorInfo>
              <AuthorAvatar $isExpert={post.isExpert}>
                {post.author[0]}
              </AuthorAvatar>
              <AuthorName $isExpert={post.isExpert}>{post.author}</AuthorName>
              {post.isExpert && <ExpertBadge>专家</ExpertBadge>}
            </AuthorInfo>
            <span>发布于 {post.date}</span>
          </PostMeta>
        </PostHeader>
        
        <PostContent>{post.content}</PostContent>
        
        <TagsContainer>
          {post.tags.map((tag: string) => (
            <Tag key={tag}>{tag}</Tag>
          ))}
        </TagsContainer>
        
        <StatsContainer>
          <StatItem onClick={() => setIsLiked(!isLiked)}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill={isLiked ? 'currentColor' : 'none'} xmlns="http://www.w3.org/2000/svg">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {post.likes} 赞
          </StatItem>
          <StatItem>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {post.comments} 评论
          </StatItem>
          <StatItem>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="12" r="3" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            {post.views} 浏览
          </StatItem>
        </StatsContainer>
        
        <CommentsSection>
          <h2>评论 ({comments.length})</h2>
          
          <CommentForm onSubmit={handleSubmitComment}>
            <CommentInput
              placeholder="写下你的评论..."
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
            />
            <SubmitButton type="submit">发表评论</SubmitButton>
          </CommentForm>
          
          <CommentsList>
            {comments.map(comment => (
              <CommentCard key={comment.id}>
                <CommentHeader>
                  <CommentAuthor>
                    <AuthorAvatar $isExpert={comment.isExpert}>
                      {comment.author[0]}
                    </AuthorAvatar>
                    <AuthorName $isExpert={comment.isExpert}>
                      {comment.author}
                    </AuthorName>
                    {comment.isExpert && <ExpertBadge>专家</ExpertBadge>}
                  </CommentAuthor>
                  <CommentDate>{comment.date}</CommentDate>
                </CommentHeader>
                <CommentContent>{comment.content}</CommentContent>
              </CommentCard>
            ))}
          </CommentsList>
        </CommentsSection>
      </PostContainer>
    </PageContainer>
  );
};

export default PostDetailPage;