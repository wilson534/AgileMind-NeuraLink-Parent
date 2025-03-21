import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';

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

const FormContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: var(--card-shadow);
  margin-bottom: 2rem;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const InputGroup = styled.div`
  margin-bottom: 1.5rem;
`;

const Label = styled.label`
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #444;
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(106, 90, 205, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  min-height: 120px;
  resize: vertical;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(106, 90, 205, 0.2);
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 0.75rem 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-size: 1rem;
  background-color: white;
  cursor: pointer;
  transition: all 0.3s;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
    box-shadow: 0 0 0 3px rgba(106, 90, 205, 0.2);
  }
`;

const Button = styled(motion.button)`
  background: linear-gradient(45deg, var(--primary-color), var(--secondary-color));
  color: white;
  border: none;
  border-radius: 8px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 600;
  cursor: pointer;
  display: block;
  margin: 2rem auto 0;
  position: relative;
  overflow: hidden;
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const ResultContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;

const ImageCard = styled(motion.div)`
  background: white;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  }
`;

const GeneratedImage = styled.img`
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
`;

const ImageInfo = styled.div`
  padding: 1rem;
`;

const ImageTitle = styled.h3`
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: #333;
`;

const LoadingContainer = styled(motion.div)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`;

const LoadingText = styled.p`
  margin-top: 1rem;
  color: var(--primary-color);
  font-weight: 500;
`;

// 粒子动画组件
const ParticleContainer = styled(motion.div)`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;

const Particle = styled(motion.div)`
  position: absolute;
  background: white;
  border-radius: 50%;
  pointer-events: none;
`;

const ImageGenPage: React.FC = () => {
  const [target, setTarget] = useState('');
  const [message, setMessage] = useState('');
  const [style, setStyle] = useState('cartoon');
  const [isLoading, setIsLoading] = useState(false);
  const [generatedImages, setGeneratedImages] = useState<Array<{url: string, prompt: string}>>([]);
  
  // 模拟生成的图片数据
  const mockImages = [
    { url: '/images/teddy_bear.jpg', prompt: '温暖的泰迪熊' },
    { url: '/images/cute_dog.jpg', prompt: '可爱的小狗' },
  ];
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!target.trim() || !message.trim()) {
      alert('请填写所有必填字段');
      return;
    }
    
    setIsLoading(true);
    
    try {
      // 调用后端API生成图片
      const response = await axios.post('/api/image/generate', {
        target,
        message,
        style
      });
      
      // 处理API响应
      if (response.data && response.data.status === 'success') {
        const newImage = {
          url: response.data.data.imageUrl,
          prompt: message
        };
        
        setGeneratedImages(prev => [newImage, ...prev]);
      } else {
        throw new Error('API返回错误');
      }
    } catch (error) {
      console.error('生成图片失败:', error);
      alert('生成图片失败，请稍后再试');
    } finally {
      setIsLoading(false);
    }
  };
  
  // 粒子动画变体
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const particleVariants = {
    hidden: { opacity: 0, scale: 0 },
    visible: {
      opacity: [0, 1, 0],
      scale: [0, 1, 0],
      transition: {
        duration: 2
      }
    }
  };
  
  // 生成随机粒子
  const generateParticles = (count: number) => {
    return Array.from({ length: count }).map((_, i) => (
      <Particle
        key={i}
        variants={particleVariants}
        style={{
          top: `${Math.random() * 100}%`,
          left: `${Math.random() * 100}%`,
          width: `${Math.random() * 10 + 5}px`,
          height: `${Math.random() * 10 + 5}px`,
          background: `hsl(${Math.random() * 60 + 240}, 100%, 75%)`,
        }}
      />
    ));
  };
  
  return (
    <PageContainer>
      <Title>心灵画笔</Title>
      <Description>
        将你想对小熊说的话转化为温馨治愈的图片，让情感有了视觉的表达
      </Description>
      
      <FormContainer>
        <form onSubmit={handleSubmit}>
          <InputGroup>
            <Label htmlFor="target">诉说对象</Label>
            <Input
              id="target"
              type="text"
              placeholder="例如：小熊、妈妈、朋友..."
              value={target}
              onChange={(e) => setTarget(e.target.value)}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="message">想说的话</Label>
            <TextArea
              id="message"
              placeholder="在这里写下你想表达的情感和想法..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
            />
          </InputGroup>
          
          <InputGroup>
            <Label htmlFor="style">图片风格</Label>
            <Select
              id="style"
              value={style}
              onChange={(e) => setStyle(e.target.value)}
            >
              <option value="cartoon">卡通风格</option>
              <option value="handdrawn">手绘风格</option>
              <option value="3d">3D渲染</option>
              <option value="watercolor">水彩画风</option>
              <option value="pixar">皮克斯风格</option>
            </Select>
          </InputGroup>
          
          <Button
            type="submit"
            disabled={isLoading}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isLoading ? '生成中...' : '生成图片'}
            
            {/* 点击按钮时的粒子效果 */}
            {!isLoading && (
              <ParticleContainer
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {generateParticles(20)}
              </ParticleContainer>
            )}
          </Button>
        </form>
      </FormContainer>
      
      {isLoading && (
        <LoadingContainer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            animate={{
              rotate: 360,
              borderRadius: ["20%", "50%", "20%"],
              backgroundColor: ["#6a5acd", "#9370db", "#6a5acd"]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
            style={{ width: 60, height: 60 }}
          />
          <LoadingText>AI 正在绘制你的情感...</LoadingText>
        </LoadingContainer>
      )}
      
      {(generatedImages.length > 0 || mockImages.length > 0) && (
        <ResultContainer>
          {/* 实际生成的图片 */}
          {generatedImages.map((image, index) => (
            <ImageCard
              key={`generated-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GeneratedImage src={image.url} alt={`生成的图片 ${index + 1}`} />
              <ImageInfo>
                <ImageTitle>{image.prompt}</ImageTitle>
              </ImageInfo>
            </ImageCard>
          ))}
          
          {/* 模拟的示例图片 */}
          {generatedImages.length === 0 && mockImages.map((image, index) => (
            <ImageCard
              key={`mock-${index}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <GeneratedImage src={image.url} alt={`示例图片 ${index + 1}`} />
              <ImageInfo>
                <ImageTitle>{image.prompt}</ImageTitle>
              </ImageInfo>
            </ImageCard>
          ))}
        </ResultContainer>
      )}
    </PageContainer>
  );
};

export default ImageGenPage;