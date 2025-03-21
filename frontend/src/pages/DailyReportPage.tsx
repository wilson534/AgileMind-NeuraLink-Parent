import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import EmotionFace from '../components/EmotionFace';
import EmotionDistribution from '../components/EmotionDistribution';

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

const FilterContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const FilterButton = styled.button<{ $isActive: boolean }>`
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  border: none;
  background-color: ${props => props.$isActive ? 'var(--primary-color)' : 'white'};
  color: ${props => props.$isActive ? 'white' : 'var(--text-color)'};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  box-shadow: ${props => props.$isActive ? 'none' : 'var(--card-shadow)'};
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

const ReportsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
`;

const ReportCard = styled(motion.div)`
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

const ReportHeader = styled.div<{ $emotionColor: string }>`
  background: ${props => props.$emotionColor};
  padding: 1.5rem;
  color: white;
`;

const ReportDate = styled.div`
  font-size: 0.875rem;
  margin-bottom: 0.5rem;
  opacity: 0.9;
`;

const ReportSummary = styled.h3`
  margin: 0;
  font-size: 1.2rem;
  font-weight: 600;
`;

const ReportContent = styled.div`
  padding: 1.5rem;
`;

const EmotionScore = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ScoreLabel = styled.span`
  font-weight: 500;
  color: #555;
`;

const ScoreValue = styled.span`
  font-weight: 700;
  color: var(--primary-color);
  font-size: 1.2rem;
`;

const EmotionTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;

const EmotionTag = styled.span<{ $color: string }>`
  background-color: ${props => props.$color};
  color: white;
  padding: 0.25rem 0.75rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 500;
`;

const ExpandedCard = styled(motion.div)`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
  padding: 2rem;
`;

const ExpandedCardContent = styled(motion.div)`
  background: white;
  border-radius: 16px;
  width: 100%;
  max-width: 600px;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
`;

const ExpandedHeader = styled.div<{ $emotionColor: string }>`
  background: ${props => props.$emotionColor};
  padding: 1.5rem;
  color: white;
  position: sticky;
  top: 0;
  z-index: 1;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: rgba(255, 255, 255, 0.3);
  border: none;
  width: 30px;
  height: 30px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: white;
  font-size: 1.2rem;
  
  &:hover {
    background: rgba(255, 255, 255, 0.5);
  }
`;

const ExpandedContent = styled.div`
  padding: 2rem;
`;

const AnalysisSection = styled.div`
  margin-bottom: 2rem;
`;

const SectionTitle = styled.h4`
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 600;
`;

const AnalysisText = styled.p`
  color: #555;
  line-height: 1.6;
  margin-bottom: 1rem;
`;

const SuggestionList = styled.ul`
  padding-left: 1.5rem;
  margin-top: 1rem;
`;

const SuggestionItem = styled.li`
  color: #555;
  margin-bottom: 0.75rem;
  line-height: 1.5;
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 1rem;
  margin-top: 2rem;
  justify-content: flex-end;
`;

const ActionButton = styled.button`
  background: none;
  border: none;
  color: var(--primary-color);
  font-size: 1.2rem;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 0.5rem;
  padding: 0.5rem;
  border-radius: 8px;
  transition: background-color 0.3s;
  
  &:hover {
    background-color: rgba(106, 90, 205, 0.1);
  }
`;

const TimeRangeContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 1.5rem;
  justify-content: center;
`;

const TimeRangeButton = styled(FilterButton)`
  border-radius: 30px;
  background-color: ${props => props.$isActive ? 'var(--primary-color)' : '#f0f0f0'};
  color: ${props => props.$isActive ? 'white' : '#666'};
`;

const DateInputContainer = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
  margin-top: 1rem;
  justify-content: center;
  flex-wrap: wrap;
`;

const DateInput = styled.input`
  padding: 0.5rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 0.9rem;
`;

const ApplyButton = styled.button`
  padding: 0.5rem 1.5rem;
  border-radius: 8px;
  border: none;
  background-color: var(--primary-color);
  color: white;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;

interface Report {
  id: string;
  date: string;
  summary: string;
  emotionScore: number;
  emotionTags: Array<{ name: string; color: string }>;
  analysis: string;
  suggestions: string[];
  isPositive: boolean;
  needsAttention: boolean;
  emotionDistribution?: Array<{ name: string; value: number; color: string }>;
}

