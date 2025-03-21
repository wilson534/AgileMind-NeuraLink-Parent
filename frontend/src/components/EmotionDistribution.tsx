import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const Container = styled.div`
  margin: 1.5rem 0;
`;

const Title = styled.h4`
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 600;
`;

const DistributionContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;

const EmotionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;

const EmotionLabel = styled.div`
  width: 80px;
  font-size: 0.9rem;
  color: #555;
  font-weight: 500;
`;

const ProgressBarContainer = styled.div`
  flex: 1;
  height: 12px;
  background-color: #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
`;

const ProgressBar = styled(motion.div)<{ $color: string }>`
  height: 100%;
  background-color: ${props => props.$color};
  border-radius: 6px;
`;

const PercentageValue = styled.div`
  width: 40px;
  font-size: 0.9rem;
  color: #555;
  font-weight: 600;
  text-align: right;
`;

interface EmotionItem {
  name: string;
  value: number;
  color: string;
}

interface EmotionDistributionProps {
  emotions: EmotionItem[];
}

const EmotionDistribution: React.FC<EmotionDistributionProps> = ({ emotions }) => {
  return (
    <Container>
      <Title>情绪分布</Title>
      <DistributionContainer>
        {emotions.map((emotion, index) => (
          <EmotionRow key={index}>
            <EmotionLabel>{emotion.name}</EmotionLabel>
            <ProgressBarContainer>
              <ProgressBar
                $color={emotion.color}
                initial={{ width: 0 }}
                animate={{ width: `${emotion.value}%` }}
                transition={{ duration: 1, delay: index * 0.1 }}
              />
            </ProgressBarContainer>
            <PercentageValue>{emotion.value}%</PercentageValue>
          </EmotionRow>
        ))}
      </DistributionContainer>
    </Container>
  );
};

export default EmotionDistribution;