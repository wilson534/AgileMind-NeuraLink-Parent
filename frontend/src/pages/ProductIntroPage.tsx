import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { motion } from 'framer-motion';

// 样式定义
const IntroContainer = styled.div`
  min-height: 100vh;
  color: var(--text-color);
  padding: 2rem 0;
`;

const Header = styled.header`
  text-align: center;
  margin-bottom: 3rem;
`;

const Tagline = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 1rem;
  color: var(--primary-color);
  text-align: center;

  @media (max-width: 768px) {
    font-size: 1.8rem;
  }
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: var(--text-color);
  max-width: 800px;
  margin: 0 auto;
  text-align: center;
`;

const FeaturesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 2rem auto;
  padding: 0 2rem;
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(3, 1fr);
  }
  
  @media (max-width: 768px) {
    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
    gap: 1.5rem;
  }
`;

const FeatureCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--card-shadow);
  transition: transform var(--transition-time), box-shadow var(--transition-time);
  height: 100%;
  display: flex;
  flex-direction: column;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
`;

const FeatureTitle = styled.h2`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  color: var(--primary-color);
`;

const FeatureDescription = styled.p`
  color: var(--text-color);
  margin-bottom: 1.5rem;
  flex-grow: 1;
`;

const FeatureIcon = styled.div`
  font-size: 2.5rem;
  margin-bottom: 1.5rem;
  color: var(--primary-color);
`;

const LearnMoreButton = styled.button`
  background: transparent;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  padding: 0.5rem 1rem;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all var(--transition-time);
  align-self: flex-start;

  &:hover {
    background: rgba(106, 90, 205, 0.1);
  }
`;

const StartButton = styled(Link)`
  display: block;
  width: fit-content;
  margin: 3rem auto;
  background-color: var(--primary-color);
  color: white;
  font-size: 1.2rem;
  font-weight: 600;
  padding: 1rem 2.5rem;
  border-radius: 8px;
  text-decoration: none;
  box-shadow: var(--card-shadow);
  transition: all var(--transition-time);
  position: relative;
  overflow: hidden;

  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.15);
  }
  
  &::after {
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    width: 5px;
    height: 5px;
    background: rgba(255, 255, 255, 0.5);
    opacity: 0;
    border-radius: 100%;
    transform: scale(1, 1) translate(-50%);
    transform-origin: 50% 50%;
  }
  
  &:focus:not(:active)::after {
    animation: ripple 1s ease-out;
  }
  
  @keyframes ripple {
    0% {
      transform: scale(0, 0);
      opacity: 0.5;
    }
    20% {
      transform: scale(25, 25);
      opacity: 0.5;
    }
    100% {
      opacity: 0;
      transform: scale(40, 40);
    }
  }
`;

// 图标组件
const EmotionIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 5C13.66 5 15 6.34 15 8C15 9.66 13.66 11 12 11C10.34 11 9 9.66 9 8C9 6.34 10.34 5 12 5ZM12 19.2C9.5 19.2 7.29 17.92 6 15.98C6.03 13.99 10 12.9 12 12.9C13.99 12.9 17.97 13.99 18 15.98C16.71 17.92 14.5 19.2 12 19.2Z" fill="var(--primary-color)"/>
  </svg>
);

const ChartIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 13H5V21H3V13ZM7 9H9V21H7V9ZM11 5H13V21H11V5ZM15 13H17V21H15V13ZM19 9H21V21H19V9Z" fill="var(--primary-color)"/>
  </svg>
);

const InteractionIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 6H19V15H6V17C6 17.55 6.45 18 7 18H18L22 22V7C22 6.45 21.55 6 21 6ZM17 12V3C17 2.45 16.55 2 16 2H3C2.45 2 2 2.45 2 3V17L6 13H16C16.55 13 17 12.55 17 12Z" fill="var(--primary-color)"/>
  </svg>
);

const CommunityIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 11C17.66 11 18.99 9.66 18.99 8C18.99 6.34 17.66 5 16 5C14.34 5 13 6.34 13 8C13 9.66 14.34 11 16 11ZM8 11C9.66 11 10.99 9.66 10.99 8C10.99 6.34 9.66 5 8 5C6.34 5 5 6.34 5 8C5 9.66 6.34 11 8 11ZM8 13C5.67 13 1 14.17 1 16.5V19H15V16.5C15 14.17 10.33 13 8 13ZM16 13C15.71 13 15.38 13.02 15.03 13.05C16.19 13.89 17 15.02 17 16.5V19H23V16.5C23 14.17 18.33 13 16 13Z" fill="var(--primary-color)"/>
  </svg>
);

const VoiceIcon = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 14C13.66 14 14.99 12.66 14.99 11L15 5C15 3.34 13.66 2 12 2C10.34 2 9 3.34 9 5V11C9 12.66 10.34 14 12 14ZM17.3 11C17.3 14 14.76 16.1 12 16.1C9.24 16.1 6.7 14 6.7 11H5C5 14.41 7.72 17.23 11 17.72V21H13V17.72C16.28 17.23 19 14.41 19 11H17.3Z" fill="var(--primary-color)"/>
  </svg>
);

// 新增样式组件
const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  padding: 2rem;
  
  @media (min-width: 1200px) {
    grid-template-columns: repeat(4, 1fr);
  }
`;

const StatCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  text-align: center;
  box-shadow: var(--card-shadow);
  transition: transform var(--transition-time);
  
  &:hover {
    transform: translateY(-5px);
  }
`;

const StatNumber = styled.div`
  font-size: 2.5rem;
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const StatLabel = styled.div`
  color: var(--text-color);
  font-size: 1rem;
`;

const HeroSection = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 4rem 2rem;
  text-align: center;
  position: relative;
  overflow: hidden;
`;

const BenefitsSection = styled.section`
  padding: 4rem 2rem;
  background-color: #f8f9fa;
  border-radius: 16px;
  margin: 2rem auto;
  max-width: 1200px;
`;

const BenefitsTitle = styled.h2`
  font-size: 2rem;
  color: var(--primary-color);
  text-align: center;
  margin-bottom: 3rem;
`;

const BenefitsList = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 2rem;
`;

const BenefitItem = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 1rem;
  max-width: 500px;
`;

const BenefitIcon = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: rgba(106, 90, 205, 0.1);
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--primary-color);
  font-size: 1.5rem;
  flex-shrink: 0;
`;

const BenefitContent = styled.div`
  flex: 1;
`;

const BenefitHeading = styled.h3`
  font-size: 1.25rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const BenefitText = styled.p`
  color: var(--text-color);
  line-height: 1.6;
`;

const TestimonialSection = styled.section`
  padding: 4rem 2rem;
  text-align: center;
  max-width: 1200px;
  margin: 0 auto;
`;

const TestimonialTitle = styled.h2`
  font-size: 2rem;
  color: var(--primary-color);
  margin-bottom: 3rem;
`;

const TestimonialCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  padding: 2rem;
  box-shadow: var(--card-shadow);
  max-width: 800px;
  margin: 0 auto;
  text-align: left;
`;

const TestimonialText = styled.p`
  font-size: 1.1rem;
  line-height: 1.8;
  margin-bottom: 1.5rem;
  font-style: italic;
  color: var(--text-color);
`;

const TestimonialAuthor = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const AuthorAvatar = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: var(--primary-color);
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-weight: 600;
  font-size: 1.25rem;
`;

const AuthorInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const AuthorName = styled.span`
  font-weight: 600;
  color: var(--text-color);
`;

const AuthorRole = styled.span`
  font-size: 0.875rem;
  color: #666;
