import React from 'react';
import styled from 'styled-components';

const FaceContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 1.5rem;
`;

const Face = styled.div<{ $color: string }>`
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: ${props => props.$color};
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const Eyes = styled.div`
  position: absolute;
  top: 35%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 0 20px;
`;

const Eye = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: #000;
`;

const Mouth = styled.div<{ $type: 'happy' | 'neutral' | 'sad' | 'angry' | 'worried' | 'calm' }>`
  position: absolute;
  bottom: 25%;
  width: ${props => props.$type === 'worried' ? '20px' : '40px'};
  height: ${props => props.$type === 'worried' ? '20px' : (props.$type === 'neutral' || props.$type === 'calm') ? '5px' : '20px'};
  border-radius: ${props => 
    props.$type === 'happy' ? '0 0 20px 20px' : 
    props.$type === 'sad' ? '20px 20px 0 0' : 
    props.$type === 'worried' ? '50%' : 
    props.$type === 'calm' ? '0' : '0'};
  background-color: ${props => props.$type === 'worried' ? 'transparent' : '#000'};
  border: ${props => props.$type === 'worried' ? '2px solid #000' : 'none'};
`;

const Eyebrows = styled.div<{ $angry?: boolean }>`
  position: absolute;
  top: 25%;
  width: 100%;
  display: flex;
  justify-content: space-evenly;
  padding: 0 15px;
  transform: ${props => props.$angry ? 'rotate(30deg)' : 'none'};
`;

const Eyebrow = styled.div<{ $left?: boolean, $angry?: boolean }>`
  width: 20px;
  height: 4px;
  background-color: #000;
  transform: ${props => props.$angry ? 
    (props.$left ? 'rotate(-60deg)' : 'rotate(60deg)') : 'none'};
`;

interface EmotionFaceProps {
  emotionType: 'happy' | 'neutral' | 'sad' | 'angry' | 'worried' | 'calm';
  color: string;
}

const EmotionFace: React.FC<EmotionFaceProps> = ({ emotionType, color }) => {
  return (
    <FaceContainer>
      <Face $color={color}>
        {(emotionType === 'angry') && (
          <Eyebrows $angry>
            <Eyebrow $left $angry />
            <Eyebrow $angry />
          </Eyebrows>
        )}
        <Eyes>
          <Eye />
          <Eye />
        </Eyes>
        <Mouth $type={emotionType === 'calm' ? 'neutral' : emotionType} />
      </Face>
    </FaceContainer>
  );
};

export default EmotionFace;