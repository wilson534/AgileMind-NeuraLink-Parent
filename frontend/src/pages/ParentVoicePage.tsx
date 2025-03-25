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

const ConversationsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const ConversationCard = styled(motion.div)`
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

const ConversationHeader = styled.div<{ $emotionColor: string }>`
  background: ${props => props.$emotionColor};
  padding: 1.5rem;
  color: white;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ConversationDate = styled.div`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  opacity: 0.9;
`;

const ConversationTitle = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const EmotionTag = styled.span`
  background: rgba(255, 255, 255, 0.2);
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 500;
`;

const ConversationContent = styled.div`
  padding: 1.5rem;
`;

const MessageList = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 1.5rem;
`;

const Message = styled.div<{ $isChild: boolean }>`
  display: flex;
  flex-direction: ${props => props.$isChild ? 'row' : 'row-reverse'};
  gap: 1rem;
  max-width: 80%;
  align-self: ${props => props.$isChild ? 'flex-start' : 'flex-end'};
`;

const Avatar = styled.div<{ $isChild: boolean }>`
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

const MessageBubble = styled.div<{ $isChild: boolean }>`
  background-color: ${props => props.$isChild ? '#F8F9FA' : '#EFF6FF'};
  padding: 0.75rem 1rem;
  border-radius: 12px;
  border-top-left-radius: ${props => props.$isChild ? '0' : '12px'};
  border-top-right-radius: ${props => props.$isChild ? '12px' : '0'};
  font-size: 0.95rem;
  color: var(--text-color);
  box-shadow: 0 1px 2px rgba(0, 0, 0, 0.05);
`;

const MessageTime = styled.div`
  font-size: 0.75rem;
  color: #999;
  margin-top: 0.25rem;
`;

const ActionButtons = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const Button = styled.button`
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

const PrimaryButton = styled(Button)`
  background-color: var(--primary-color);
  color: white;
  
  &:hover {
    box-shadow: 0 4px 8px rgba(106, 90, 205, 0.3);
  }
`;

const SecondaryButton = styled(Button)`
  background-color: white;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  
  &:hover {
    background-color: #f8f5ff;
  }
`;

const ReminderSection = styled.div`
  margin-top: 3rem;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
`;

const SectionTitle = styled.h2`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  font-weight: 600;
`;

const ReminderForm = styled.form`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;

const FormActions = styled.div`
  grid-column: 1 / -1;
  display: flex;
  justify-content: flex-end;
  gap: 1rem;
  margin-top: 1rem;
`;

const InterventionSection = styled.div`
  margin-top: 3rem;
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
`;

const InterventionForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

