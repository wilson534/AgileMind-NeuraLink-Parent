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
    // api.get(`/api/posts/${id}`).then(response => setPost(response.data));
    
    // 模拟数据
    const mockPost = {
      id: Number(id),
      title: '孩子对STEM教育很感兴趣，如何培养？',
      author: '王教授',
      isExpert: true,
      date: '2024-03-24',
      content: '最近发现我家孩子对编程和机器人制作特别感兴趣。作为一名教育工作者，我认为STEM教育对孩子的创新思维和问题解决能力培养非常重要。\n\n以下是一些具体的建议：\n\n1. 从孩子的兴趣出发\n- 观察孩子对什么类型的科技活动最感兴趣\n- 选择适合年龄的STEM玩具和工具\n- 让学习过程充满趣味性\n\n2. 动手实践很重要\n- 购置基础的编程套件（如Scratch Junior、micro:bit等）\n- 参与动手制作的科学实验\n- 鼓励创新和探索精神\n\n3. 寻找优质的教育资源\n- 参加校内外的STEM课程\n- 利用线上学习平台\n- 关注科技馆的教育活动\n\n4. 培养解决问题的能力\n- 遇到困难时引导而不是直接告知答案\n- 鼓励多角度思考\n- 培养独立思考的习惯\n\n希望这些建议对大家有帮助，也欢迎分享你们的经验！',
      likes: 45,
      comments: 28,
      views: 320,
      tags: ['STEM教育', '创新思维', '科技教育']
    };
    setPost(mockPost);
    
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