const DailyReportPage: React.FC = () => {
  const [filter, setFilter] = useState<'latest' | 'positive' | 'attention'>('latest');
  const [expandedReport, setExpandedReport] = useState<Report | null>(null);
  const [timeRange, setTimeRange] = useState<'3days' | '7days' | '30days' | 'custom'>('7days');
  const [startDate, setStartDate] = useState<string>('');
  const [endDate, setEndDate] = useState<string>('');
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  
  // 设置默认的开始日期和结束日期
  useEffect(() => {
    const today = new Date();
    const lastWeek = new Date(today);
    lastWeek.setDate(today.getDate() - 7);
    
    setEndDate(today.toISOString().split('T')[0]);
    setStartDate(lastWeek.toISOString().split('T')[0]);
  }, []);
  
  // 根据时间范围生成报告数据
  useEffect(() => {
    const generateReports = async () => {
      setIsLoading(true);
      
      try {
        // 实际项目中，这里应该调用后端API
        // const response = await axios.get(`/api/reports?timeRange=${timeRange}`);
        // const data = response.data;
        
        // 模拟API调用延迟
        await new Promise(resolve => setTimeout(resolve, 500));
        
        // 计算日期范围
        let days = timeRange === '3days' ? 3 : timeRange === '7days' ? 7 : 30;
        let endDateTime = new Date();
        
        // 处理自定义时间范围
        if (timeRange === 'custom' && startDate && endDate) {
          const start = new Date(startDate);
          const end = new Date(endDate);
          days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
          endDateTime = end;
        }
        
        // 生成模拟报告数据
        const generatedReports: Report[] = [];
        
        // 情绪类型和颜色映射
        const emotionTypes = {
          happy: { name: '快乐', color: '#4CAF50' },
          neutral: { name: '平静', color: '#2196F3' },
          sad: { name: '伤感', color: '#9C27B0' },
          angry: { name: '生气', color: '#F44336' },
          worried: { name: '焦虑', color: '#FFC107' }
        };
        
        for (let i = days - 1; i >= 0; i--) {
          const date = new Date(endDateTime);
          date.setDate(date.getDate() - i);
          const dateStr = date.toISOString().split('T')[0];
          
          // 根据日期生成随机情绪数据
          const emotionScore = Math.floor(Math.random() * 80) + 20; // 20-100
          const isPositive = emotionScore >= 70;
          const needsAttention = emotionScore < 50;
          
          // 根据情绪分数选择情绪标签
          let emotionTags = [];
          if (emotionScore >= 80) {
            emotionTags = [
               { name: '快乐', color: '#4CAF50' },
              { name: '兴奋', color: '#8BC34A' },
            ];
          } else if (emotionScore >= 70) {
            emotionTags = [
              { name: '平静', color: '#2196F3' },
              { name: '满足', color: '#03A9F4' },
            ];
          } else if (emotionScore >= 60) {
            emotionTags = [
              { name: '平静', color: '#2196F3' },
              { name: '专注', color: '#00BCD4' },
            ];
          } else if (emotionScore >= 50) {
            emotionTags = [
              { name: '焦虑', color: '#FFC107' },
              { name: '担忧', color: '#FFB300' },
            ];
          } else if (emotionScore >= 40) {
            emotionTags = [
              { name: '生气', color: '#F44336' },
              { name: '烦躁', color: '#FF5722' },
            ];
          } else {
            emotionTags = [
              { name: '伤感', color: '#9C27B0' },
              { name: '失落', color: '#7B1FA2' },
            ];
          }
          
          // 生成报告摘要
          let summary = '';
          if (emotionScore >= 80) {
            const summaries = [
              `小熊今天非常开心，玩得很尽兴`,
              `小熊今天心情愉快，笑容满面`,
              `小熊今天兴致勃勃，精力充沛`,
              `小熊今天活力四射，充满热情`,
              `小熊今天喜笑颜开，乐在其中`,
              `小熊今天欢欣鼓舞，积极向上`
            ];
            summary = summaries[Math.floor(Math.random() * summaries.length)];
          } else if (emotionScore >= 70) {
            const summaries = [
              `小熊今天情绪平稳，专注力很好`,
              `小熊今天心态平和，做事专心`,
              `小熊今天表现稳定，注意力集中`,
              `小熊今天沉着冷静，思维清晰`,
              `小熊今天安静自若，做事有条理`,
              `小熊今天从容不迫，学习效率高`
            ];
            summary = summaries[Math.floor(Math.random() * summaries.length)];
          } else if (emotionScore >= 50) {
            const summaries = [
              `小熊今天情绪一般，有些波动`,
              `小熊今天心情平平，略有起伏`,
              `小熊今天状态中等，时好时坏`,
              `小熊今天表现普通，情绪不稳定`,
              `小熊今天心绪不定，需要关注`,
              `小熊今天情感多变，有喜有忧`
            ];
            summary = summaries[Math.floor(Math.random() * summaries.length)];
          } else if (emotionScore >= 40) {
            const summaries = [
              `小熊今天有些焦虑，需要更多关注`,
              `小熊今天略显不安，需要安抚`,
              `小熊今天有点紧张，需要陪伴`,
              `小熊今天情绪低迷，需要鼓励`,
              `小熊今天有些担忧，需要疏导`,
              `小熊今天显得忧虑，需要开导`
            ];
            summary = summaries[Math.floor(Math.random() * summaries.length)];
          } else {
            const summaries = [
              `小熊今天情绪低落，需要鼓励`,
              `小熊今天心情沮丧，需要安慰`,
              `小熊今天精神不振，需要关怀`,
              `小熊今天闷闷不乐，需要开导`,
              `小熊今天情绪消沉，需要陪伴`,
              `小熊今天意志消沉，需要支持`
            ];
            summary = summaries[Math.floor(Math.random() * summaries.length)];
          }
          
          // 生成分析和建议 - 使用多样化的模板
          let analysis = '';
          let suggestions = [];
          
          // 为不同情绪分数范围定义多个分析模板
          if (emotionScore >= 80) {
            const analysisTemplates = [
              '小熊今天情绪非常积极，在户外活动中表现出极大的热情和兴趣。与同伴互动良好，能够主动分享玩具和想法。在面对小挫折时，能够迅速调整情绪，继续参与活动。这表明小熊的情绪调节能力正在稳步提升。',
              '今天小熊表现出色，情绪高涨且稳定。在集体游戏中主动参与并展现领导能力，能够协调小伙伴们一起完成任务。特别是在创意活动中，想象力丰富，表达流畅，显示出良好的情绪状态和社交能力。',
              '小熊今天心情愉悦，笑容满面。在自由活动时间里，能够独立选择自己喜欢的游戏并专注投入。与其他小朋友互动时表现得开朗大方，乐于分享。这种积极情绪有助于促进小熊的全面发展。',
              '观察到小熊今天情绪饱满，精力充沛。在户外运动中表现活跃，勇于尝试新的挑战项目。在团队合作中能够积极配合，并在遇到困难时保持乐观态度。这反映出小熊良好的心理韧性正在形成。',
              '小熊今天的情绪状态非常理想，全天保持愉快的心情。在学习新知识时表现出浓厚的兴趣和求知欲，能够专注倾听并积极提问。与小伙伴的互动中展现出良好的沟通能力和情绪表达能力。'
            ];
            
            const suggestionSets = [
              [
                '继续鼓励户外活动和社交互动，这对小熊的情绪发展非常有益',
                '可以尝试引入一些需要耐心和专注的游戏，进一步训练情绪调节能力',
                '在睡前与小熊一起回顾今天的快乐时刻，强化积极情绪记忆'
              ],
              [
                '提供更多团队合作的机会，培养小熊的领导能力和协作精神',
                '鼓励小熊尝试不同类型的创意活动，如绘画、手工、音乐等，发掘更多兴趣点',
                '适当给予小熊表扬和肯定，增强自信心和成就感'
              ],
              [
                '创造更多与同龄人互动的机会，促进社交能力的发展',
                '引导小熊学会分享快乐的情绪，关心他人的感受',
                '通过讲故事等方式，帮助小熊理解和表达各种情绪'
              ],
              [
                '鼓励小熊尝试更具挑战性的活动，培养勇气和毅力',
                '教导小熊如何在保持积极情绪的同时，理性面对问题和挑战',
                '通过角色扮演游戏，帮助小熊理解和处理不同情境中的情绪变化'
              ],
              [
                '提供丰富多样的学习资源，满足小熊的好奇心和求知欲',
                '鼓励小熊表达自己的想法和感受，培养良好的沟通习惯',
                '创造轻松愉快的家庭氛围，让积极情绪在日常生活中得到强化'
              ]
            ];
            
            // 随机选择一个分析模板和对应的建议集
            const randomIndex = Math.floor(Math.random() * analysisTemplates.length);
            analysis = analysisTemplates[randomIndex];
            suggestions = suggestionSets[randomIndex];
            
          } else if (emotionScore >= 70) {
            const analysisTemplates = [
              '小熊今天的情绪非常稳定，能够长时间专注于自己感兴趣的活动。在绘画和积木搭建等创造性活动中表现出色，并能够耐心完成较为复杂的任务。这表明小熊的自我调节能力和专注力正在良好发展。',
              '今天观察到小熊情绪平和，做事有条理。在阅读和思考类活动中表现出较强的专注力，能够静心思考并解决问题。与同伴交流时语言清晰，情绪表达适度，展现出良好的情绪管理能力。',
              '小熊今天心态平稳，在各项活动中都能保持适当的专注度。特别是在需要耐心的手工活动中，表现出色，能够按步骤完成任务。这种稳定的情绪状态有利于小熊认知能力的发展。',
              '今天小熊表现出良好的情绪控制能力，即使在面对挑战时也能保持冷静。在团队活动中能够倾听他人意见，并理性表达自己的想法。这种平和的情绪状态反映出小熊的社交情商正在提高。',
              '小熊今天情绪稳定且积极，在学习新技能时展现出耐心和毅力。能够接受指导并不断尝试，遇到困难时不轻易放弃。这种坚持的态度和稳定的情绪是培养良好学习习惯的基础。'
            ];
            
            const suggestionSets = [
              [
                '提供更多创造性和探索性的活动，满足小熊的好奇心和成就感',
                '适当增加任务的难度和复杂性，但确保在小熊能力范围内',
                '鼓励小熊分享自己的作品和想法，增强自信心'
              ],
              [
                '提供更多思考类游戏和活动，如拼图、简单的逻辑推理游戏等',
                '创造安静的环境，让小熊有独立思考和阅读的时间',
                '鼓励小熊用语言表达自己的想法和感受，培养语言能力'
              ],
              [
                '提供各种需要精细动作的活动，如串珠、折纸等，培养耐心和专注力',
                '在完成任务后给予及时的肯定和鼓励，强化积极行为',
                '教导小熊如何制定简单的计划并按步骤完成，培养规划能力'
              ],
              [
                '创造更多需要团队合作的情境，培养小熊的协作能力和沟通技巧',
                '引导小熊学习如何在不同情境中适当表达自己的情绪和需求',
                '通过讨论和分享活动，帮助小熊理解他人的情感和观点'
              ],
              [
                '设置适当的小目标，让小熊体验到通过努力获得成功的喜悦',
                '在学习过程中适当引入一些挑战，培养小熊的问题解决能力',
                '鼓励小熊记录自己的学习过程和成果，增强成就感'
              ]
            ];
            
            // 随机选择一个分析模板和对应的建议集
            const randomIndex = Math.floor(Math.random() * analysisTemplates.length);
            analysis = analysisTemplates[randomIndex];
            suggestions = suggestionSets[randomIndex];
            
          } else if (emotionScore >= 50) {
            const analysisTemplates = [
              '小熊今天情绪有些波动，但总体保持稳定。在熟悉的环境中表现自然，但面对新情况时略显犹豫。这是正常的情绪发展过程，可以通过适当引导帮助小熊更好地适应变化。',
              '今天小熊的情绪起伏较为明显，上午活动积极性高，下午则显得有些疲惫和不耐烦。在熟悉的活动中表现良好，但对新任务有些抵触。这种情绪波动可能与睡眠质量或环境变化有关。',
              '小熊今天情绪中等，时而活跃时而安静。在自己感兴趣的活动中能够投入，但注意力容易分散。与熟悉的小伙伴互动良好，但在大组活动中参与度不高。这种情绪状态需要适当的引导和支持。',
              '观察到小熊今天情绪较为平淡，没有明显的高兴或不满。在日常活动中按部就班，但缺乏主动性和创造性。这可能是小熊在适应某些变化或处理内心困惑的表现。',
              '小熊今天情绪时好时坏，早上情绪较好，能够参与集体活动，但下午情绪明显下降，不愿与人交流。这种情绪波动可能与身体状况或特定事件有关，需要进一步观察和了解原因。'
            ];
            
            const suggestionSets = [
              [
                '在日常生活中引入一些小变化，帮助小熊逐渐适应新事物',
                '多与小熊交流，鼓励表达自己的感受和想法',
                '提供情绪识别和表达的游戏，增强情绪认知能力'
              ],
              [
                '保持生活作息规律，确保小熊有充足的休息和睡眠',
                '观察小熊情绪变化的规律，找出可能的影响因素',
                '在小熊情绪好的时候多进行正向互动，建立积极联系'
              ],
              [
                '提供一些能够吸引小熊注意力的有趣活动，增强参与感',
                '在活动中适当调整难度，让小熊体验成功的喜悦',
                '创造安全、温暖的环境，让小熊感到被理解和接纳'
              ],
              [
                '尊重小熊的情绪变化，给予理解和支持',
                '引导小熊学习简单的情绪调节方法，如深呼吸、数数等',
                '通过绘本和故事，帮助小熊理解和接受不同的情绪'
              ],
              [
                '保持环境的稳定性和可预测性，减少不必要的压力',
                '鼓励小熊通过语言、绘画等方式表达内心感受',
                '寻找小熊感兴趣的活动，增强积极情绪体验'
              ]
            ];
            
            // 随机选择一个分析模板和对应的建议集
            const randomIndex = Math.floor(Math.random() * analysisTemplates.length);
            analysis = analysisTemplates[randomIndex];
            suggestions = suggestionSets[randomIndex];
            
          } else if (emotionScore >= 40) {
            const analysisTemplates = [
              '小熊今天表现出一定程度的焦虑情绪，特别是在面对陌生环境和人物时。这可能与最近的环境变化有关。在熟悉的活动中，小熊的情绪会明显好转，但整体上比平时更加敏感和容易受挫。',
              '今天小熊情绪较为紧张，对周围环境保持警惕。在集体活动中显得不安，经常寻求成人的确认和安慰。这种焦虑情绪可能与新环境或近期的变化有关，需要给予更多的安全感和支持。',
              '小熊今天表现出明显的不安情绪，注意力难以集中，容易被外界干扰。在需要等待或转换活动时情绪波动较大，有时会表现出烦躁或退缩。这可能是对某些压力源的反应，需要帮助其学习调节情绪。',
              '观察到小熊今天情绪较为低落，对平时喜欢的活动兴趣减弱，常常独自一人。在社交互动中显得被动，不愿主动参与。这种情绪状态需要更多的关注和温和的引导。',
              '小熊今天情绪不稳定，容易因小事而烦躁或哭泣。对环境中的变化反应强烈，适应能力下降。在熟悉的环境和活动中情绪会有所好转，但整体表现出较强的情绪脆弱性。'
            ];
            
            const suggestionSets = [
              [
                '提供更多的安全感和稳定性，保持日常作息的规律',
                '使用小熊喜欢的玩具或物品作为情绪安抚工具',
                '在小熊感到焦虑时，给予温柔的拥抱和言语安慰，帮助其表达情绪'
              ],
              [
                '创造安全、可预测的环境，减少不必要的变化',
                '教导小熊简单的自我安抚技巧，如深呼吸、抱抱自己等',
                '在小熊能够控制情绪时给予积极反馈，强化良好行为'
              ],
              [
                '分解复杂任务为简单步骤，帮助小熊建立成功体验',
                '提前告知活动变化，给予充分的心理准备时间',
                '引导小熊识别和表达自己的情绪，增强情绪认知能力'
              ],
              [
                '寻找小熊感兴趣的活动，重新激发其参与热情',
                '创造小规模的社交机会，降低社交压力',
                '多给予肯定和鼓励，帮助建立自信心'
              ],
              [
                '保持环境的平静和有序，减少过度刺激',
                '帮助小熊建立情绪调节的词汇，能够用语言表达感受',
                '在情绪爆发前识别预警信号，及时进行干预'
              ]
            ];
            
            // 随机选择一个分析模板和对应的建议集
            const randomIndex = Math.floor(Math.random() * analysisTemplates.length);
            analysis = analysisTemplates[randomIndex];
            suggestions = suggestionSets[randomIndex];
            
          } else {
            const analysisTemplates = [
              '小熊今天情绪较低落，主要表现为不愿参与集体活动，独处时间增多。在尝试新技能时遇到挫折后，情绪明显下降，并表现出一定的自我怀疑。这可能与最近的一些小失败经历有关，需要适当的鼓励和支持。',
              '今天小熊情绪明显低落，缺乏活力和兴趣。对周围事物反应迟钝，很少表达自己的想法和需求。在社交互动中表现被动，有时会拒绝参与。这种情绪状态需要更多的关爱和专业指导。',
              '小熊今天情绪消沉，经常独自发呆或无目的地游荡。对平时喜欢的活动和玩具兴趣减退，与同伴互动减少。在面对挑战时容易放弃，自信心明显不足。这种情况需要及时干预和支持。',
              '观察到小熊今天情绪非常低落，有明显的退缩行为。不愿意尝试新事物，对失败非常敏感。在社交场合中显得不自在，常常选择独处。这种情绪状态可能需要更专业的评估和指导。',
              '小熊今天表现出明显的悲伤情绪，有时会无缘无故哭泣。对周围的鼓励反应较弱，难以从消极情绪中走出来。这种持续的低落情绪需要更多的关注，可能需要寻求专业帮助。'
            ];
            
            const suggestionSets = [
              [
                '帮助小熊设定一些容易达成的小目标，增强成功体验',
                '分享一些关于面对挫折和失败的积极故事，帮助小熊建立健康的心态',
                '多给予肯定和鼓励，关注小熊的努力过程而非结果'
              ],
              [
                '创造温暖、接纳的环境，让小熊感到安全和被爱',
                '寻找能引起小熊兴趣的活动，逐渐重建积极体验',
                '考虑咨询儿童心理专家，获取专业建议'
              ],
              [
                '提供一对一的陪伴和关注，增强安全感',
                '引导小熊参与简单的、能够成功的活动，建立自信',
                '通过游戏和故事，帮助小熊表达和处理负面情绪'
              ],
              [
                '尊重小熊的情绪和选择，不强迫参与活动',
                '寻找小熊的优势和兴趣点，从中建立自信',
                '考虑是否有环境或关系方面的因素需要调整'
              ],
              [
                '保持耐心和一致的关爱，不对情绪表现做负面评价',
                '建立规律的生活作息和积极的日常活动',
                '如果情绪持续低落，建议咨询专业人士'
              ]
            ];
            
            // 随机选择一个分析模板和对应的建议集
            const randomIndex = Math.floor(Math.random() * analysisTemplates.length);
            analysis = analysisTemplates[randomIndex];
            suggestions = suggestionSets[randomIndex];
          }
          
          // 生成情绪分布数据
          const emotionDistribution = [
            { name: '快乐', value: 0, color: '#4CAF50' },
            { name: '平静', value: 0, color: '#2196F3' },
            { name: '伤感', value: 0, color: '#9C27B0' },
            { name: '生气', value: 0, color: '#F44336' },
            { name: '焦虑', value: 0, color: '#FFC107' }
          ];
          
          // 根据情绪分数设置不同情绪的比例，确保每种情绪至少有10%
          if (emotionScore >= 80) {
            // 快乐为主
            emotionDistribution[0].value = 55; // 快乐
            emotionDistribution[1].value = 10; // 平静
            emotionDistribution[2].value = 15; // 伤感 - 增加比例
            emotionDistribution[3].value = 10; // 生气
            emotionDistribution[4].value = 10; // 焦虑
          } else if (emotionScore >= 70) {
            // 平静为主
            emotionDistribution[0].value = 15; // 快乐
            emotionDistribution[1].value = 45; // 平静
            emotionDistribution[2].value = 15; // 伤感 - 增加比例
            emotionDistribution[3].value = 10; // 生气
            emotionDistribution[4].value = 15; // 焦虑
          } else if (emotionScore >= 60) {
            // 平静为主，有些焦虑
            emotionDistribution[0].value = 10; // 快乐
            emotionDistribution[1].value = 40; // 平静
            emotionDistribution[2].value = 15; // 伤感 - 增加比例
            emotionDistribution[3].value = 10; // 生气
            emotionDistribution[4].value = 25; // 焦虑
          } else if (emotionScore >= 50) {
            // 焦虑为主
            emotionDistribution[0].value = 10; // 快乐
            emotionDistribution[1].value = 15; // 平静
            emotionDistribution[2].value = 15; // 伤感 - 增加比例
            emotionDistribution[3].value = 10; // 生气
            emotionDistribution[4].value = 50; // 焦虑
          } else if (emotionScore >= 40) {
            // 生气为主
            emotionDistribution[0].value = 10; // 快乐
            emotionDistribution[1].value = 10; // 平静
            emotionDistribution[2].value = 15; // 伤感 - 增加比例
            emotionDistribution[3].value = 55; // 生气
            emotionDistribution[4].value = 10; // 焦虑
          } else {
            // 伤感为主
            emotionDistribution[0].value = 10; // 快乐
            emotionDistribution[1].value = 10; // 平静
            emotionDistribution[2].value = 60; // 伤感
            emotionDistribution[3].value = 10; // 生气
            emotionDistribution[4].value = 10; // 焦虑
          }
          
          // 确保总和为100%
          const total = emotionDistribution.reduce((sum, item) => sum + item.value, 0);
          if (total !== 100) {
            const factor = 100 / total;
            emotionDistribution.forEach(item => {
              item.value = Math.round(item.value * factor);
            });
          }
          
          generatedReports.push({
            id: `report-${date.getTime()}`,
            date: dateStr,
            summary,
            emotionScore,
            emotionTags,
            analysis,
            suggestions,
            isPositive,
            needsAttention,
            emotionDistribution
          });
        }
        
        setReports(generatedReports);
      } catch (error) {
        console.error('生成报告数据失败:', error);
      } finally {
        setIsLoading(false);
      }
    };
    
    generateReports();
  }, [timeRange, startDate, endDate]);
  
  // 模拟报告数据
  const mockReports: Report[] = [
    {
      id: '1',
      date: '2023-05-15',
      summary: '今天小熊很开心，玩得很尽兴',
      emotionScore: 85,
      emotionTags: [
        { name: '快乐', color: '#4CAF50' },
        { name: '兴奋', color: '#FF9800' },
      ],
      analysis: '小熊今天情绪非常积极，在户外活动中表现出极大的热情和兴趣。与同伴互动良好，能够主动分享玩具和想法。在面对小挫折时，能够迅速调整情绪，继续参与活动。这表明小熊的情绪调节能力正在平稳提升。',
      suggestions: [
        '继续鼓励户外活动和社交互动，这对小熊的情绪发展非常有益',
        '可以尝试引入一些需要耐心和专注的游戏，进一步训练情绪调节能力',
        '在睡前与小熊一起回顾今天的快乐时刻，强化积极情绪记忆'
      ],
      isPositive: true,
      needsAttention: false,
    },
    {
      id: '2',
      date: '2023-05-14',
      summary: '小熊今天有些焦虑，需要更多关注',
      emotionScore: 45,
      emotionTags: [
        { name: '焦虑', color: '#FFC107' },
        { name: '不安', color: '#FF5722' },
      ],
      analysis: '小熊今天表现出一定程度的焦虑情绪，特别是在面对陌生环境和人物时。这可能与最近的环境变化有关。在熟悉的活动中，小熊的情绪会明显好转，但整体上比平时更加敏感和容易受挫。',
      suggestions: [
        '提供更多的安全感和稳定性，保持日常作息的规律',
        '使用小熊喜欢的玩具或物品作为情绪安抚工具',
        '在小熊感到焦虑时，给予温柔的拥抱和言语安慰，帮助其表达情绪'
      ],
      isPositive: false,
      needsAttention: true,
    },
    {
      id: '3',
      date: '2023-05-13',
      summary: '小熊今天情绪平稳，专注力很好',
      emotionScore: 75,
      emotionTags: [
        { name: '平静', color: '#2196F3' },
        { name: '专注', color: '#673AB7' },
      ],
      analysis: '小熊今天的情绪非常稳定，能够长时间专注于自己感兴趣的活动。在绘画和积木搭建等创造性活动中表现出色，并能够耐心完成较为复杂的任务。这表明小熊的自我调节能力和专注力正在良好发展。',
      suggestions: [
        '提供更多创造性和探索性的活动，满足小熊的好奇心和成就感',
        '适当增加任务的难度和复杂性，但确保在小熊能力范围内',
        '鼓励小熊分享自己的作品和想法，增强自信心'
      ],
      isPositive: true,
      needsAttention: false,
    },
    {
      id: '4',
      date: '2023-05-12',
      summary: '小熊今天有些沮丧，需要鼓励',
      emotionScore: 40,
      emotionTags: [
        { name: '沮丧', color: '#9C27B0' },
        { name: '失落', color: '#607D8B' },
      ],
      analysis: '小熊今天情绪较低落，主要表现为不愿参与集体活动，独处时间增多。在尝试新技能时遇到挫折后，情绪明显下降，并表现出一定的自我怀疑。这可能与最近的一些小失败经历有关，需要适当的鼓励和支持。',
      suggestions: [
        '帮助小熊设定一些容易达成的小目标，增强成功体验',
        '分享一些关于面对挫折和失败的积极故事，帮助小熊建立健康的心态',
        '多给予肯定和鼓励，关注小熊的努力过程而非结果'
      ],
      isPositive: false,
      needsAttention: true,
    },
    {
      id: '5',
      date: '2023-05-11',
      summary: '小熊今天非常有创造力，表现活跃',
      emotionScore: 90,
      emotionTags: [
        { name: '创造力', color: '#E91E63' },
        { name: '活力', color: '#8BC34A' },
      ],
      analysis: '小熊今天表现出极高的创造力和活力，主动参与各种活动并提出了许多创新想法。在自由游戏时间，能够独立创造出复杂的故事情节和游戏规则，并邀请其他小朋友一起参与。这表明小熊的想象力和社交能力都在健康发展。',
      suggestions: [
        '提供更多开放性的材料和空间，支持小熊的创造性表达',
        '记录小熊的创意和故事，可以一起制作成小书或视频',
        '鼓励小熊在安全的环境中尝试新事物，拓展体验和想象空间'
      ],
      isPositive: true,
      needsAttention: false,
    },
  ];
  
  // 处理时间范围变更
  const handleTimeRangeChange = (range: '3days' | '7days' | '30days' | 'custom') => {
    setTimeRange(range);
    
    // 如果不是自定义范围，自动更新日期
    if (range !== 'custom') {
      const today = new Date();
      const end = today.toISOString().split('T')[0];
      
      let start = new Date(today);
      if (range === '3days') {
        start.setDate(today.getDate() - 3);
      } else if (range === '7days') {
        start.setDate(today.getDate() - 7);
      } else if (range === '30days') {
        start.setDate(today.getDate() - 30);
      }
      
      setStartDate(start.toISOString().split('T')[0]);
      setEndDate(end);
    }
  };
  
  // 处理自定义日期应用
  const handleCustomDateApply = () => {
    if (startDate && endDate) {
      // 验证日期范围
      const start = new Date(startDate);
      const end = new Date(endDate);
      
      if (start > end) {
        alert('开始日期不能晚于结束日期');
        return;
      }
      
      // 重新获取数据
      // 这里不需要额外调用，因为timeRange变化会触发useEffect
    } else {
      alert('请选择开始和结束日期');
    }
  };
  
  // 根据过滤条件筛选报告
  const filteredReports = reports.filter(report => {
    if (filter === 'latest') return true;
    if (filter === 'positive') return report.isPositive;
    if (filter === 'attention') return report.needsAttention;
    return true;
  });
  
  // 处理卡片点击，展开详情
  const handleCardClick = (report: Report) => {
    setExpandedReport(report);
  };
  
  // 处理关闭详情
  const handleCloseExpanded = () => {
    setExpandedReport(null);
  };
  
  // 获取情绪颜色
  const getEmotionColor = (report: Report) => {
    const score = report.emotionScore;
    if (score >= 80) return '#4CAF50'; // 快乐 - 绿色
    if (score >= 70) return '#2196F3'; // 平静 - 蓝色
    if (score >= 60) return '#03A9F4'; // 平静 - 浅蓝色（区分于深蓝色）
    if (score >= 50) return '#FFC107'; // 焦虑 - 黄色
    if (score >= 40) return '#F44336'; // 生气 - 红色
    return '#9C27B0'; // 伤感 - 紫色
  };
  
  // 获取情绪类型
  const getEmotionType = (report: Report): 'happy' | 'neutral' | 'sad' | 'angry' | 'worried' => {
    const score = report.emotionScore;
    if (score >= 80) return 'happy';
    if (score >= 70) return 'neutral';
    if (score >= 60) return 'neutral'; // 将'calm'改为'neutral'，与EmotionFace组件兼容
    if (score >= 50) return 'worried';
    if (score >= 40) return 'angry';
    return 'sad';
  };
  
  return (
    <PageContainer>
      <Title>每日情绪报告</Title>
      <Description>
        了解孩子的情绪变化，及时给予关爱和支持
      </Description>
      
      <TimeRangeContainer>
        <TimeRangeButton 
          $isActive={timeRange === '3days'}
          onClick={() => handleTimeRangeChange('3days')}
        >
          最近三天
        </TimeRangeButton>
        <TimeRangeButton 
          $isActive={timeRange === '7days'}
          onClick={() => handleTimeRangeChange('7days')}
        >
          最近七天
        </TimeRangeButton>
        <TimeRangeButton 
          $isActive={timeRange === '30days'}
          onClick={() => handleTimeRangeChange('30days')}
        >
          最近三十天
        </TimeRangeButton>
        <TimeRangeButton 
          $isActive={timeRange === 'custom'}
          onClick={() => handleTimeRangeChange('custom')}
        >
          自定义时间
        </TimeRangeButton>
      </TimeRangeContainer>
      
      {timeRange === 'custom' && (
        <DateInputContainer>
          <DateInput 
            type="date" 
            value={startDate} 
            onChange={(e) => setStartDate(e.target.value)}
          />
          <span>至</span>
          <DateInput 
            type="date" 
            value={endDate} 
            onChange={(e) => setEndDate(e.target.value)}
          />
          <ApplyButton onClick={handleCustomDateApply}>应用</ApplyButton>
        </DateInputContainer>
      )}
      
      <FilterContainer>
        <FilterButton 
          $isActive={filter === 'latest'}
          onClick={() => setFilter('latest')}
        >
          全部报告
        </FilterButton>
        <FilterButton 
          $isActive={filter === 'positive'}
          onClick={() => setFilter('positive')}
        >
          积极情绪
        </FilterButton>
        <FilterButton 
          $isActive={filter === 'attention'}
          onClick={() => setFilter('attention')}
        >
          需要关注
        </FilterButton>
      </FilterContainer>
      
      <ReportsContainer>
        {filteredReports.map(report => (
          <ReportCard
            key={report.id}
            onClick={() => handleCardClick(report)}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            whileHover={{ y: -5 }}
          >
            <ReportHeader $emotionColor={getEmotionColor(report)}>
              <ReportDate>{report.date}</ReportDate>
              <ReportSummary>{report.summary}</ReportSummary>
            </ReportHeader>
            <ReportContent>
              <EmotionScore>
                <ScoreLabel>情绪指数</ScoreLabel>
                <ScoreValue>{report.emotionScore}</ScoreValue>
              </EmotionScore>
              <EmotionTags>
                {report.emotionTags.map((tag, index) => (
                  <EmotionTag key={index} $color={tag.color}>
                    {tag.name}
                  </EmotionTag>
                ))}
              </EmotionTags>
            </ReportContent>
          </ReportCard>
        ))}
      </ReportsContainer>
      
      {/* 展开的报告详情 */}
      {expandedReport && (
        <ExpandedCard
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleCloseExpanded}
        >
          <ExpandedCardContent
            onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: 'spring', damping: 20 }}
          >
            <ExpandedHeader $emotionColor={getEmotionColor(expandedReport)}>
              <ReportDate>{expandedReport.date}</ReportDate>
              <ReportSummary>{expandedReport.summary}</ReportSummary>
              <CloseButton onClick={handleCloseExpanded}>×</CloseButton>
            </ExpandedHeader>
            <ExpandedContent>
              {/* 情绪表情图标 */}
              <EmotionFace 
                emotionType={getEmotionType(expandedReport)} 
                color={getEmotionColor(expandedReport)} 
              />
              
              <EmotionScore>
                <ScoreLabel>情绪指数</ScoreLabel>
                <ScoreValue>{expandedReport.emotionScore}</ScoreValue>
              </EmotionScore>
              <EmotionTags>
                {expandedReport.emotionTags.map((tag, index) => (
                  <EmotionTag key={index} $color={tag.color}>
                    {tag.name}
                  </EmotionTag>
                ))}
              </EmotionTags>
              
              {/* 情绪分布比例 */}
              {expandedReport.emotionDistribution && (
                <EmotionDistribution emotions={expandedReport.emotionDistribution} />
              )}
              
              <AnalysisSection>
                <SectionTitle>详细分析</SectionTitle>
                <AnalysisText>{expandedReport.analysis}</AnalysisText>
              </AnalysisSection>
              
              <AnalysisSection>
                <SectionTitle>建议</SectionTitle>
                <SuggestionList>
                  {expandedReport.suggestions.map((suggestion, index) => (
                    <SuggestionItem key={index}>{suggestion}</SuggestionItem>
                  ))}
                </SuggestionList>
              </AnalysisSection>
              
              <ActionButtons>
                <ActionButton>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 21.35L10.55 20.03C5.4 15.36 2 12.28 2 8.5C2 5.42 4.42 3 7.5 3C9.24 3 10.91 3.81 12 5.09C13.09 3.81 14.76 3 16.5 3C19.58 3 22 5.42 22 8.5C22 12.28 18.6 15.36 13.45 20.04L12 21.35Z" fill="currentColor" />
                  </svg>
                  点赞
                </ActionButton>
                <ActionButton>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M18 16.08C17.24 16.08 16.56 16.38 16.04 16.85L8.91 12.7C8.96 12.47 9 12.24 9 12C9 11.76 8.96 11.53 8.91 11.3L15.96 7.19C16.5 7.69 17.21 8 18 8C19.66 8 21 6.66 21 5C21 3.34 19.66 2 18 2C16.34 2 15 3.34 15 5C15 5.24 15.04 5.47 15.09 5.7L8.04 9.81C7.5 9.31 6.79 9 6 9C4.34 9 3 10.34 3 12C3 13.66 4.34 15 6 15C6.79 15 7.5 14.69 8.04 14.19L15.16 18.35C15.11 18.56 15.08 18.78 15.08 19C15.08 20.61 16.39 21.92 18 21.92C19.61 21.92 20.92 20.61 20.92 19C20.92 17.39 19.61 16.08 18 16.08Z" fill="currentColor" />
                  </svg>
                  分享
                </ActionButton>
                <ActionButton>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19 9H15V3H9V9H5L12 16L19 9ZM5 18V20H19V18H5Z" fill="currentColor" />
                  </svg>
                  下载
                </ActionButton>
              </ActionButtons>
            </ExpandedContent>
          </ExpandedCardContent>
        </ExpandedCard>
      )}
    </PageContainer>
  );
};

export default DailyReportPage;