// 模拟数据
const mockConversations = [
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

const ParentVoicePage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'conversations' | 'reminders'>('conversations');
  const [dateFilter, setDateFilter] = useState('all');
  const [emotionFilter, setEmotionFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState(mockConversations);
  const [expandedConversation, setExpandedConversation] = useState<number | null>(null);
  
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
  
  // 过滤对话记录
  const filteredConversations = conversations.filter(conv => {
    // 日期过滤
    if (dateFilter !== 'all') {
      const today = new Date().toISOString().split('T')[0];
      const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
      const lastWeek = new Date(Date.now() - 7 * 86400000).toISOString().split('T')[0];
      
      if (dateFilter === 'today' && conv.date !== today) return false;
      if (dateFilter === 'yesterday' && conv.date !== yesterday) return false;
      if (dateFilter === 'lastWeek' && new Date(conv.date) < new Date(lastWeek)) return false;
    }
    
    // 情绪过滤
    if (emotionFilter !== 'all' && conv.emotion !== emotionFilter) return false;
    
    // 搜索过滤
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const titleMatch = conv.title.toLowerCase().includes(query);
      const contentMatch = conv.messages.some(msg => 
        msg.content.toLowerCase().includes(query)
      );
      if (!titleMatch && !contentMatch) return false;
    }
    
    return true;
  });
  
  // 切换展开/折叠对话
  const toggleConversation = (id: number) => {
    setExpandedConversation(expandedConversation === id ? null : id);
  };
  
  // 提交提醒表单
  const handleReminderSubmit = (e: React.FormEvent) => {
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
    alert('提醒设置成功！');
    // 重置表单
    setReminderTitle('');
    setReminderDate('');
    setReminderTime('');
    setReminderContent('');
  };
  
  // 提交干预表单
  const handleInterventionSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // 实际项目中，这里会调用API保存干预设置
    // api.post('/api/parent-voice/intervene', {
    //   keyword: interventionKeyword,
    //   response: interventionResponse
    // })
    //   .then(response => {
    //     alert('干预设置成功！');
    //     // 重置表单
    //     setInterventionKeyword('');
    //     setInterventionResponse('');
    //   })
    //   .catch(error => console.error('设置干预失败:', error));
    
    // 模拟成功响应
    alert('干预设置成功！');
    // 重置表单
    setInterventionKeyword('');
    setInterventionResponse('');
  };
  
  return (
    <PageContainer>
      <Title>家长之声</Title>
      <Description>
        查看孩子与小熊的对话记录，设置重要事项提醒，个性化管理AI回复逻辑
      </Description>
      
      <TabContainer>
        <Tab 
          $isActive={activeTab === 'conversations'}
          onClick={() => setActiveTab('conversations')}
        >
          对话记录
        </Tab>
        <Tab 
          $isActive={activeTab === 'reminders'}
          onClick={() => setActiveTab('reminders')}
        >
          提醒与干预
        </Tab>
      </TabContainer>
      
      {activeTab === 'conversations' && (
        <>
          <FilterContainer>
            <FilterGroup>
              <FilterLabel>日期：</FilterLabel>
              <Select 
                value={dateFilter}
                onChange={(e) => setDateFilter(e.target.value)}
              >
                <option value="all">全部</option>
                <option value="today">今天</option>
                <option value="yesterday">昨天</option>
                <option value="lastWeek">最近一周</option>
              </Select>
              
              <FilterLabel>情绪：</FilterLabel>
              <Select 
                value={emotionFilter}
                onChange={(e) => setEmotionFilter(e.target.value)}
              >
                <option value="all">全部</option>
                <option value="开心">开心</option>
                <option value="难过">难过</option>
                <option value="生气">生气</option>
                <option value="焦虑">焦虑</option>
                <option value="平静">平静</option>
              </Select>
            </FilterGroup>
            
            <SearchInput 
              type="text"
              placeholder="搜索关键词..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </FilterContainer>
          
          <ConversationsContainer>
            {filteredConversations.length > 0 ? (
              filteredConversations.map(conversation => (
                <ConversationCard 
                  key={conversation.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => toggleConversation(conversation.id)}
                >
                  <ConversationHeader $emotionColor={conversation.emotionColor}>
                    <div>
                      <ConversationDate>{conversation.date}</ConversationDate>
                      <ConversationTitle>{conversation.title}</ConversationTitle>
                    </div>
                    <EmotionTag>{conversation.emotion}</EmotionTag>
                  </ConversationHeader>
                  
                  {expandedConversation === conversation.id && (
                    <ConversationContent>
                      <MessageList>
                        {conversation.messages.map(message => (
                          <Message key={message.id} $isChild={message.sender === 'child'}>
                            <Avatar $isChild={message.sender === 'child'}>
                              {message.sender === 'child' ? '孩' : '熊'}
                            </Avatar>
                            <div>
                              <MessageBubble $isChild={message.sender === 'child'}>
                                {message.content}
                              </MessageBubble>
                              <MessageTime>{message.time}</MessageTime>
                            </div>
                          </Message>
                        ))}
                      </MessageList>
                      
                      <ActionButtons>
                        <SecondaryButton>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.684 13.342C8.886 13.524 9 13.775 9 14.044V20h6V14.044c0-.269.114-.52.316-.702l6.232-6.231a1 1 0 0 0 0-1.415l-3.298-3.297a1 1 0 0 0-1.414 0l-6.232 6.231c-.202.182-.453.296-.722.296H4v6h3.955c.269 0 .52.114.702.316l.027.027z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          导出对话
                        </SecondaryButton>
                        <PrimaryButton>
                          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 5v14m-7-7h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                          </svg>
                          添加干预
                        </PrimaryButton>
                      </ActionButtons>
                    </ConversationContent>
                  )}
                </ConversationCard>
              ))
            ) : (
              <p style={{ textAlign: 'center', color: '#666' }}>没有找到符合条件的对话记录</p>
            )}
          </ConversationsContainer>
        </>
      )}
      
      {activeTab === 'reminders' && (
        <>
          <ReminderSection>
            <SectionTitle>重要事项提醒</SectionTitle>
            <ReminderForm onSubmit={handleReminderSubmit}>
              <FormGroup>
                <Label htmlFor="reminderTitle">提醒标题</Label>
                <Input 
                  id="reminderTitle"
                  type="text" 
                  placeholder="例如：完成作业提醒"
                  value={reminderTitle}
                  onChange={(e) => setReminderTitle(e.target.value)}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="reminderDate">提醒日期</Label>
                <Input 
                  id="reminderDate"
                  type="date" 
                  value={reminderDate}
                  onChange={(e) => setReminderDate(e.target.value)}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="reminderTime">提醒时间</Label>
                <Input 
                  id="reminderTime"
                  type="time" 
                  value={reminderTime}
                  onChange={(e) => setReminderTime(e.target.value)}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="reminderContent">提醒内容</Label>
                <Textarea 
                  id="reminderContent"
                  placeholder="小熊会在设定的时间向孩子传达这段内容..."
                  value={reminderContent}
                  onChange={(e) => setReminderContent(e.target.value)}
                  required
                />
              </FormGroup>
              
              <FormActions>
                <PrimaryButton type="submit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    <path d="M12 6v6l4 2" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  设置提醒
                </PrimaryButton>
              </FormActions>
            </ReminderForm>
          </ReminderSection>
          
          <InterventionSection>
            <SectionTitle>对话干预设置</SectionTitle>
            <InterventionForm onSubmit={handleInterventionSubmit}>
              <FormGroup>
                <Label htmlFor="interventionKeyword">触发关键词</Label>
                <Input 
                  id="interventionKeyword"
                  type="text" 
                  placeholder="例如：游戏、零食、作业"
                  value={interventionKeyword}
                  onChange={(e) => setInterventionKeyword(e.target.value)}
                  required
                />
              </FormGroup>
              
              <FormGroup>
                <Label htmlFor="interventionResponse">自定义回复</Label>
                <Textarea 
                  id="interventionResponse"
                  placeholder="当孩子提到关键词时，小熊会按照这里设定的内容回复..."
                  value={interventionResponse}
                  onChange={(e) => setInterventionResponse(e.target.value)}
                  required
                />
              </FormGroup>
              
              <FormActions>
                <PrimaryButton type="submit">
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                  保存设置
                </PrimaryButton>
              </FormActions>
            </InterventionForm>
          </InterventionSection>
        </>
      )}
    </PageContainer>
  );
};

export default ParentVoicePage;