import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
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
const ConversationsContainer = styled.div `
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const ConversationCard = styled(motion.div) `
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s, box-shadow 0.3s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;
const ConversationHeader = styled.div `
  background: ${props => props.$emotionColor};
  padding: 1.5rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ConversationDate = styled.div `
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  opacity: 0.9;
`;
const ConversationTitle = styled.h3 `
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
`;
const EmotionTag = styled.span `
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;
const ConversationContent = styled.div `
  padding: 1.5rem;
`;
const MessageList = styled.div `
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;
const Message = styled.div `
  display: flex;
  flex-direction: ${props => props.$isChild ? 'row' : 'row-reverse'};
  gap: 1rem;
  max-width: 80%;
  align-self: ${props => props.$isChild ? 'flex-start' : 'flex-end'};
`;
const Avatar = styled.div `
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background-color: ${props => props.$isChild ? '#FFD166' : '#06D6A0'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
`;
const MessageBubble = styled.div `
  background-color: ${props => props.$isChild ? '#F8F9FA' : '#EFF6FF'};
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border-top-left-radius: ${props => props.$isChild ? '0' : '12px'};
  border-top-right-radius: ${props => props.$isChild ? '12px' : '0'};
  font-size: 0.95rem;
  color: var(--text-color);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;
const MessageTime = styled.div `
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.25rem;
`;
const ActionButtons = styled.div `
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;
const Button = styled.button `
  padding: 0.5rem 1rem;
  border-radius: 8px;
  border: none;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  
  &:hover {
    transform: translateY(-2px);
  }
`;
const PrimaryButton = styled(Button) `
  background-color: var(--primary-color);
  color: white;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(106, 90, 205, 0.3);
  }
`;
const SecondaryButton = styled(Button) `
  background-color: white;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  
  &:hover {
    background-color: #f8f5ff;
  }
`;
const ReminderSection = styled.div `
  margin-top: 3rem;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
`;
const ReminderHistorySection = styled.div `
  margin-top: 2rem;
`;
const ReminderList = styled.div `
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const ReminderCard = styled.div `
  background: white;
  border-radius: 12px;
  padding: 1rem;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.05);
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ReminderInfo = styled.div `
  flex: 1;
`;
const ReminderCardTitle = styled.h4 `
  margin: 0;
  font-size: 1rem;
  color: var(--text-color);
  margin-bottom: 0.25rem;
`;
const ReminderCardMeta = styled.div `
  font-size: 0.875rem;
  color: #666;
  display: flex;
  gap: 1rem;
`;
const ReminderCardActions = styled.div `
  display: flex;
  gap: 0.5rem;
`;
const SectionTitle = styled.h2 `
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-weight: 600;
`;
const ChildMessagesContainer = styled.div `
  margin-top: 2rem;
`;
const MessagesList = styled.div `
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;
const MessageCard = styled.div `
  background: white;
  border-radius: 12px;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s;
  cursor: pointer;
  
  &:hover {
    transform: translateY(-3px);
  }
`;
const MessageHeader = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
`;
const UnreadBadge = styled.span `
  background-color: var(--primary-color);
  color: white;
  padding: 0.25rem 0.5rem;
  border-radius: 12px;
  font-size: 0.75rem;
  font-weight: 500;
`;
const MessageContent = styled.p `
  font-size: 1.1rem;
  line-height: 1.6;
  color: var(--text-color);
  margin-bottom: 1.5rem;
  white-space: pre-wrap;
`;
const MessageFooter = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const ReplyButton = styled.button `
  background: none;
  border: none;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
  cursor: pointer;
  padding: 0.5rem 0;
  font-size: 0.9rem;
  
  &:hover {
    text-decoration: underline;
  }
`;
const MessageStatus = styled.span `
  color: #999;
  font-size: 0.875rem;
`;
const EmptyState = styled.div `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  background: white;
  border-radius: 12px;
  box-shadow: var(--card-shadow);
`;
const EmptyIcon = styled.div `
  margin-bottom: 1.5rem;
  color: #ccc;
`;
const EmptyText = styled.h3 `
  font-size: 1.2rem;
  color: #666;
  margin-bottom: 0.5rem;
`;
const EmptyDescription = styled.p `
  color: #999;
  text-align: center;
  max-width: 300px;
`;
const MessageDetailModal = styled.div `
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;
const MessageDetailContent = styled.div `
  background: white;
  border-radius: 16px;
  padding: 2rem;
  width: 90%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);
`;
const MessageDetailHeader = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.5rem;
  padding-bottom: 1rem;
  border-bottom: 1px solid #eee;
