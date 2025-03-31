import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import styled from 'styled-components';
import { motion } from 'framer-motion';
const Container = styled.div `
  margin: 1.5rem 0;
`;
const Title = styled.h4 `
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 600;
`;
const DistributionContainer = styled.div `
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
`;
const EmotionRow = styled.div `
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const EmotionLabel = styled.div `
  width: 80px;
  font-size: 0.9rem;
  color: #555;
  font-weight: 500;
`;
const ProgressBarContainer = styled.div `
  flex: 1;
  height: 12px;
  background-color: #f0f0f0;
  border-radius: 6px;
  overflow: hidden;
`;
const ProgressBar = styled(motion.div) `
  height: 100%;
  background-color: ${props => props.$color};
  border-radius: 6px;
`;
const PercentageValue = styled.div `
  width: 40px;
  font-size: 0.9rem;
  color: #555;
  font-weight: 600;
  text-align: right;
`;
const EmotionDistribution = ({ emotions }) => {
    return (_jsxs(Container, { children: [_jsx(Title, { children: "\u60C5\u7EEA\u5206\u5E03" }), _jsx(DistributionContainer, { children: emotions.map((emotion, index) => (_jsxs(EmotionRow, { children: [_jsx(EmotionLabel, { children: emotion.name }), _jsx(ProgressBarContainer, { children: _jsx(ProgressBar, { "$color": emotion.color, initial: { width: 0 }, animate: { width: `${emotion.value}%` }, transition: { duration: 1, delay: index * 0.1 } }) }), _jsxs(PercentageValue, { children: [emotion.value, "%"] })] }, index))) })] }));
};
export default EmotionDistribution;
