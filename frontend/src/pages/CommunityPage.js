import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
const PageContainer = styled.div `
  padding: 2rem;
  max-width: 1000px;
  margin: 0 auto;
`;
const Title = styled.h1 `
  font-size: 2.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-align: center;
  font-weight: 700;
`;
const Description = styled.p `
  text-align: center;
  margin-bottom: 2rem;
  color: #666;
  font-size: 1.1rem;
  line-height: 1.6;
`;
const TabContainer = styled.div `
  display: flex;
  justify-content: center;
  margin-bottom: 2rem;
  border-bottom: 1px solid #eee;
`;
const Tab = styled.button `
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
const FilterContainer = styled.div `
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
`;
const FilterGroup = styled.div `
  display: flex;
  gap: 1rem;
  align-items: center;
`;
const FilterLabel = styled.span `
  font-weight: 500;
  color: var(--text-color);
`;
const Select = styled.select `
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
const SearchInput = styled.input `
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
const PostsContainer = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-bottom: 3rem;
`;
const PostCard = styled(motion.div) `
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
const PostHeader = styled.div `
  padding: 1.5rem;
  border-bottom: 1px solid #f0f0f0;
`;
const PostTitle = styled.h3 `
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.5rem;
`;
const PostMeta = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 0.875rem;
  color: #666;
`;
const PostAuthor = styled.span `
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const AuthorAvatar = styled.div `
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
const PostDate = styled.span `
  color: #999;
`;
const PostContent = styled.div `
  padding: 1.5rem;
  flex: 1;
`;
const PostExcerpt = styled.p `
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
const PostFooter = styled.div `
  padding: 1rem 1.5rem;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const PostStats = styled.div `
  display: flex;
  gap: 1rem;
  color: #666;
  font-size: 0.875rem;
`;
const StatItem = styled.div `
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;
const TagsContainer = styled.div `
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
`;
const Tag = styled.span `
  background-color: #f0f0f0;
  color: #666;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
`;
const SectionTitle = styled.h2 `
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-weight: 600;
`;
const TrendingTopicsContainer = styled.div `
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
  margin-bottom: 2rem;
`;
const TopicsList = styled.div `
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
`;
const TopicItem = styled.div `
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
const ExpertsContainer = styled.div `
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
  margin-bottom: 2rem;
`;
const ExpertsList = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
`;
const ExpertCard = styled.div `
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
const ExpertAvatar = styled.div `
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
const ExpertInfo = styled.div `
  flex: 1;
`;
const ExpertName = styled.h4 `
  margin: 0;
  font-size: 1rem;
  font-weight: 600;
  color: var(--text-color);
  margin-bottom: 0.25rem;
`;
const ExpertTitle = styled.p `
  margin: 0;
  font-size: 0.875rem;
  color: #666;
`;
const CreatePostButton = styled.button `
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
const Modal = styled.div `
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
const ModalContent = styled(motion.div) `
  background: white;
  border-radius: 16px;
  width: 90%;
  max-width: 600px;
  max-height: 90vh;
  overflow-y: auto;
  padding: 2rem;
