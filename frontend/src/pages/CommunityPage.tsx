import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import api from '../utils/api';

const PageContainer = styled.div`
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;
`;

const Description = styled.p`
  text-align: center;
  margin-bottom: 2rem;
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
`;

const TabContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
`;

const Tab = styled.button<{ $isActive: boolean }>`
  padding: 0.75rem 1.5rem;
  background: none;
  border: none;
  font-size: 1.1rem;
  font-weight: ${props => props.$isActive ? '600' : '400'};
  color: ${props => props.$isActive ? 'var(--primary-color)' : 'var(--text-color)'};
  cursor: pointer;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    bottom: -1px;
    left: 0;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background-color: var(--primary-color);
    transition: width var(--transition-time);
  }
  
  &:hover::after {
    width: 100%;
  }
`;

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;

const FilterGroup = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const FilterLabel = styled.span`
  font-weight: 500;
  color: var(--text-color);
`;

const Select = styled.select`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 0.9rem;
  color: var(--text-color);
  cursor: pointer;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const SearchInput = styled.input`
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  background-color: white;
  font-size: 0.9rem;
  width: 250px;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const PostsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;

const PostCard = styled(motion.div)`
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  display: flex;
  flex-direction: column;
  height: 100%;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const PostHeader = styled.div`
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
`;

const PostTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
`;

const PostMeta = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #666;
`;

const PostAuthor = styled.span`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const AuthorAvatar = styled.div`
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
`;

const PostDate = styled.span`
  color: #999;
`;

const PostContent = styled.div`
  padding: 1.5rem;
  flex: 1;
`;

const PostExcerpt = styled.p`
  margin: 0;
  color: #666;
  font-size: 0.95rem;
  line-height: 1.6;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const PostFooter = styled.div`
  padding: 1rem 1.5rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const PostStats = styled.div`
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.875rem;
`;

const StatItem = styled.div`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const TagsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;

const Tag = styled.span`
  background-color: #f0f0f0;
  color: #666;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const TrendingTopicsContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
  margin-bottom: 2rem;
`;

const TopicsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;

const TopicItem = styled.div`
  background-color: #f8f5ff;
  border: 1px solid #e6e0fa;
  color: var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    background-color: #efe9ff;
    transform: translateY(-2px);
  }
`;

const ExpertsContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
  margin-bottom: 2rem;
`;

const ExpertsList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;

const ExpertCard = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  border-radius: 12px;
  background-color: #f8f9fa;
  transition: all 0.3s;
  cursor: pointer;
  
  &:hover {
    background-color: #f0f2f5;
    transform: translateY(-2px);
  }
`;

const ExpertAvatar = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 1.5rem;
  font-weight: 600;
`;

const ExpertInfo = styled.div`
  flex: 1;
`;

const ExpertName = styled.h4`
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.25rem;
`;

const ExpertTitle = styled.p`
  margin: 0;
  font-size: 0.875rem;
  color: #666;
`;

const CreatePostButton = styled.button`
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: var(--primary-color);
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  border: none;
  box-shadow: 0 4px 10px rgba(106, 90, 205, 0.3);
  cursor: pointer;
  transition: all 0.3s;
  z-index: 10;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 6px 15px rgba(106, 90, 205, 0.4);
  }
  
  svg {
    width: 24px;
    height: 24px;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 100;
`;

const ModalContent = styled(motion.div)`
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
`;

const ModalTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;

const Label = styled.label`
  font-weight: 500;
  color: var(--text-color);
`;

const Input = styled.input`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const Textarea = styled.textarea`
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
  min-height: 150px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const FormActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
  }
`;

const CancelButton = styled(Button)`
  background-color: #f0f0f0;
  color: #666;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;

const SubmitButton = styled(Button)`
  background-color: var(--primary-color);
  color: white;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(106, 90, 205, 0.3);
  }
