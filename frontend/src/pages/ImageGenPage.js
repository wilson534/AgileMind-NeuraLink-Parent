import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
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
const FormContainer = styled.div `
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
const InputGroup = styled.div `
  margin-bottom: 1.5rem;
`;
const Label = styled.label `
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 600;
  color: #444;
`;
const Input = styled.input `
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
const TextArea = styled.textarea `
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
const Select = styled.select `
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
const Button = styled(motion.button) `
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
const ResultContainer = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 2rem;
`;
const ImageCard = styled(motion.div) `
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
const GeneratedImage = styled.img `
  width: 100%;
  height: 300px;
  object-fit: cover;
  display: block;
`;
const ImageInfo = styled.div `
  padding: 1rem;
`;
const ImageTitle = styled.h3 `
  margin: 0 0 0.5rem;
  font-size: 1.1rem;
  color: #333;
`;
const LoadingContainer = styled(motion.div) `
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 3rem;
`;
const LoadingText = styled.p `
  margin-top: 1rem;
  color: var(--primary-color);
  font-weight: 500;
`;
// 粒子动画组件
const ParticleContainer = styled(motion.div) `
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 0;
`;
const Particle = styled(motion.div) `
  position: absolute;
  background: white;
  border-radius: 50%;
  pointer-events: none;
`;
const ImageGenPage = () => {
    const [target, setTarget] = useState('');
    const [message, setMessage] = useState('');
    const [style, setStyle] = useState('cartoon');
    const [isLoading, setIsLoading] = useState(false);
    const [generatedImages, setGeneratedImages] = useState([]);
    // 模拟生成的图片数据
    const mockImages = [
        { url: '/images/teddy_bear.jpg', prompt: '温暖的泰迪熊' },
        { url: '/images/cute_dog.jpg', prompt: '可爱的小狗' },
    ];
    const handleSubmit = async (e) => {
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
            }
            else {
                throw new Error('API返回错误');
            }
        }
        catch (error) {
            console.error('生成图片失败:', error);
            alert('生成图片失败，请稍后再试');
        }
        finally {
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
    const generateParticles = (count) => {
        return Array.from({ length: count }).map((_, i) => (_jsx(Particle, { variants: particleVariants, style: {
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
                width: `${Math.random() * 10 + 5}px`,
                height: `${Math.random() * 10 + 5}px`,
                background: `hsl(${Math.random() * 60 + 240}, 100%, 75%)`,
            } }, i)));
    };
    return (_jsxs(PageContainer, { children: [_jsx(Title, { children: "\u5FC3\u7075\u753B\u7B14" }), _jsx(Description, { children: "\u5C06\u4F60\u60F3\u5BF9\u5C0F\u718A\u8BF4\u7684\u8BDD\u8F6C\u5316\u4E3A\u6E29\u99A8\u6CBB\u6108\u7684\u56FE\u7247\uFF0C\u8BA9\u60C5\u611F\u6709\u4E86\u89C6\u89C9\u7684\u8868\u8FBE" }), _jsx(FormContainer, { children: _jsxs("form", { onSubmit: handleSubmit, children: [_jsxs(InputGroup, { children: [_jsx(Label, { htmlFor: "target", children: "\u8BC9\u8BF4\u5BF9\u8C61" }), _jsx(Input, { id: "target", type: "text", placeholder: "\u4F8B\u5982\uFF1A\u5C0F\u718A\u3001\u5988\u5988\u3001\u670B\u53CB...", value: target, onChange: (e) => setTarget(e.target.value), required: true })] }), _jsxs(InputGroup, { children: [_jsx(Label, { htmlFor: "message", children: "\u60F3\u8BF4\u7684\u8BDD" }), _jsx(TextArea, { id: "message", placeholder: "\u5728\u8FD9\u91CC\u5199\u4E0B\u4F60\u60F3\u8868\u8FBE\u7684\u60C5\u611F\u548C\u60F3\u6CD5...", value: message, onChange: (e) => setMessage(e.target.value), required: true })] }), _jsxs(InputGroup, { children: [_jsx(Label, { htmlFor: "style", children: "\u56FE\u7247\u98CE\u683C" }), _jsxs(Select, { id: "style", value: style, onChange: (e) => setStyle(e.target.value), children: [_jsx("option", { value: "cartoon", children: "\u5361\u901A\u98CE\u683C" }), _jsx("option", { value: "handdrawn", children: "\u624B\u7ED8\u98CE\u683C" }), _jsx("option", { value: "3d", children: "3D\u6E32\u67D3" }), _jsx("option", { value: "watercolor", children: "\u6C34\u5F69\u753B\u98CE" }), _jsx("option", { value: "pixar", children: "\u76AE\u514B\u65AF\u98CE\u683C" })] })] }), _jsxs(Button, { type: "submit", disabled: isLoading, whileHover: { scale: 1.05 }, whileTap: { scale: 0.95 }, children: [isLoading ? '生成中...' : '生成图片', !isLoading && (_jsx(ParticleContainer, { variants: containerVariants, initial: "hidden", animate: "visible", children: generateParticles(20) }))] })] }) }), isLoading && (_jsxs(LoadingContainer, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: [_jsx(motion.div, { animate: {
                            rotate: 360,
                            borderRadius: ["20%", "50%", "20%"],
                            backgroundColor: ["#6a5acd", "#9370db", "#6a5acd"]
                        }, transition: { duration: 2, repeat: Infinity, ease: "linear" }, style: { width: 60, height: 60 } }), _jsx(LoadingText, { children: "AI \u6B63\u5728\u7ED8\u5236\u4F60\u7684\u60C5\u611F..." })] })), (generatedImages.length > 0 || mockImages.length > 0) && (_jsxs(ResultContainer, { children: [generatedImages.map((image, index) => (_jsxs(ImageCard, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: [_jsx(GeneratedImage, { src: image.url, alt: `生成的图片 ${index + 1}` }), _jsx(ImageInfo, { children: _jsx(ImageTitle, { children: image.prompt }) })] }, `generated-${index}`))), generatedImages.length === 0 && mockImages.map((image, index) => (_jsxs(ImageCard, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, transition: { delay: index * 0.1 }, children: [_jsx(GeneratedImage, { src: image.url, alt: `示例图片 ${index + 1}` }), _jsx(ImageInfo, { children: _jsx(ImageTitle, { children: image.prompt }) })] }, `mock-${index}`)))] }))] }));
};
export default ImageGenPage;