`;
const CloseButton = styled.button `
  background: none;
  border: none;
  font-size: 1.5rem;
  cursor: pointer;
  color: #666;
  
  &:hover {
    color: var(--primary-color);
  }
`;
const SectionDescription = styled.p `
  color: #666;
  margin-bottom: 2rem;
  font-size: 1rem;
  line-height: 1.5;
`;
const ReminderForm = styled.form `
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;
const FormActions = styled.div `
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;
const InterventionSection = styled.div `
  margin-top: 3rem;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
`;
const InterventionForm = styled.form `
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
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
const mockConversations = [
    {
        id: 1,
        date: getCurrentDate(),
        title: '今天的美术课很有趣',
        emotion: '开心',
        emotionColor: '#06D6A0',
        messages: [
            { id: 1, sender: 'child', content: '小熊，今天我们画了春天的景色！', time: '14:30' },
            { id: 2, sender: 'bear', content: '真棒！你画了些什么呢？', time: '14:31' },
            { id: 3, sender: 'child', content: '我画了樱花树和小鸟，老师说我画得很好看！', time: '14:32' },
            { id: 4, sender: 'bear', content: '听起来是幅美丽的画作呢！你喜欢画画吗？', time: '14:33' },
            { id: 5, sender: 'child', content: '嗯！我最喜欢美术课了，可以画出自己想象的东西', time: '14:34' },
        ]
    },
    {
        id: 2,
        date: getDateBefore(1),
        title: '和同学有了小矛盾',
        emotion: '难过',
        emotionColor: '#4A6FA5',
        messages: [
            { id: 1, sender: 'child', content: '小熊，我和小明今天吵架了', time: '16:20' },
            { id: 2, sender: 'bear', content: '发生什么事了呢？可以告诉我吗？', time: '16:21' },
            { id: 3, sender: 'child', content: '我们都想当体育课的小队长，就争执起来了', time: '16:22' },
            { id: 4, sender: 'bear', content: '我明白你们都很想当小队长。不过，朋友之间有分歧是很正常的，重要的是如何解决它。你们可以轮流当小队长，这样大家都有机会，你觉得呢？', time: '16:23' },
            { id: 5, sender: 'child', content: '这个主意不错，明天我去和小明 says', time: '16:24' },
        ]
    },
    {
        id: 3,
        date: getDateBefore(2),
        title: '学会了新的数学解题方法',
        emotion: '兴奋',
        emotionColor: '#FFD166',
        messages: [
            { id: 1, sender: 'child', content: '小熊！我今天终于学会了分数除法！', time: '15:45' },
            { id: 2, sender: 'bear', content: '太棒了！是老师教了新的方法吗？', time: '15:46' },
            { id: 3, sender: 'child', content: '对啊，原来倒过来乘就可以了，一点都不难！', time: '15:47' },
            { id: 4, sender: 'bear', content: '你很聪明呢！现在明白了这个方法，以后做类似的题目就容易多了吧？', time: '15:48' },
            { id: 5, sender: 'child', content: '是的！我要把这个方法教给其他同学！', time: '15:49' },
        ]
    },
    {
        id: 4,
        date: getDateBefore(3),
        title: '参加了学校的科技展',
        emotion: '自豪',
        emotionColor: '#06D6A0',
        messages: [
            { id: 1, sender: 'child', content: '小熊，我的科技作品获得了优秀奖！', time: '17:30' },
            { id: 2, sender: 'bear', content: '恭喜你！能给我介绍一下你的作品吗？', time: '17:31' },
            { id: 3, sender: 'child', content: '我做了一个太阳能小风扇，可以自动追踪光线！', time: '17:32' },
            { id: 4, sender: 'bear', content: '哇，这真是个既环保又实用的发明！你一定花了很多时间准备吧？', time: '17:33' },
            { id: 5, sender: 'child', content: '是的，我查了很多资料，爸爸也帮我改进了设计', time: '17:34' },
        ]
    },
    {
        id: 5,
        date: getDateBefore(4),
        title: '第一次参加合唱团排练',
        emotion: '期待',
        emotionColor: '#FFB5A7',
        messages: [
            { id: 1, sender: 'child', content: '小熊，我今天加入了学校的合唱团！', time: '16:10' },
            { id: 2, sender: 'bear', content: '这是个很好的机会！第一天排练感觉如何？', time: '16:11' },
            { id: 3, sender: 'child', content: '有点紧张，但是大家都很友好，老师说我音准不错', time: '16:12' },
            { id: 4, sender: 'bear', content: '这很棒啊！合唱最重要的就是大家一起配合。你们准备表演什么歌曲？', time: '16:13' },
            { id: 5, sender: 'child', content: '我们要在校庆时表演《让我们荡起双桨》，我已经等不及了！', time: '16:14' },
        ]
    }
];
const ParentVoicePage = () => {
    const [activeTab, setActiveTab] = useState('conversations');
    const [dateFilter, setDateFilter] = useState('all');
    const [emotionFilter, setEmotionFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');
    const [customStartDate, setCustomStartDate] = useState('');
    const [customEndDate, setCustomEndDate] = useState('');
    const [savedInterventions, setSavedInterventions] = useState([]);
    const [savedReminders, setSavedReminders] = useState([]);
    const [conversations, setConversations] = useState(mockConversations);
    const [expandedConversation, setExpandedConversation] = useState(null);
    // 孩子的话相关状态
    const [childMessages, setChildMessages] = useState([{
            id: 1,
            content: "妈妈，今天我在学校学会了一首新歌，好想唱给你听！",
            date: getCurrentDate(),
            time: "15:30",
            read: false,
            replied: false,
            emotion: "开心"
        }, {
            id: 2,
            content: "爸爸，我今天在美术课上画了一幅画，老师说画得很棒，我想把它送给你！",
            date: getDateBefore(1),
            time: "16:45",
            read: false,
            replied: false,
            emotion: "自豪"
        }, {
            id: 3,
            content: "妈妈，我想你了，什么时候回家呀？",
            date: getDateBefore(2),
            time: "19:20",
            read: true,
            replied: true,
            emotion: "想念"
        }]);
    const [viewingMessageId, setViewingMessageId] = useState(null);
    const [replyText, setReplyText] = useState('');
    const [activeMessageId, setActiveMessageId] = useState(null);
    // 表单状态
    const [reminderTitle, setReminderTitle] = useState('');
    const [reminderDate, setReminderDate] = useState('');
    const [reminderTime, setReminderTime] = useState('');
    const [reminderContent, setReminderContent] = useState('');
    const [interventionKeyword, setInterventionKeyword] = useState('');
    const [interventionResponse, setInterventionResponse] = useState('');
    // 模拟从API获取数据
    useEffect(() => {
        // 实际项目中，这里会调用API获取数据
        // api.get('/api/parent-voice/records')
        //   .then(response => setConversations(response.data))
        //   .catch(error => console.error('获取对话记录失败:', error));
    }, []);
    // 删除干预设置
    const handleDeleteIntervention = (index) => {
        setSavedInterventions(prev => prev.filter((_, i) => i !== index));
    };
    // 过滤对话记录
    const filteredConversations = conversations.filter(conv => {
        // 日期过滤
        if (dateFilter !== 'all') {
            const today = new Date().toISOString().split('T')[0];
            const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
            const lastWeek = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
            if (dateFilter === 'today' && conv.date !== today)
                return false;
            if (dateFilter === 'yesterday' && conv.date !== yesterday)
                return false;
            if (dateFilter === 'lastWeek' && new Date(conv.date) < new Date(lastWeek))
                return false;
            if (dateFilter === 'custom' && customStartDate && customEndDate) {
                const convDate = new Date(conv.date);
                const startDate = new Date(customStartDate);
                const endDate = new Date(customEndDate);
                if (convDate < startDate || convDate > endDate)
                    return false;
            }
        }
        // 情绪过滤
        if (emotionFilter !== 'all' && conv.emotion !== emotionFilter)
            return false;
        // 搜索过滤
        if (searchQuery) {
            const query = searchQuery.toLowerCase();
            const titleMatch = conv.title.toLowerCase().includes(query);
            const contentMatch = conv.messages.some(msg => msg.content.toLowerCase().includes(query));
            if (!titleMatch && !contentMatch)
                return false;
        }
        return true;
    });
    // 切换展开/折叠对话
    const toggleConversation = (id) => {
        setExpandedConversation(expandedConversation === id ? null : id);
    };
    // 提交提醒表单
    const handleReminderSubmit = (e) => {
        e.preventDefault();
        // 实际项目中，这里会调用API保存提醒
        // api.post('/api/parent-voice/reminder', {
        //   title: reminderTitle,
        //   date: reminderDate,
        //   time: reminderTime,
        //   content: reminderContent
        // })
        //   .then(response => {
        //     alert('提醒设置成功！');
        //     // 重置表单
        //     setReminderTitle('');
        //     setReminderDate('');
        //     setReminderTime('');
        //     setReminderContent('');
        //   })
        //   .catch(error => console.error('设置提醒失败:', error));
        // 模拟成功响应
        const newReminder = {
            id: Date.now(),
            title: reminderTitle,
            date: reminderDate,
            time: reminderTime,
            content: reminderContent
        };
        setSavedReminders(prev => [...prev, newReminder]);
        alert('提醒设置成功！');
        // 重置表单
        setReminderTitle('');
        setReminderDate('');
        setReminderTime('');
        setReminderContent('');
    };
    // 提交干预表单
    const handleInterventionSubmit = (e) => {
        e.preventDefault();
        // 实际项目中，这里会调用API保存干预设置
        // api.post('/api/parent-voice/intervene', {
        //   keyword: interventionKeyword,
        //   response: interventionResponse
        // })
        //   .then(response => {
        //     setSavedInterventions(prev => [...prev, { keyword: interventionKeyword, response: interventionResponse }]);
        //     setInterventionKeyword('');
        //     setInterventionResponse('');
        //   })
        //   .catch(error => console.error('设置干预失败:', error));
        // 模拟成功响应
        setSavedInterventions(prev => [...prev, { keyword: interventionKeyword, response: interventionResponse }]);
        setInterventionKeyword('');
        setInterventionResponse('');
    };
    // 处理回复孩子的消息
    const handleReplyMessage = (messageId) => {
        // 在实际应用中，这里会打开一个回复对话框
        // 简化版本：将消息标记为已读和已回复
        setChildMessages(prev => prev.map(msg => msg.id === messageId ? { ...msg, read: true, replied: true } : msg));
        // 实际项目中这里会调用API发送回复
        // api.post(`/api/child-messages/${messageId}/reply`, { content: replyText })
        //   .then(response => {
        //     // 处理成功回复
        //     alert('回复已发送给孩子');
        //   })
        //   .catch(error => console.error('回复消息失败:', error));
        // 模拟成功响应
        setTimeout(() => {
            alert('回复已成功发送给孩子');
        }, 500);
    };
    return (_jsxs(PageContainer, { children: [_jsx(Title, { children: "\u5BB6\u957F\u4FE1\u7BB1" }), _jsx(Description, { children: "\u67E5\u770B\u5B69\u5B50\u4E0E\u5C0F\u718A\u7684\u5BF9\u8BDD\u8BB0\u5F55\uFF0C\u8BBE\u7F6E\u91CD\u8981\u4E8B\u9879\u63D0\u9192\uFF0C\u63A5\u6536\u5B69\u5B50\u53D1\u6765\u7684\u6D88\u606F\uFF0C\u4E2A\u6027\u5316\u7BA1\u7406AI\u56DE\u590D\u903B\u8F91" }), _jsxs(TabContainer, { children: [_jsx(Tab, { "$isActive": activeTab === 'conversations', onClick: () => setActiveTab('conversations'), children: "\u5BF9\u8BDD\u8BB0\u5F55" }), _jsx(Tab, { "$isActive": activeTab === 'reminders', onClick: () => setActiveTab('reminders'), children: "\u63D0\u9192\u4E0E\u5E72\u9884" }), _jsx(Tab, { "$isActive": activeTab === 'childMessages', onClick: () => setActiveTab('childMessages'), children: "\u5B69\u5B50\u7684\u8BDD" })] }), activeTab === 'conversations' && (_jsxs(_Fragment, { children: [_jsxs(FilterContainer, { children: [_jsxs(FilterGroup, { children: [_jsx(FilterLabel, { children: "\u65E5\u671F\uFF1A" }), _jsxs(Select, { value: dateFilter, onChange: (e) => setDateFilter(e.target.value), children: [_jsx("option", { value: "all", children: "\u5168\u90E8" }), _jsx("option", { value: "today", children: "\u4ECA\u5929" }), _jsx("option", { value: "yesterday", children: "\u6628\u5929" }), _jsx("option", { value: "lastWeek", children: "\u6700\u8FD1\u4E00\u5468" }), _jsx("option", { value: "custom", children: "\u81EA\u5B9A\u4E49\u65E5\u671F\u8303\u56F4" })] }), dateFilter === 'custom' && (_jsxs(FilterGroup, { style: { marginLeft: '1rem' }, children: [_jsx(Input, { type: "date", value: customStartDate, onChange: (e) => setCustomStartDate(e.target.value), style: { width: '140px' } }), _jsx("span", { style: { margin: '0 0.5rem' }, children: "\u81F3" }), _jsx(Input, { type: "date", value: customEndDate, onChange: (e) => setCustomEndDate(e.target.value), style: { width: '140px' } })] })), _jsx(FilterLabel, { children: "\u60C5\u7EEA\uFF1A" }), _jsxs(Select, { value: emotionFilter, onChange: (e) => setEmotionFilter(e.target.value), children: [_jsx("option", { value: "all", children: "\u5168\u90E8" }), _jsx("option", { value: "\u5F00\u5FC3", children: "\u5F00\u5FC3" }), _jsx("option", { value: "\u96BE\u8FC7", children: "\u96BE\u8FC7" }), _jsx("option", { value: "\u751F\u6C14", children: "\u751F\u6C14" }), _jsx("option", { value: "\u7126\u8651", children: "\u7126\u8651" }), _jsx("option", { value: "\u5E73\u9759", children: "\u5E73\u9759" })] })] }), _jsx(SearchInput, { type: "text", placeholder: "\u641C\u7D22\u5173\u952E\u8BCD...", value: searchQuery, onChange: (e) => setSearchQuery(e.target.value) })] }), _jsx(ConversationsContainer, { children: filteredConversations.length > 0 ? (filteredConversations.map(conversation => (_jsxs(ConversationCard, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { duration: 0.3 }, onClick: (e) => {
                                e.stopPropagation();
                                toggleConversation(conversation.id);
                            }, children: [_jsxs(ConversationHeader, { "$emotionColor": conversation.emotionColor, children: [_jsxs("div", { children: [_jsx(ConversationDate, { children: conversation.date }), _jsx(ConversationTitle, { children: conversation.title })] }), _jsx(EmotionTag, { children: conversation.emotion })] }), expandedConversation === conversation.id && (_jsxs(ConversationContent, { children: [_jsx(MessageList, { children: conversation.messages.map(message => (_jsxs(Message, { "$isChild": message.sender === 'child', children: [_jsx(Avatar, { "$isChild": message.sender === 'child', children: message.sender === 'child' ? '孩' : '熊' }), _jsxs("div", { children: [_jsx(MessageBubble, { "$isChild": message.sender === 'child', children: message.content }), _jsx(MessageTime, { children: message.time })] })] }, message.id))) }), _jsxs(ActionButtons, { children: [_jsxs(SecondaryButton, { children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M8.684 13.342C8.886 13.524 9 13.775 9 14.044V20h6V14.044c0-.269.114-.52.316-.702l6.232-6.231a1 1 0 0 0 0-1.415l-3.298-3.297a1 1 0 0 0-1.414 0l-6.232 6.231c-.202.182-.453.296-.722.296H4v6h3.955c.269 0 .52.114.702.316l.027.027z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }), "\u5BFC\u51FA\u5BF9\u8BDD"] }), _jsxs(PrimaryButton, { children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M12 5v14m-7-7h14", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }), "\u6DFB\u52A0\u5E72\u9884"] })] })] }))] }, conversation.id)))) : (_jsx("p", { style: { textAlign: 'center', color: '#666' }, children: "\u6CA1\u6709\u627E\u5230\u7B26\u5408\u6761\u4EF6\u7684\u5BF9\u8BDD\u8BB0\u5F55" })) })] })), activeTab === 'childMessages' && (_jsxs("div", { children: [_jsx(SectionTitle, { children: "\u5B69\u5B50\u7684\u8BDD" }), _jsx("div", { style: { marginBottom: '1rem', color: '#666' }, children: "\u8FD9\u91CC\u663E\u793A\u5B69\u5B50\u901A\u8FC7AI\u73A9\u5076\u5411\u60A8\u53D1\u9001\u7684\u6D88\u606F\uFF0C\u8BA9\u60A8\u968F\u65F6\u4E86\u89E3\u5B69\u5B50\u7684\u60F3\u6CD5\u548C\u9700\u6C42\u3002" }), viewingMessageId !== null && (_jsx(MessageDetailModal, { onClick: () => {
                            // 关闭详情模态框时，将消息标记为已读
                            setChildMessages(prev => prev.map(msg => msg.id === viewingMessageId ? { ...msg, read: true } : msg));
                            setViewingMessageId(null);
                        }, children: _jsxs(MessageDetailContent, { onClick: (e) => e.stopPropagation(), children: [_jsxs(MessageDetailHeader, { children: [_jsx("h2", { style: { margin: 0, fontSize: '1.5rem', color: 'var(--primary-color)' }, children: "\u6D88\u606F\u8BE6\u60C5" }), _jsx(CloseButton, { onClick: () => {
                                                // 关闭详情模态框时，将消息标记为已读
                                                setChildMessages(prev => prev.map(msg => msg.id === viewingMessageId ? { ...msg, read: true } : msg));
                                                setViewingMessageId(null);
                                            }, children: "\u00D7" })] }), childMessages.find(msg => msg.id === viewingMessageId) && (_jsxs("div", { children: [_jsxs("div", { style: {
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                marginBottom: '1rem',
                                                alignItems: 'center'
                                            }, children: [_jsx("div", { children: _jsxs("div", { style: { fontWeight: '500', fontSize: '1.1rem' }, children: [childMessages.find(msg => msg.id === viewingMessageId)?.date, childMessages.find(msg => msg.id === viewingMessageId)?.time] }) }), _jsx("span", { style: {
                                                        padding: '0.25rem 0.75rem',
                                                        backgroundColor: childMessages.find(msg => msg.id === viewingMessageId)?.emotion === '开心' ? '#E0F7FA' :
                                                            childMessages.find(msg => msg.id === viewingMessageId)?.emotion === '自豪' ? '#E8F5E9' :
                                                                childMessages.find(msg => msg.id === viewingMessageId)?.emotion === '想念' ? '#FFF3E0' : '#F3E5F5',
                                                        borderRadius: '12px',
                                                        fontSize: '0.9rem',
                                                        color: childMessages.find(msg => msg.id === viewingMessageId)?.emotion === '开心' ? '#00ACC1' :
                                                            childMessages.find(msg => msg.id === viewingMessageId)?.emotion === '自豪' ? '#43A047' :
                                                                childMessages.find(msg => msg.id === viewingMessageId)?.emotion === '想念' ? '#FF9800' : '#9C27B0'
                                                    }, children: childMessages.find(msg => msg.id === viewingMessageId)?.emotion })] }), _jsx("div", { style: {
                                                fontSize: '1.2rem',
                                                lineHeight: '1.8',
                                                padding: '1.5rem',
                                                backgroundColor: '#f8f9fa',
                                                borderRadius: '12px',
                                                marginBottom: '1.5rem'
                                            }, children: childMessages.find(msg => msg.id === viewingMessageId)?.content }), _jsx("div", { style: { display: 'flex', justifyContent: 'flex-end', gap: '1rem' }, children: _jsxs(PrimaryButton, { onClick: () => {
                                                    const message = childMessages.find(msg => msg.id === viewingMessageId);
                                                    if (message) {
                                                        setActiveMessageId(message.id);
                                                        setReplyText('');
                                                        setViewingMessageId(null);
                                                    }
                                                }, children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M3 10h10a8 8 0 0 1 8 8v2M3 10l6 6m-6-6l6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }), "\u56DE\u590D\u6D88\u606F"] }) })] }))] }) })), childMessages.length > 0 ? (_jsx(ChildMessagesContainer, { children: _jsx(MessagesList, { children: childMessages.map(message => (_jsxs(MessageCard, { onClick: () => {
                                    setViewingMessageId(message.id);
                                }, children: [_jsxs(MessageHeader, { children: [_jsxs("div", { children: [_jsxs("span", { style: { fontWeight: '500', fontSize: '1.1rem' }, children: [message.date, " ", message.time] }), !message.read && _jsx(UnreadBadge, { style: { marginLeft: '1rem' }, children: "\u672A\u8BFB" })] }), _jsx("span", { style: {
                                                    padding: '0.25rem 0.75rem',
                                                    backgroundColor: message.emotion === '开心' ? '#E0F7FA' :
                                                        message.emotion === '自豪' ? '#E8F5E9' :
                                                            message.emotion === '想念' ? '#FFF3E0' : '#F3E5F5',
                                                    borderRadius: '12px',
                                                    fontSize: '0.9rem',
                                                    color: message.emotion === '开心' ? '#00ACC1' :
                                                        message.emotion === '自豪' ? '#43A047' :
                                                            message.emotion === '想念' ? '#FF9800' : '#9C27B0'
                                                }, children: message.emotion })] }), _jsx(MessageContent, { children: message.content }), _jsxs(MessageFooter, { children: [_jsxs(ReplyButton, { onClick: (e) => {
                                                    e.stopPropagation(); // 阻止事件冒泡，避免触发卡片点击事件
                                                    setActiveMessageId(message.id);
                                                    setReplyText('');
                                                }, children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M3 10h10a8 8 0 0 1 8 8v2M3 10l6 6m-6-6l6-6", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }), "\u56DE\u590D\u6D88\u606F"] }), _jsx(MessageStatus, { children: message.replied ? '已回复' : '未回复' })] }), activeMessageId === message.id && (_jsxs("div", { style: { marginTop: '1rem', padding: '1rem', backgroundColor: '#f8f9fa', borderRadius: '8px' }, onClick: (e) => e.stopPropagation(), children: [_jsx("div", { style: { marginBottom: '0.5rem', fontWeight: '500' }, children: "\u56DE\u590D\u6D88\u606F" }), _jsx(Textarea, { value: replyText, onChange: (e) => setReplyText(e.target.value), placeholder: "\u8F93\u5165\u56DE\u590D\u5185\u5BB9...", style: { marginBottom: '1rem' } }), _jsxs("div", { style: { display: 'flex', justifyContent: 'flex-end', gap: '1rem' }, children: [_jsx(SecondaryButton, { onClick: (e) => {
                                                            e.stopPropagation(); // 阻止事件冒泡
                                                            setActiveMessageId(null);
                                                        }, children: "\u53D6\u6D88" }), _jsx(PrimaryButton, { onClick: (e) => {
                                                            e.stopPropagation(); // 阻止事件冒泡
                                                            if (replyText.trim()) {
                                                                handleReplyMessage(message.id);
                                                                setChildMessages(prev => prev.map(msg => msg.id === message.id ? { ...msg, read: true, replied: true } : msg));
                                                                setActiveMessageId(null);
                                                                setReplyText('');
                                                            }
                                                        }, children: "\u53D1\u9001\u56DE\u590D" })] })] }))] }, message.id))) }) })) : (_jsxs("div", { style: { textAlign: 'center', padding: '3rem 1rem', color: '#999', backgroundColor: '#f8f9fa', borderRadius: '12px' }, children: [_jsx("div", { style: { marginBottom: '1rem' }, children: _jsx("svg", { width: "64", height: "64", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v10z", stroke: "#ccc", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }) }), _jsx("h3", { style: { fontWeight: '500', marginBottom: '0.5rem' }, children: "\u6682\u65E0\u6D88\u606F" }), _jsx("p", { children: "\u5F53\u5B69\u5B50\u60F3\u5FF5\u60A8\u65F6\uFF0C\u4F1A\u901A\u8FC7AI\u73A9\u5076\u5411\u60A8\u53D1\u9001\u6D88\u606F" })] }))] })), activeTab === 'reminders' && (_jsxs(_Fragment, { children: [_jsxs(ReminderSection, { children: [_jsx(SectionTitle, { children: "\u91CD\u8981\u4E8B\u9879\u63D0\u9192" }), _jsxs(ReminderForm, { onSubmit: handleReminderSubmit, children: [_jsxs(FormGroup, { children: [_jsx(Label, { htmlFor: "reminderTitle", children: "\u63D0\u9192\u6807\u9898" }), _jsx(Input, { id: "reminderTitle", type: "text", placeholder: "\u4F8B\u5982\uFF1A\u5B8C\u6210\u4F5C\u4E1A\u63D0\u9192", value: reminderTitle, onChange: (e) => setReminderTitle(e.target.value), required: true })] }), _jsxs(FormGroup, { children: [_jsx(Label, { htmlFor: "reminderDate", children: "\u63D0\u9192\u65E5\u671F" }), _jsx(Input, { id: "reminderDate", type: "date", value: reminderDate, onChange: (e) => setReminderDate(e.target.value), required: true })] }), _jsxs(FormGroup, { children: [_jsx(Label, { htmlFor: "reminderTime", children: "\u63D0\u9192\u65F6\u95F4" }), _jsx(Input, { id: "reminderTime", type: "time", value: reminderTime, onChange: (e) => setReminderTime(e.target.value), required: true })] }), _jsxs(FormGroup, { children: [_jsx(Label, { htmlFor: "reminderContent", children: "\u63D0\u9192\u5185\u5BB9" }), _jsx(Textarea, { id: "reminderContent", placeholder: "\u5C0F\u718A\u4F1A\u5728\u8BBE\u5B9A\u7684\u65F6\u95F4\u5411\u5B69\u5B50\u4F20\u8FBE\u8FD9\u6BB5\u5185\u5BB9...", value: reminderContent, onChange: (e) => setReminderContent(e.target.value), required: true })] }), _jsx(FormActions, { children: _jsxs(PrimaryButton, { type: "submit", children: [_jsxs("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("path", { d: "M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }), _jsx("path", { d: "M12 6v6l4 2", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" })] }), "\u8BBE\u7F6E\u63D0\u9192"] }) })] }), _jsxs(ReminderHistorySection, { children: [_jsx(SectionTitle, { children: "\u63D0\u9192\u5386\u53F2" }), _jsx(ReminderList, { children: savedReminders.map(reminder => (_jsxs(ReminderCard, { children: [_jsxs(ReminderInfo, { children: [_jsx(ReminderCardTitle, { children: reminder.title }), _jsxs(ReminderCardMeta, { children: [_jsxs("span", { children: ["\u65E5\u671F\uFF1A", reminder.date] }), _jsxs("span", { children: ["\u65F6\u95F4\uFF1A", reminder.time] })] }), _jsx("div", { style: { marginTop: '0.5rem', color: '#666', fontSize: '0.9rem' }, children: _jsxs("span", { children: ["\u63D0\u9192\u5185\u5BB9\uFF1A", reminder.content] }) })] }), _jsx(ReminderCardActions, { children: _jsx(SecondaryButton, { onClick: () => {
                                                            setSavedReminders(prev => prev.filter(item => item.id !== reminder.id));
                                                        }, children: "\u5220\u9664" }) })] }, reminder.id))) })] })] }), _jsxs(InterventionSection, { children: [_jsx(SectionTitle, { children: "\u5BF9\u8BDD\u5E72\u9884\u8BBE\u7F6E" }), _jsxs(InterventionForm, { onSubmit: handleInterventionSubmit, children: [_jsxs(FormGroup, { children: [_jsx(Label, { htmlFor: "interventionKeyword", children: "\u89E6\u53D1\u5173\u952E\u8BCD" }), _jsx(Input, { id: "interventionKeyword", type: "text", placeholder: "\u4F8B\u5982\uFF1A\u6E38\u620F\u3001\u96F6\u98DF\u3001\u4F5C\u4E1A", value: interventionKeyword, onChange: (e) => setInterventionKeyword(e.target.value), required: true })] }), _jsxs(FormGroup, { children: [_jsx(Label, { htmlFor: "interventionResponse", children: "\u81EA\u5B9A\u4E49\u56DE\u590D" }), _jsx(Textarea, { id: "interventionResponse", placeholder: "\u5F53\u5B69\u5B50\u63D0\u5230\u5173\u952E\u8BCD\u65F6\uFF0C\u5C0F\u718A\u4F1A\u6309\u7167\u8FD9\u91CC\u8BBE\u5B9A\u7684\u5185\u5BB9\u56DE\u590D...", value: interventionResponse, onChange: (e) => setInterventionResponse(e.target.value), required: true })] }), _jsx(FormActions, { children: _jsxs(PrimaryButton, { type: "submit", children: [_jsx("svg", { width: "16", height: "16", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z", stroke: "currentColor", strokeWidth: "2", strokeLinecap: "round", strokeLinejoin: "round" }) }), "\u4FDD\u5B58\u8BBE\u7F6E"] }) })] }), _jsxs("div", { style: { marginTop: '2rem' }, children: [_jsx(SectionTitle, { style: { fontSize: '1.2rem' }, children: "\u5DF2\u4FDD\u5B58\u7684\u5E72\u9884\u8BBE\u7F6E" }), savedInterventions.length > 0 ? (_jsx("div", { style: { display: 'flex', flexDirection: 'column', gap: '1rem' }, children: savedInterventions.map((intervention, index) => (_jsxs("div", { style: {
                                                padding: '1rem',
                                                backgroundColor: '#f8f9fa',
                                                borderRadius: '8px',
                                                display: 'flex',
                                                justifyContent: 'space-between',
                                                alignItems: 'center'
                                            }, children: [_jsxs("div", { children: [_jsxs("div", { style: { fontWeight: 500, marginBottom: '0.5rem' }, children: ["\u89E6\u53D1\u5173\u952E\u8BCD\uFF1A", intervention.keyword] }), _jsxs("div", { style: { color: '#666' }, children: ["\u81EA\u5B9A\u4E49\u56DE\u590D\uFF1A", intervention.response] })] }), _jsx(SecondaryButton, { onClick: () => handleDeleteIntervention(index), style: { padding: '0.25rem 0.75rem' }, children: "\u5220\u9664" })] }, index))) })) : (_jsx("div", { style: { color: '#666', textAlign: 'center', padding: '2rem' }, children: "\u6682\u65E0\u4FDD\u5B58\u7684\u5E72\u9884\u8BBE\u7F6E" }))] })] })] }))] }));
};
export default ParentVoicePage;