`;

const ProductIntroPage: React.FC = () => {
  // 定义功能模块数据
  const features = [
    {
      title: "文生图",
      description: "输入'诉说对象'与'想说的话'，选择图片风格，生成可爱疗愈风动漫图片，表达情感。",
      icon: <EmotionIcon />
    },
    {
      title: "身体小管家",
      description: "记录孩子的饮食、运动与睡眠信息，获取个性化健康建议，全方位关注孩子的身体健康。",
      icon: <ChartIcon />
    },
    {
      title: "每日报告",
      description: "以卡片形式罗列孩子当天或历次情绪总结，查看详细分析和建议，掌握孩子情绪变化。",
      icon: <InteractionIcon />
    },
    {
      title: "情绪图表",
      description: "使用图表展示不同时间范围的情绪变化，支持多情绪标签对比，直观了解孩子心理健康。",
      icon: <ChartIcon />
    },
    {
      title: "声音克隆",
      description: "上传音频文件，AI声纹克隆，支持试听、与原音对比、多角色模板选择，提供熟悉的声音陪伴。",
      icon: <VoiceIcon />
    },
    {
      title: "家长信箱",
      description: "接收孩子通过AI玩偶发送的消息，查看对话记录，设置提醒与干预，保持与孩子的紧密联系。",
      icon: <InteractionIcon />
    },
    {
      title: "社区交流",
      description: "连接志同道合的家长，分享育儿经验，获取专家指导，共同面对育儿挑战，建立支持网络。",
      icon: <CommunityIcon />
    }
  ];

  // 定义产品优势数据
  const benefits = [
    {
      title: "提高亲子沟通效率",
      description: "通过情绪分析，帮助家长更准确地理解孩子的需求，减少沟通障碍，提高沟通效率。",
      icon: "💬"
    },
    {
      title: "减轻育儿压力",
      description: "提供专业的育儿建议和社区支持，帮助家长减轻育儿压力，增强育儿信心。",
      icon: "🌈"
    },
    {
      title: "促进孩子健康成长",
      description: "通过及时了解孩子的情绪变化，给予适当的关爱和支持，促进孩子的心理健康发展。",
      icon: "🌱"
    },
    {
      title: "增强亲子关系",
      description: "提供个性化的亲子互动建议，帮助家长与孩子建立更紧密的情感联系。",
      icon: "❤️"
    },
    {
      title: "AI技术赋能",
      description: "运用先进的人工智能技术，提供情绪识别、声音克隆、文生图等功能，让育儿更智能化。",
      icon: "🤖"
    },
    {
      title: "全面健康管理",
      description: "不仅关注情绪健康，还提供身体健康管理，全方位守护孩子的成长。",
      icon: "🏥"
    },
    {
      title: "社区资源共享",
      description: "汇聚众多家长的经验和智慧，形成强大的育儿知识库，让每位家长都能从中受益。",
      icon: "👨‍👩‍👧‍👦"
    }
  ];

  // 定义技术合作伙伴
  const techPartners = [
    { name: "OpenAI", logo: "/images/openai-logo.svg" },
    { name: "火山引擎", logo: "/images/volcengine-logo.svg" },
    { name: "Coze", logo: "/images/coze-logo.svg" },
    { name: "Trae", logo: "/images/trae-logo.svg" },
    { name: "小米", logo: "/images/xiaomi-logo.svg" }
  ];


  return (
    <IntroContainer>
      <HeroSection>
        <Header>
          <Tagline>使用AI技术，帮助家长了解孩子情绪，提供10倍的亲子互动效果</Tagline>
          <Subtitle>了解孩子的情绪变化，及时给予关爱和支持</Subtitle>
        </Header>
        <StartButton to="/daily-report">开始体验</StartButton>
      </HeroSection>

      <StatsSection>
        {stats.map((stat, index) => (
          <StatCard key={index}>
            <StatNumber>{stat.number}</StatNumber>
            <StatLabel>{stat.label}</StatLabel>
          </StatCard>
        ))}
      </StatsSection>

      <FeaturesGrid>
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <FeatureIcon>{feature.icon}</FeatureIcon>
            <FeatureTitle>{feature.title}</FeatureTitle>
            <FeatureDescription>{feature.description}</FeatureDescription>
            <LearnMoreButton>了解更多</LearnMoreButton>
          </FeatureCard>
        ))}
      </FeaturesGrid>

      <BenefitsSection>
        <BenefitsTitle>为什么选择心灵纽带NeuraLink？</BenefitsTitle>
        <BenefitsList>
          {benefits.map((benefit, index) => (
            <BenefitItem key={index}>
              <BenefitIcon>{benefit.icon}</BenefitIcon>
              <BenefitContent>
                <BenefitHeading>{benefit.title}</BenefitHeading>
                <BenefitText>{benefit.description}</BenefitText>
              </BenefitContent>
            </BenefitItem>
          ))}
        </BenefitsList>
      </BenefitsSection>

      <TestimonialSection>
        <TestimonialTitle>用户反馈</TestimonialTitle>
        <TestimonialCard
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        >
          <TestimonialText>
            "心灵纽带NeuraLink帮助我更好地理解了孩子的情绪变化，让我知道什么时候他需要我的关注和支持。通过每日报告和情绪图表，我能够清晰地看到孩子的情绪发展趋势，及时调整我的育儿方式。这款应用真的改变了我们的亲子关系！"
          </TestimonialText>
          <TestimonialAuthor>
            <AuthorAvatar>L</AuthorAvatar>
            <AuthorInfo>
              <AuthorName>李女士</AuthorName>
              <AuthorRole>两个孩子的妈妈</AuthorRole>
            </AuthorInfo>
          </TestimonialAuthor>
        </TestimonialCard>
      </TestimonialSection>

      {/* 技术合作伙伴展示 */}
      <section style={{ maxWidth: '1200px', margin: '4rem auto', padding: '0 2rem' }}>
        <h2 style={{ fontSize: '2rem', color: 'var(--primary-color)', textAlign: 'center', marginBottom: '3rem' }}>技术提供</h2>
        <div style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '2rem', alignItems: 'center' }}>
          {techPartners.map((partner, index) => (
            <div key={index} style={{ textAlign: 'center', width: '120px' }}>
              <img src={partner.logo} alt={partner.name} style={{ width: '100%', height: 'auto' }} />
              <p style={{ marginTop: '1rem', color: 'var(--text-color)' }}>{partner.name}</p>
            </div>
          ))}
        </div>
      </section>
    </IntroContainer>
  );
};

export default ProductIntroPage;

// 定义统计数据
const stats = [
  {
    number: "10,0+",
    label: "活跃用户"
  },
  {
    number: "95%",
    label: "用户满意度"
  },
  {
    number: "10+",
    label: "专业顾问"
  },
  {
    number: "24/7",
    label: "全天候服务"
  }
];