`;
const ModalTitle = styled.h3 `
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-weight: 600;
`;
const Form = styled.form `
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const FormGroup = styled.div `
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
`;
const Label = styled.label `
  font-weight: 500;
  color: var(--text-color);
`;
const Input = styled.input `
  padding: 0.75rem 1rem;
  border-radius: 8px;
  border: 1px solid #ddd;
  font-size: 0.95rem;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;
const Textarea = styled.textarea `
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
const FormActions = styled.div `
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;
const Button = styled.button `
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
const CancelButton = styled(Button) `
  background-color: #f0f0f0;
  color: #666;
  
  &:hover {
    background-color: #e0e0e0;
  }
`;
const SubmitButton = styled(Button) `
  background-color: var(--primary-color);
  color: white;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(106, 90, 205, 0.3);
  }
`;
// 模拟数据
// 获取当前日期和前几天的日期
const getCurrentDate = () => {
    const now = new Date();
    return now.toISOString().split('T')[0];
};
const getDateBefore = (days) => {
    const date = new Date();
    date.setDate(date.getDate() - days);
    return date.toISOString().split('T')[0];
};
const mockPosts = [
    {
        id: 1,
        title: '孩子对STEM教育很感兴趣，如何培养？',
        author: '王教授',
        isExpert: true,
        date: getCurrentDate(),
        content: '最近发现我家孩子对编程和机器人制作特别感兴趣。作为一名教育工作者，我认为STEM教育对孩子的创新思维和问题解决能力培养非常重要。想和大家分享一些科技教育资源和实践经验，也欢迎讨论如何在家庭中开展STEM教育活动。',
        likes: 45,
        comments: 28,
        views: 320,
        tags: ['STEM教育', '创新思维', '科技教育']
    },
    {
        id: 2,
        title: '分享：我家孩子的学习时间管理经验',
        author: '快乐妈妈',
        isExpert: false,
        date: getCurrentDate(),
        content: '作为两个孩子的妈妈，我想分享一下如何帮助孩子合理安排学习和休息时间。我们家使用时间块管理法，把一天分成几个时间段，每个时段都有明确的任务。周末也会预留自由活动时间，让孩子能劳逸结合。这个方法使用半年多了，效果不错，孩子的学习效率提高了，也不会太累。',
        likes: 32,
        comments: 18,
        views: 245,
        tags: ['时间管理', '学习方法', '育儿经验']
    },
    {
        id: 3,
        title: '如何帮助孩子克服考试焦虑？',
        author: '李心理师',
        isExpert: true,
        date: getDateBefore(1),
        content: '作为一名儿童心理咨询师，我经常遇到因考试压力而产生焦虑的孩子。这里分享一些实用的减压技巧：正念呼吸练习、合理规划学习时间、建立积极的自我对话等。同时，家长的态度和支持也很关键。欢迎交流经验！',
        likes: 56,
        comments: 42,
        views: 415,
        tags: ['心理健康', '考试焦虑', '情绪管理']
    },
    {
        id: 4,
        title: '求助：孩子沉迷手机游戏怎么办？',
        author: '困惑爸爸',
        isExpert: false,
        date: getDateBefore(1),
        content: '最近发现孩子一放学回家就想玩手机游戏，作业也不认真做了。我和他说过很多次，但效果不大。有经验的家长能分享一下如何引导孩子合理使用电子设备吗？现在真的很困扰。',
        likes: 28,
        comments: 35,
        views: 320,
        tags: ['电子产品', '行为管理', '求助']
    },
    {
        id: 5,
        title: '分享：音乐教育对孩子成长的影响',
        author: '张音乐老师',
        isExpert: true,
        date: getDateBefore(2),
        content: '从事音乐教育多年，深深感受到音乐对孩子智力发展、情感表达和社交能力的积极影响。想分享一些适合不同年龄段的音乐启蒙方法，以及如何让孩子真正爱上音乐。也欢迎分享你们家的音乐教育经验！',
        likes: 38,
        comments: 25,
        views: 280,
        tags: ['音乐教育', '艺术启蒙', '儿童发展']
    },
    {
        id: 6,
        title: '经验分享：如何培养孩子的阅读习惯',
        author: '书香妈妈',
        isExpert: false,
        date: getDateBefore(2),
        content: '想分享一下我们家培养孩子阅读习惯的经验。从孩子两岁开始，我们就每天坚持亲子共读，现在孩子六岁了，已经养成了每天阅读的习惯。重点是要选择适合孩子年龄的书籍，并且要让阅读变成一件有趣的事情，而不是任务。',
        likes: 42,
        comments: 31,
        views: 298,
        tags: ['阅读习惯', '亲子共读', '育儿经验']
    },
    {
        id: 7,
        title: '营养均衡：如何让挑食的孩子爱上健康饮食？',
        author: '陈营养师',
        isExpert: true,
        date: getDateBefore(3),
        content: '很多家长都为孩子挑食发愁。作为儿童营养师，我想分享一些让孩子爱上健康食物的创意方法：食物造型设计、亲子烹饪、认识食物的故事等。同时也会介绍一些营养均衡的食谱，让孩子在享受美食的同时获得健康。',
        likes: 62,
        comments: 45,
        views: 520,
        tags: ['营养健康', '饮食习惯', '亲子烹饪']
    },
    {
        id: 8,
        title: '分享：我家的亲子运动时光',
        author: '活力爸爸',
        isExpert: false,
        date: getDateBefore(3),
        content: '每个周末，我都会带孩子去公园运动。我们会玩飞盘、踢足球、打羽毛球等，有时也会和其他家庭一起组织小型运动会。通过运动，不仅增进了父子感情，也让孩子变得更加阳光开朗。欢迎大家分享你们的亲子运动经验！',
        likes: 35,
        comments: 27,
        views: 265,
        tags: ['亲子运动', '周末活动', '健康成长']
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
const CommunityPage = () => {
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState('all');
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
    const handleCreatePost = (e) => {
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
            }
            else if (activeTab === 'popular') {
                return b.likes - a.likes;
            }
            return 0;
        });
    };
    return (_jsxs(PageContainer, { children: [_jsx(Title, { children: "\u5FC3\u7075\u7EBD\u5E26\u793E\u533A" }), _jsx(Description, { children: "\u5728\u8FD9\u91CC\u5206\u4EAB\u60A8\u7684\u80B2\u513F\u7ECF\u9A8C\uFF0C\u4E0E\u5176\u4ED6\u5BB6\u957F\u4EA4\u6D41\u4E92\u52A8" }), _jsxs(TabContainer, { children: [_jsx(Tab, { "$isActive": activeTab === 'all', onClick: () => setActiveTab('all'), children: "\u5168\u90E8" }), _jsx(Tab, { "$isActive": activeTab === 'popular', onClick: () => setActiveTab('popular'), children: "\u70ED\u95E8" }), _jsx(Tab, { "$isActive": activeTab === 'latest', onClick: () => setActiveTab('latest'), children: "\u6700\u65B0" })] }), _jsxs(TrendingTopicsContainer, { children: [_jsx(SectionTitle, { children: "\u70ED\u95E8\u8BDD\u9898" }), _jsx(TopicsList, { children: trendingTopics.map(topic => (_jsxs(TopicItem, { onClick: () => setCategoryFilter(topic.name), children: ["#", topic.name] }, topic.id))) })] }), _jsxs(ExpertsContainer, { children: [_jsx(SectionTitle, { children: "\u4E13\u5BB6\u987E\u95EE" }), _jsx(ExpertsList, { children: experts.map(expert => (_jsxs(ExpertCard, { children: [_jsx(ExpertAvatar, { children: expert.avatar }), _jsxs(ExpertInfo, { children: [_jsx(ExpertName, { children: expert.name }), _jsx(ExpertTitle, { children: expert.title })] })] }, expert.id))) })] }), _jsxs(FilterContainer, { children: [_jsxs(FilterGroup, { children: [_jsx(FilterLabel, { children: "\u5206\u7C7B\uFF1A" }), _jsxs(Select, { value: categoryFilter, onChange: e => setCategoryFilter(e.target.value), children: [_jsx("option", { value: "all", children: "\u5168\u90E8" }), _jsx("option", { value: "\u5B66\u4E60\u4E60\u60EF", children: "\u5B66\u4E60\u4E60\u60EF" }), _jsx("option", { value: "\u6C9F\u901A\u6280\u5DE7", children: "\u6C9F\u901A\u6280\u5DE7" }), _jsx("option", { value: "\u60C5\u7EEA\u7BA1\u7406", children: "\u60C5\u7EEA\u7BA1\u7406" }), _jsx("option", { value: "\u5065\u5EB7\u6210\u957F", children: "\u5065\u5EB7\u6210\u957F" })] })] }), _jsx(SearchInput, { type: "text", placeholder: "\u641C\u7D22\u5E16\u5B50...", value: searchQuery, onChange: e => setSearchQuery(e.target.value) })] }), _jsx(PostsContainer, { children: getFilteredAndSortedPosts().length > 0 ? (getFilteredAndSortedPosts().map(post => (_jsxs(PostCard, { onClick: () => navigate(`/post/${post.id}`), initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, children: [_jsxs(PostHeader, { children: [_jsx(PostTitle, { children: post.title }), _jsxs(PostMeta, { children: [_jsxs(PostAuthor, { children: [_jsx(AuthorAvatar, { children: post.author[0] }), post.author] }), _jsx(PostDate, { children: post.date })] })] }), _jsxs(PostContent, { children: [_jsx(PostExcerpt, { children: post.content }), _jsx(TagsContainer, { children: post.tags.map((tag, index) => (_jsx(Tag, { children: tag }, index))) })] }), _jsx(PostFooter, { children: _jsxs(PostStats, { children: [_jsxs(StatItem, { children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z", fill: "currentColor" }) }), post.likes] }), _jsxs(StatItem, { children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z", fill: "currentColor" }) }), post.comments] }), _jsxs(StatItem, { children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M12 4.5C7 4.5 2.73 7.61 1 12c1.73 4.39 6 7.5 11 7.5s9.27-3.11 11-7.5c-1.73-4.39-6-7.5-11-7.5zM12 17c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5zm0-8c-1.66 0-3 1.34-3 3s1.34 3 3 3 3-1.34 3-3-1.34-3-3-3z", fill: "currentColor" }) }), post.views] })] }) })] }, post.id)))) : (_jsx("div", { children: "\u6682\u65E0\u5E16\u5B50" })) }), _jsx(CreatePostButton, { onClick: () => setShowCreateModal(true), children: _jsx("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M19 13h-6v6h-2v-6H5v-2h6V5h2v6h6v2z", fill: "currentColor" }) }) }), showCreateModal && (_jsx(Modal, { onClick: () => setShowCreateModal(false), children: _jsxs(ModalContent, { onClick: e => e.stopPropagation(), initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, children: [_jsx(ModalTitle, { children: "\u53D1\u5E03\u65B0\u5E16\u5B50" }), _jsxs(Form, { onSubmit: handleCreatePost, children: [_jsxs(FormGroup, { children: [_jsx(Label, { children: "\u6807\u9898" }), _jsx(Input, { type: "text", value: postTitle, onChange: e => setPostTitle(e.target.value), placeholder: "\u8BF7\u8F93\u5165\u5E16\u5B50\u6807\u9898", required: true })] }), _jsxs(FormGroup, { children: [_jsx(Label, { children: "\u5185\u5BB9" }), _jsx(Textarea, { value: postContent, onChange: e => setPostContent(e.target.value), placeholder: "\u8BF7\u8F93\u5165\u5E16\u5B50\u5185\u5BB9", required: true })] }), _jsxs(FormGroup, { children: [_jsx(Label, { children: "\u6807\u7B7E" }), _jsx(Input, { type: "text", value: postTags, onChange: e => setPostTags(e.target.value), placeholder: "\u8BF7\u8F93\u5165\u6807\u7B7E\uFF0C\u7528\u9017\u53F7\u5206\u9694" })] }), _jsxs(FormActions, { children: [_jsx(CancelButton, { type: "button", onClick: () => setShowCreateModal(false), children: "\u53D6\u6D88" }), _jsx(SubmitButton, { type: "submit", children: "\u53D1\u5E03" })] })] })] }) }))] }));
};
export default CommunityPage;