`;

// 模拟数据
const mockPosts = [
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
  },
  {
    id: 4,
    title: '推荐几本适合小学生的科普读物',
    author: '刘老师',
    date: '2023-06-10',
    content: '作为一名小学科学老师，我想推荐几本非常适合小学生阅读的科普书籍，这些书既有趣又能激发孩子的科学兴趣。《十万个为什么》系列、《可怕的科学》系列、《DK儿童百科全书》等都是不错的选择。大家有没有其他好的科普书推荐？',
    likes: 18,
    comments: 12,
    views: 89,
    tags: ['阅读推荐', '科普', '小学生']
  },
  {
    id: 5,
    title: '孩子注意力不集中，是多动症吗？',
    author: '陈妈妈',
    date: '2023-06-08',
    content: '我家孩子今年6岁，上幼儿园大班。老师反映他上课注意力不集中，坐不住，经常打扰其他小朋友。我很担心是不是多动症，但又不确定。有没有家长遇到类似情况？应该怎么判断是正常活泼还是需要就医？',
    likes: 29,
    comments: 24,
    views: 176,
    tags: ['注意力', '多动症', '幼儿园']
  },
  {
    id: 6,
    title: '分享：如何培养孩子的阅读习惯',
    author: '赵爸爸',
    date: '2023-06-05',
    content: '我家孩子从小就很喜欢看书，现在上小学四年级，阅读量已经很可观了。想分享一下我们是如何培养她阅读习惯的：从亲子共读开始，逐渐引导独立阅读；选择适合年龄的书籍；创造舒适的阅读环境；以身作则，父母也要多看书等。希望对其他家长有所帮助。',
    likes: 33,
    comments: 18,
    views: 145,
    tags: ['阅读习惯', '小学生']
  }
];

const mockTrendingTopics = [
  { id: 1, name: '学习方法' },
  { id: 2, name: '亲子沟通' },
  { id: 3, name: '情绪管理' },
  { id: 4, name: '电子产品使用' },
  { id: 5, name: '青春期教育' },
  { id: 6, name: '阅读习惯' },
  { id: 7, name: '体育锻炼' },
  { id: 8, name: '营养健康' }
];

const mockExperts = [
  { id: 1, name: '王教授', title: '儿童心理学专家', avatar: 'W' },
  { id: 2, name: '李医生', title: '儿科医生', avatar: 'L' },
  { id: 3, name: '张老师', title: '特殊教育专家', avatar: 'Z' },
  { id: 4, name: '刘博士', title: '青少年发展心理学家', avatar: 'L' }
];

const CommunityPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'all' | 'popular' | 'latest'>('all');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [posts, setPosts] = useState(mockPosts);
  const [trendingTopics, setTrendingTopics] = useState(mockTrendingTopics);
  const [experts, setExperts] = useState(mockExperts);
  const [showCreateModal, setShowCreateModal] = useState(false);
  
  // 表单状态
  const [postTitle, setPostTitle] = useState('');
  const [postContent, setPostContent] = useState('');
  const [postTags, setPostTags] = useState('');
  
  // 处理创建帖子
  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    // 实际项目中这里会调用API创建帖子
    const newPost = {
      id: posts.length + 1,
      title: postTitle,
      content: postContent,
      author: '当前用户',
      date: new Date().toISOString().split('T')[0],
      likes: 0,
      comments: 0,
      views: 0,
      tags: postTags.split(',').map(tag => tag.trim()).filter(tag => tag)
    };
    
    setPosts([newPost, ...posts]);
    setPostTitle('');
    setPostContent('');
    setPostTags('');
    setShowCreateModal(false);
  };
  
  // 模拟从API获取数据
  useEffect(() => {
    // 实际项目中，这里会调用API获取数据
    // api.get('/api/community/posts')
    //   .then(response => setPosts(response.data))
    //   .catch(error => console.error('获取帖子失败:', error));
    
    // api.get('/api/community/trending')
    //   .then(response => setTrendingTopics(response.data))
    //   .catch(error => console.error('获取热门话题失败:', error));
    
    // api.get('/api/community/experts')
    //   .then(response => setExperts(response.data))
    //   .catch(error => console.error('获取专家列表失败:', error));
  }, []);
  
  // 过滤和排序帖子
  const getFilteredAndSortedPosts = () => {
    return posts
      .filter(post => {
        const matchesCategory = categoryFilter === 'all' || post.tags.includes(categoryFilter);
        if (searchQuery) {
          const query = searchQuery.toLowerCase();
          const titleMatch = post.title.toLowerCase().includes(query);
          const contentMatch = post.content.toLowerCase().includes(query);
          const authorMatch = post.author.toLowerCase().includes(query);
          return matchesCategory && (titleMatch || contentMatch || authorMatch);
        }
        return matchesCategory;
      })
      .sort((a, b) => {
        if (activeTab === 'latest') {
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        } else if (activeTab === 'popular') {
          return b.likes - a.likes;
        }
        return 0;
      });
  };

  return (
    <PageContainer>
      <Title>心灵纽带社区</Title>
      <Description>在这里分享您的育儿经验，与其他家长交流互动</Description>
      
      <TabContainer>
        <Tab
          $isActive={activeTab === 'all'}
          onClick={() => setActiveTab('all')}
        >
          全部
        </Tab>
        <Tab
          $isActive={activeTab === 'popular'}
          onClick={() => setActiveTab('popular')}
        >
          热门
        </Tab>
        <Tab
          $isActive={activeTab === 'latest'}
          onClick={() => setActiveTab('latest')}
        >
          最新
        </Tab>
      </TabContainer>
      
      <TrendingTopicsContainer>
        <SectionTitle>热门话题</SectionTitle>
        <TopicsList>
          {trendingTopics.map(topic => (
            <TopicItem 
              key={topic.id}
              onClick={() => setCategoryFilter(topic.name)}
            >
              #{topic.name}
            </TopicItem>
          ))}
        </TopicsList>
      </TrendingTopicsContainer>
      
      <ExpertsContainer>
        <SectionTitle>专家顾问</SectionTitle>
        <ExpertsList>
          {experts.map(expert => (
            <ExpertCard key={expert.id}>
              <ExpertAvatar>{expert.avatar}</ExpertAvatar>
              <ExpertInfo>
                <ExpertName>{expert.name}</ExpertName>
                <ExpertTitle>{expert.title}</ExpertTitle>
              </ExpertInfo>
            </ExpertCard>
          ))}
        </ExpertsList>
      </ExpertsContainer>
      
      <FilterContainer>
        <FilterGroup>
          <FilterLabel>分类：</FilterLabel>
          <Select
            value={categoryFilter}
            onChange={e => setCategoryFilter(e.target.value)}
          >
            <option value="all">全部</option>
            <option value="学习习惯">学习习惯</option>
            <option value="沟通技巧">沟通技巧</option>
            <option value="情绪管理">情绪管理</option>
            <option value="健康成长">健康成长</option>
          </Select>
        </FilterGroup>
        
        <SearchInput
          type="text"
          placeholder="搜索帖子..."
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
        />
      </FilterContainer>
      
      <PostsContainer>
        {filteredAndSortedPosts.length > 0 ? (
          filteredAndSortedPosts.map(post => (
            <PostCard
              key={post.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              <PostHeader>
                <PostTitle>{post.title}</PostTitle>
                <PostMeta>
                  <PostAuthor>
                    <AuthorAvatar>{post.author[0]}</AuthorAvatar>
                    {post.author}
                  </PostAuthor>
                  <PostDate>{post.date}</PostDate>
                </PostMeta>
              </PostHeader>
              
              <PostContent>
                <PostExcerpt>{post.content}</PostExcerpt>
                <TagsContainer>
                  {post.tags.map((tag, index) => (
                    <Tag key={index}>{tag}</Tag>
                  ))}
                </TagsContainer>
              </PostContent>
              
              <PostFooter>
                <PostStats>
                  <StatItem>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" fill="currentColor" />
                    </svg>
                    {post.likes}
                  </StatItem>
                  <StatItem>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z" fill="currentColor" />
                    </svg>
                    {post.comments}
                  </StatItem>
                  <StatItem>
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z" fill="currentColor" />
                    </svg>
                    {post.views}
                  </StatItem>
                </PostStats>
              </PostFooter>
            </PostCard>
          ))
        ) : (
          <div>暂无帖子</div>
        )}
      </PostsContainer>
      
      <CreatePostButton onClick={() => setShowCreateModal(true)}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z" fill="currentColor" />
        </svg>
      </CreatePostButton>
      
      {showCreateModal && (
        <Modal onClick={() => setShowCreateModal(false)}>
          <ModalContent
            onClick={e => e.stopPropagation()}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <ModalTitle>发布新帖子</ModalTitle>
            <Form onSubmit={handleCreatePost}>
              <FormGroup>
                <Label>标题</Label>
                <Input
                  type="text"
                  value={postTitle}
                  onChange={e => setPostTitle(e.target.value)}
                  placeholder="请输入帖子标题"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>内容</Label>
                <Textarea
                  value={postContent}
                  onChange={e => setPostContent(e.target.value)}
                  placeholder="请输入帖子内容"
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label>标签</Label>
                <Input
                  type="text"
                  value={postTags}
                  onChange={e => setPostTags(e.target.value)}
                  placeholder="请输入标签，用逗号分隔"
                />
              </FormGroup>
              
              <FormActions>
                <CancelButton type="button" onClick={() => setShowCreateModal(false)}>
                  取消
                </CancelButton>
                <SubmitButton type="submit">
                  发布
                </SubmitButton>
              </FormActions>
            </Form>
          </ModalContent>
        </Modal>
      )}
    </PageContainer>
  );
};

export default CommunityPage;