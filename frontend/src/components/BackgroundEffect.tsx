import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import styled from 'styled-components';

// 定义粒子类型
interface Particle {
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  color: string;
  opacity: number;
  type: 'normal' | 'special'; // 粒子类型
  rotation?: number; // 旋转角度
  scale?: number; // 缩放比例
}

// 定义组件属性
interface BackgroundEffectProps {
  isDarkMode?: boolean;
  particleCount?: number;
  theme?: 'default' | 'health' | 'emotion' | 'voice' | 'spring' | 'summer' | 'autumn' | 'winter';
  enableWaves?: boolean; // 是否启用波浪效果
  enableHalo?: boolean; // 是否启用光晕效果
  interactionStrength?: number; // 交互强度
  emotionState?: 'happy' | 'sad' | 'angry' | 'anxious' | 'calm' | null; // 情绪状态
  enableParallax?: boolean; // 是否启用视差效果
  enableCelebration?: boolean; // 是否启用庆祝动画
  enableAudio?: boolean; // 是否启用音效
}

// 样式组件
const EffectContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: -1;
  overflow: hidden;
  pointer-events: none;
`;

const Canvas = styled.canvas`
  width: 100%;
  height: 100%;
`;

// 波浪效果容器
const WaveContainer = styled.div`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 200px;
  overflow: hidden;
  pointer-events: none;
`;

// 波浪SVG
const Wave = styled.div.attrs<{ $delay: number; $opacity: number; isDarkMode: boolean; theme: string }>(props => {
  // 将isDarkMode和theme属性转换为data属性，而不是直接传递给DOM
  return {
    style: {
      animationDelay: `${props.$delay}s`,
      opacity: props.$opacity
    },
    'data-theme': props.theme,
    'data-isdarkmode': props.isDarkMode ? 'true' : 'false'
  };
})<{ $delay: number; $opacity: number; isDarkMode: boolean; theme: string }>`
  position: absolute;
  bottom: 0;
  left: 0;
  width: 200%;
  height: 100%;
  background-repeat: repeat-x;
  animation: waveAnimation 25s linear infinite;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1440 320'%3E%3Cpath fill='%23${props => {
    const color = props.isDarkMode 
      ? props.theme === 'health' ? '6A5ACD' 
      : props.theme === 'emotion' ? 'FF69B4' 
      : props.theme === 'voice' ? '4682B4' 
      : '6A5ACD'
      : props.theme === 'health' ? 'E6E6FA' 
      : props.theme === 'emotion' ? 'FFF0F5' 
      : props.theme === 'voice' ? 'F0F8FF' 
      : 'F8F9FA';
    return color;
  }}' opacity='${props => props.opacity}' d='M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z'%3E%3C/path%3E%3C/svg%3E");
  
  @keyframes waveAnimation {
    0% {
      transform: translateX(0);
    }
    100% {
      transform: translateX(-50%);
    }
  }
`;

// 光晕效果
const Halo = styled.div<{ size: number; x: number; y: number; color: string }>`
  position: absolute;
  width: ${props => props.size}px;
  height: ${props => props.size}px;
  border-radius: 50%;
  top: ${props => props.y}px;
  left: ${props => props.x}px;
  background: radial-gradient(circle, ${props => props.color} 0%, rgba(255,255,255,0) 70%);
  transform: translate(-50%, -50%);
  opacity: 0.7;
  pointer-events: none;
  animation: pulseAnimation 4s ease-in-out infinite;
  
  @keyframes pulseAnimation {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.7;
    }
    50% {
      transform: translate(-50%, -50%) scale(1.2);
      opacity: 0.5;
    }
    100% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 0.7;
    }
  }
`;

const GradientOverlay = styled.div.attrs<{ isDarkMode: boolean; theme: string; emotionState?: string | null }>(props => {
  // 将属性转换为data属性，而不是直接传递给DOM
  return {
    'data-theme': props.theme,
    'data-emotion': props.emotionState || 'none',
    'data-isdarkmode': props.isDarkMode ? 'true' : 'false'
  };
})<{ isDarkMode: boolean; theme: string; emotionState?: string | null }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: ${({ isDarkMode, theme, emotionState }) => {
    // 根据情绪状态选择背景
    if (emotionState) {
      switch (emotionState) {
        case 'happy':
          return isDarkMode
            ? 'linear-gradient(135deg, rgba(255, 223, 0, 0.3) 0%, rgba(255, 165, 0, 0.3) 100%)' // 金黄色渐变
            : 'linear-gradient(135deg, rgba(255, 253, 208, 0.7) 0%, rgba(255, 236, 179, 0.7) 100%)';
        case 'sad':
          return isDarkMode
            ? 'linear-gradient(135deg, rgba(65, 105, 225, 0.3) 0%, rgba(30, 144, 255, 0.3) 100%)' // 蓝色渐变
            : 'linear-gradient(135deg, rgba(230, 230, 250, 0.7) 0%, rgba(176, 224, 230, 0.7) 100%)';
        case 'angry':
          return isDarkMode
            ? 'linear-gradient(135deg, rgba(220, 20, 60, 0.3) 0%, rgba(178, 34, 34, 0.3) 100%)' // 红色渐变
            : 'linear-gradient(135deg, rgba(255, 228, 225, 0.7) 0%, rgba(255, 182, 193, 0.7) 100%)';
        case 'anxious':
          return isDarkMode
            ? 'linear-gradient(135deg, rgba(255, 165, 0, 0.3) 0%, rgba(255, 140, 0, 0.3) 100%)' // 橙色渐变
            : 'linear-gradient(135deg, rgba(255, 248, 220, 0.7) 0%, rgba(250, 235, 215, 0.7) 100%)';
        case 'calm':
          return isDarkMode
            ? 'linear-gradient(135deg, rgba(32, 178, 170, 0.3) 0%, rgba(0, 139, 139, 0.3) 100%)' // 青绿色渐变
            : 'linear-gradient(135deg, rgba(240, 255, 255, 0.7) 0%, rgba(224, 255, 255, 0.7) 100%)';
        default:
          break;
      }
    }
    
    // 根据主题和模式选择不同的渐变背景
    if (isDarkMode) {
      switch (theme) {
        case 'health':
          return 'linear-gradient(135deg, rgba(106, 90, 205, 0.3) 0%, rgba(147, 112, 219, 0.3) 100%)';
        case 'emotion':
          return 'linear-gradient(135deg, rgba(255, 105, 180, 0.3) 0%, rgba(147, 112, 219, 0.3) 100%)';
        case 'voice':
          return 'linear-gradient(135deg, rgba(106, 90, 205, 0.3) 0%, rgba(70, 130, 180, 0.3) 100%)';
        case 'spring':
          return 'linear-gradient(135deg, rgba(255, 192, 203, 0.3) 0%, rgba(221, 160, 221, 0.3) 100%)'; // 春天粉色渐变
        case 'summer':
          return 'linear-gradient(135deg, rgba(135, 206, 250, 0.3) 0%, rgba(0, 191, 255, 0.3) 100%)'; // 夏天蓝色渐变
        case 'autumn':
          return 'linear-gradient(135deg, rgba(210, 105, 30, 0.3) 0%, rgba(139, 69, 19, 0.3) 100%)'; // 秋天棕色渐变
        case 'winter':
          return 'linear-gradient(135deg, rgba(176, 224, 230, 0.3) 0%, rgba(70, 130, 180, 0.3) 100%)'; // 冬天蓝白渐变
        default:
          return 'linear-gradient(135deg, rgba(25, 25, 35, 0.7) 0%, rgba(45, 45, 65, 0.7) 100%)';
      }
    } else {
      switch (theme) {
        case 'health':
          return 'linear-gradient(135deg, rgba(240, 248, 255, 0.7) 0%, rgba(230, 230, 250, 0.7) 100%)';
        case 'emotion':
          return 'linear-gradient(135deg, rgba(255, 240, 245, 0.7) 0%, rgba(240, 248, 255, 0.7) 100%)';
        case 'voice':
          return 'linear-gradient(135deg, rgba(240, 248, 255, 0.7) 0%, rgba(230, 230, 250, 0.7) 100%)';
        case 'spring':
          return 'linear-gradient(135deg, rgba(255, 240, 245, 0.7) 0%, rgba(230, 230, 250, 0.7) 100%)'; // 春天浅粉色渐变
        case 'summer':
          return 'linear-gradient(135deg, rgba(240, 248, 255, 0.7) 0%, rgba(176, 226, 255, 0.7) 100%)'; // 夏天浅蓝色渐变
        case 'autumn':
          return 'linear-gradient(135deg, rgba(255, 228, 196, 0.7) 0%, rgba(255, 222, 173, 0.7) 100%)'; // 秋天浅棕色渐变
        case 'winter':
          return 'linear-gradient(135deg, rgba(240, 248, 255, 0.7) 0%, rgba(230, 230, 250, 0.7) 100%)'; // 冬天浅蓝白渐变
        default:
          return 'linear-gradient(135deg, rgba(248, 249, 250, 0.7) 0%, rgba(233, 236, 239, 0.7) 100%)';
      }
    }
  }};
  opacity: 0.9;
  background-size: 400% 400%;
  animation: gradientShift 15s ease infinite;
  
  @keyframes gradientShift {
    0% {
      background-position: 0% 50%;
    }
    50% {
      background-position: 100% 50%;
    }
    100% {
      background-position: 0% 50%;
    }
  }
`;

/**
 * 背景特效组件
 * 创建生动的动态背景，添加丰富的粒子效果、波浪和光晕
 */
const BackgroundEffect: React.FC<BackgroundEffectProps> = ({
  isDarkMode = false,
  particleCount = 100, // 增加默认粒子数量
  theme = 'default',
  enableWaves = true,
  enableHalo = true,
  interactionStrength = 1.0,
  emotionState = null,
  enableParallax = false,
  enableCelebration = false,
  enableAudio = false
}) => {
  // 创建canvas引用
  const canvasRef = useRef<HTMLCanvasElement>(null);
  // 存储粒子数组
  const [particles, setParticles] = useState<Particle[]>([]);
  // 存储鼠标位置
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  // 存储动画帧ID
  const animationFrameId = useRef<number>();
  // 存储画布尺寸
  const [canvasSize, setCanvasSize] = useState({ width: 0, height: 0 });

  // 检测设备类型，移动设备减少粒子数量
  const isMobile = window.innerWidth <= 768;
  const actualParticleCount = isMobile ? Math.floor(particleCount / 2) : particleCount;

  // 获取主题颜色
  const getThemeColors = () => {
    const baseColors = [
      'rgba(106, 90, 205, 0.8)', // --primary-color (紫色)
      'rgba(147, 112, 219, 0.8)', // --secondary-color (淡紫色)
      'rgba(255, 105, 180, 0.8)', // --accent-color (粉色)
    ];
    
    // 特殊粒子的鲜艳颜色
    const specialColors = [
      'rgba(255, 215, 0, 0.9)', // 金色
      'rgba(0, 191, 255, 0.9)', // 深天蓝
      'rgba(255, 69, 0, 0.9)', // 红橙色
      'rgba(50, 205, 50, 0.9)', // 酸橙绿
    ];

    // 根据情绪状态调整颜色
    if (emotionState) {
      switch (emotionState) {
        case 'happy':
          specialColors.push('rgba(255, 223, 0, 0.9)'); // 明亮的黄色
          break;
        case 'sad':
          specialColors.push('rgba(65, 105, 225, 0.9)'); // 蓝色
          break;
        case 'angry':
          specialColors.push('rgba(220, 20, 60, 0.9)'); // 深红色
          break;
        case 'anxious':
          specialColors.push('rgba(255, 165, 0, 0.9)'); // 橙色
          break;
        case 'calm':
          specialColors.push('rgba(32, 178, 170, 0.9)'); // 青绿色
          break;
      }
    }

    // 根据主题添加特定颜色
    let themeColors;
    switch (theme) {
      case 'health':
        themeColors = [...baseColors, 'rgba(144, 238, 144, 0.8)']; // 添加健康绿色
        break;
      case 'emotion':
        themeColors = [...baseColors, 'rgba(255, 182, 193, 0.8)']; // 添加情感粉色
        break;
      case 'voice':
        themeColors = [...baseColors, 'rgba(135, 206, 250, 0.8)']; // 添加声音蓝色
        break;
      case 'spring':
        themeColors = ['rgba(255, 192, 203, 0.8)', 'rgba(221, 160, 221, 0.8)', 'rgba(144, 238, 144, 0.8)']; // 春天粉色和嫩绿色
        break;
      case 'summer':
        themeColors = ['rgba(135, 206, 250, 0.8)', 'rgba(255, 165, 0, 0.8)', 'rgba(50, 205, 50, 0.8)']; // 夏天蓝色和橙色
        break;
      case 'autumn':
        themeColors = ['rgba(210, 105, 30, 0.8)', 'rgba(255, 140, 0, 0.8)', 'rgba(139, 69, 19, 0.8)']; // 秋天橙色和棕色
        break;
      case 'winter':
        themeColors = ['rgba(240, 248, 255, 0.8)', 'rgba(176, 224, 230, 0.8)', 'rgba(70, 130, 180, 0.8)']; // 冬天白色和蓝色
        break;
      default:
        themeColors = baseColors;
    }
    
    return { normal: themeColors, special: specialColors };
  };

  // 初始化粒子
  const initParticles = () => {
    if (!canvasRef.current) return;

    const canvas = canvasRef.current;
    const width = canvas.width;
    const height = canvas.height;
    const colors = getThemeColors();

    const newParticles: Particle[] = [];

    // 根据季节主题添加特殊效果
    const addSeasonalParticles = (count: number) => {
      const seasonalParticles: Particle[] = [];
      
      if (theme === 'spring') {
        // 春天樱花飘落效果 - 增强视觉效果
        for (let i = 0; i < count * 1.5; i++) { // 增加50%的粒子数量
          const size = Math.random() * 8 + 5; // 适当尺寸
          // 使用更多样化的粉色调
          const pinkColors = [
            'rgba(255, 192, 203, 0.9)', // 粉红
            'rgba(255, 182, 193, 0.9)', // 浅粉红
            'rgba(255, 228, 225, 0.9)', // 薄雾玫瑰
            'rgba(255, 240, 245, 0.9)'  // 淡紫红
          ];
          const colorIndex = Math.floor(Math.random() * pinkColors.length);
          
          seasonalParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size,
            speedX: Math.random() * 0.8 - 0.4, // 适当的左右摇摆幅度
            speedY: Math.random() * 0.3 + 0.1, // 向下飘落，速度适中
            color: pinkColors[colorIndex],
            opacity: Math.random() * 0.2 + 0.7, // 适当的不透明度
            type: 'special',
            rotation: Math.random() * 360,
            scale: Math.random() * 0.5 + 0.8 // 适当的缩放比例
          });
        }
      } else if (theme === 'winter') {
        // 冬天雪花效果 - 优化视觉效果
        for (let i = 0; i < count * 1.5; i++) { // 适当的粒子数量
          const size = Math.random() * 5 + 2; // 更合适的尺寸
          // 使用不同的白色调
          const snowColors = [
            'rgba(255, 255, 255, 0.9)', // 纯白
            'rgba(248, 248, 255, 0.9)', // 幽灵白
            'rgba(240, 248, 255, 0.9)', // 爱丽丝蓝
            'rgba(245, 245, 245, 0.9)'  // 白烟
          ];
          const colorIndex = Math.floor(Math.random() * snowColors.length);
          
          seasonalParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size,
            speedX: Math.random() * 0.5 - 0.25, // 适当的左右摇摆幅度
            speedY: Math.random() * 0.3 + 0.1, // 向下飘落，速度适中
            color: snowColors[colorIndex],
            opacity: Math.random() * 0.2 + 0.7, // 适当的不透明度
            type: 'special',
            rotation: Math.random() * 360,
            scale: Math.random() * 0.4 + 0.7 // 适当的缩放比例
          });
        }
      } else if (theme === 'autumn') {
        // 秋天落叶效果 - 优化视觉效果
        for (let i = 0; i < count * 1.3; i++) { // 适当的粒子数量
          const size = Math.random() * 7 + 4; // 更合适的尺寸
          const colorOptions = [
            'rgba(210, 105, 30, 0.85)', // 巧克力色
            'rgba(205, 133, 63, 0.85)', // 秘鲁色
            'rgba(139, 69, 19, 0.85)', // 马鞍棕色
            'rgba(160, 82, 45, 0.85)', // 赭色
            'rgba(255, 140, 0, 0.85)', // 深橙色
            'rgba(255, 69, 0, 0.85)',  // 红橙色
            'rgba(233, 150, 122, 0.85)' // 深鲑鱼色
          ];
          const colorIndex = Math.floor(Math.random() * colorOptions.length);
          
          seasonalParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size,
            speedX: Math.random() * 0.8 - 0.4, // 适当的左右摇摆幅度
            speedY: Math.random() * 0.4 + 0.15, // 向下飘落，速度适中
            color: colorOptions[colorIndex],
            opacity: Math.random() * 0.3 + 0.6, // 适当的不透明度
            type: 'special',
            rotation: Math.random() * 360,
            scale: Math.random() * 0.5 + 0.8 // 适当的缩放比例
          });
        }
      } else if (theme === 'summer') {
        // 夏天气泡效果 - 优化视觉效果
        for (let i = 0; i < count * 1.2; i++) { // 适当的粒子数量
          const size = Math.random() * 6 + 2; // 更合适的尺寸
          // 使用不同的蓝色调
          const bubbleColors = [
            'rgba(135, 206, 250, 0.75)', // 浅天蓝
            'rgba(173, 216, 230, 0.75)', // 浅蓝
            'rgba(176, 224, 230, 0.75)', // 粉蓝
            'rgba(175, 238, 238, 0.75)'  // 苍白的绿松石
          ];
          const colorIndex = Math.floor(Math.random() * bubbleColors.length);
          
          seasonalParticles.push({
            x: Math.random() * width,
            y: Math.random() * height,
            size,
            speedX: Math.random() * 0.4 - 0.2, // 适当的左右摇摆幅度
            speedY: Math.random() * -0.4 - 0.1, // 向上浮动，速度适中
            color: bubbleColors[colorIndex],
            opacity: Math.random() * 0.3 + 0.6, // 适当的不透明度
            type: 'special',
            rotation: 0,
            scale: Math.random() * 0.5 + 0.8 // 适当的缩放比例
          });
        }
      }
      
      return seasonalParticles;
    };
    
    // 添加季节性粒子 - 增加比例
    if (['spring', 'summer', 'autumn', 'winter'].includes(theme)) {
      const seasonalParticleCount = Math.floor(actualParticleCount * 0.6); // 60%的粒子是季节性的
      const regularParticleCount = actualParticleCount - seasonalParticleCount;
      
      // 添加季节性粒子
      newParticles.push(...addSeasonalParticles(seasonalParticleCount));
      
      // 减少常规粒子数量
      for (let i = 0; i < regularParticleCount; i++) {
        // 决定是否创建特殊粒子（约10%的概率）
        const isSpecial = Math.random() < 0.1;
        const particleType = isSpecial ? 'special' : 'normal';
        const colorArray = isSpecial ? colors.special : colors.normal;
        const colorIndex = Math.floor(Math.random() * colorArray.length);
        
        // 特殊粒子更大、更亮
        const size = isSpecial 
          ? Math.random() * 8 + 4 // 4-12px大小
          : Math.random() * 6 + 2; // 2-8px大小
        
        // 特殊粒子更高的透明度
        const opacity = isSpecial 
          ? Math.random() * 0.3 + 0.7 // 0.7-1.0的透明度
          : Math.random() * 0.4 + 0.4; // 0.4-0.8的透明度
        
        // 特殊粒子可能有旋转和缩放
        const rotation = isSpecial ? Math.random() * 360 : undefined;
        const scale = isSpecial ? Math.random() * 0.5 + 1 : undefined;
        
        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          speedX: Math.random() * 0.4 - 0.2, // 增加速度范围 -0.2到0.2
          speedY: Math.random() * 0.4 - 0.2,
          color: colorArray[colorIndex],
          opacity,
          type: particleType,
          rotation,
          scale
        });
      }
    } else {
      // 原始粒子生成逻辑
      for (let i = 0; i < actualParticleCount; i++) {
        // 决定是否创建特殊粒子（约10%的概率）
        const isSpecial = Math.random() < 0.1;
        const particleType = isSpecial ? 'special' : 'normal';
        const colorArray = isSpecial ? colors.special : colors.normal;
        const colorIndex = Math.floor(Math.random() * colorArray.length);
        
        // 特殊粒子更大、更亮
        const size = isSpecial 
          ? Math.random() * 8 + 4 // 4-12px大小
          : Math.random() * 6 + 2; // 2-8px大小
        
        // 特殊粒子更高的透明度
        const opacity = isSpecial 
          ? Math.random() * 0.3 + 0.7 // 0.7-1.0的透明度
          : Math.random() * 0.4 + 0.4; // 0.4-0.8的透明度
        
        // 特殊粒子可能有旋转和缩放
        const rotation = isSpecial ? Math.random() * 360 : undefined;
        const scale = isSpecial ? Math.random() * 0.5 + 1 : undefined;
        
        newParticles.push({
          x: Math.random() * width,
          y: Math.random() * height,
          size,
          speedX: Math.random() * 0.4 - 0.2, // 增加速度范围 -0.2到0.2
          speedY: Math.random() * 0.4 - 0.2,
          color: colorArray[colorIndex],
          opacity,
          type: particleType,
          rotation,
          scale
        });
      }
    }

    setParticles(newParticles);
  };

  // 处理窗口大小变化
  useEffect(() => {
    const handleResize = () => {
      if (canvasRef.current) {
        const canvas = canvasRef.current;
        // 设置canvas尺寸为窗口尺寸
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        setCanvasSize({ width: canvas.width, height: canvas.height });
      }
    };

    // 初始化尺寸
    handleResize();
    // 监听窗口大小变化
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // 初始化粒子
  useEffect(() => {
    if (canvasSize.width > 0 && canvasSize.height > 0) {
      initParticles();
    }
  }, [canvasSize, actualParticleCount, theme]);

  // 处理鼠标移动和触摸事件
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };
    
    const handleTouchMove = (e: TouchEvent) => {
      if (e.touches.length > 0) {
        setMousePosition({ x: e.touches[0].clientX, y: e.touches[0].clientY });
      }
    };

    // 添加音效反馈
    const playInteractionSound = () => {
      if (enableAudio) {
        const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
        const oscillator = audioContext.createOscillator();
        const gainNode = audioContext.createGain();
        
        // 根据主题或情绪设置不同的音调
        let frequency = 440; // 默认频率
        if (emotionState === 'happy') frequency = 523.25; // C5
        else if (emotionState === 'sad') frequency = 392.00; // G4
        else if (theme === 'spring') frequency = 466.16; // A#4/Bb4
        
        oscillator.type = 'sine';
        oscillator.frequency.value = frequency;
        gainNode.gain.value = 0.1; // 音量较小
        
        oscillator.connect(gainNode);
        gainNode.connect(audioContext.destination);
        
        oscillator.start();
        gainNode.gain.exponentialRampToValueAtTime(0.001, audioContext.currentTime + 0.5);
        oscillator.stop(audioContext.currentTime + 0.5);
      }
    };
    
    const handleInteraction = () => {
      playInteractionSound();
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('click', handleInteraction);
    window.addEventListener('touchstart', handleInteraction);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('touchmove', handleTouchMove);
      window.removeEventListener('click', handleInteraction);
      window.removeEventListener('touchstart', handleInteraction);
    };
  }, [enableAudio, emotionState, theme]);

  // 页面滚动视差效果
  useEffect(() => {
    if (!enableParallax) return;
    
    const handleScroll = () => {
      const scrollY = window.scrollY;
      // 根据滚动位置调整粒子位置，创建视差效果
      setParticles(prevParticles => 
        prevParticles.map(particle => ({
          ...particle,
          y: particle.y - (scrollY * 0.02 * (particle.type === 'special' ? 0.05 : 0.02))
        }))
      );
    };
    
    window.addEventListener('scroll', handleScroll);
    
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [enableParallax]);
  
  // 庆祝动画效果
  useEffect(() => {
    if (!enableCelebration) return;
    
    // 创建爆炸粒子效果
    const createCelebrationEffect = () => {
      const colors = getThemeColors();
      const newParticles: Particle[] = [];
      
      // 在屏幕中心创建爆炸效果
      const centerX = canvasSize.width / 2;
      const centerY = canvasSize.height / 2;
      
      for (let i = 0; i < 50; i++) {
        const angle = Math.random() * Math.PI * 2;
        const speed = Math.random() * 5 + 2;
        const size = Math.random() * 6 + 3;
        const colorIndex = Math.floor(Math.random() * colors.special.length);
        
        newParticles.push({
          x: centerX,
          y: centerY,
          size,
          speedX: Math.cos(angle) * speed,
          speedY: Math.sin(angle) * speed,
          color: colors.special[colorIndex],
          opacity: 1,
          type: 'special',
          rotation: Math.random() * 360,
          scale: Math.random() * 1 + 1
        });
      }
      
      // 将新粒子添加到现有粒子中
      setParticles(prev => [...prev, ...newParticles]);
      
      // 3秒后移除庆祝粒子
      setTimeout(() => {
        setParticles(prev => prev.slice(0, prev.length - newParticles.length));
      }, 3000);
    };
    
    createCelebrationEffect();
    
    // 每隔一段时间重复创建庆祝效果
    const intervalId = setInterval(createCelebrationEffect, 5000);
    
    return () => {
      clearInterval(intervalId);
    };
  }, [enableCelebration, canvasSize]);

  // 动画循环
  useEffect(() => {
    if (!canvasRef.current || particles.length === 0) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let lastTime = performance.now();
    const fps = 60;
    const frameInterval = 1000 / fps;

    const animate = () => {
      const currentTime = performance.now();
      const deltaTime = currentTime - lastTime;

      if (deltaTime >= frameInterval) {
        lastTime = currentTime - (deltaTime % frameInterval);
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // 更新并绘制每个粒子
        particles.forEach(particle => {
          // 移动粒子
          let { x, y, speedX, speedY, size, color, opacity, type, rotation, scale } = particle;

          // 计算与鼠标的距离
          const dx = mousePosition.x - x;
          const dy = mousePosition.y - y;
          const distance = Math.sqrt(dx * dx + dy * dy);

          // 如果鼠标靠近，增强交互效果
          if (distance < 150) { // 增加交互范围
            const angle = Math.atan2(dy, dx);
            // 使用交互强度参数增强效果
            const force = (150 - distance) / (1000 / interactionStrength);
            
            if (type === 'special') {
              // 特殊粒子对鼠标有更强的反应
              speedX += Math.cos(angle) * force * 2;
              speedY += Math.sin(angle) * force * 2;
              // 特殊粒子在鼠标附近时闪烁
              opacity = Math.min(1, opacity + Math.sin(currentTime * 0.01) * 0.2);
            } else {
              speedX += Math.cos(angle) * force;
              speedY += Math.sin(angle) * force;
            }
          }

          // 更新位置
          x += speedX;
          y += speedY;

          // 边界检查 - 改进边界处理逻辑，防止粒子卡住
          if (x < 0) {
            x = 0;
            speedX = Math.abs(speedX) * (0.8 + Math.random() * 0.4);
          } else if (x > canvas.width) {
            x = canvas.width;
            speedX = -Math.abs(speedX) * (0.8 + Math.random() * 0.4);
          }
          
          if (y < 0) {
            y = 0;
            speedY = Math.abs(speedY) * (0.8 + Math.random() * 0.4);
          } else if (y > canvas.height) {
            y = canvas.height;
            speedY = -Math.abs(speedY) * (0.8 + Math.random() * 0.4);
          }

          // 保存当前绘图状态
          ctx.save();
          
          // 特殊粒子的绘制
          if (type === 'special') {
            // 应用旋转和缩放
            ctx.translate(x, y);
            if (rotation !== undefined) {
              // 随时间缓慢旋转
              const currentRotation = rotation + (currentTime * 0.01 % 360);
              ctx.rotate(currentRotation * Math.PI / 180);
            }
            if (scale !== undefined) {
              // 随时间缓慢缩放
              const currentScale = scale + Math.sin(currentTime * 0.002) * 0.2;
              ctx.scale(currentScale, currentScale);
            }
            
            // 绘制特殊形状（如星形或多边形）
            const specialShapes = Math.floor(Math.random() * 3);
            if (specialShapes === 0) {
              // 绘制星形
              const spikes = 5;
              const outerRadius = size;
              const innerRadius = size / 2;
              
              ctx.beginPath();
              for (let i = 0; i < spikes * 2; i++) {
                const radius = i % 2 === 0 ? outerRadius : innerRadius;
                const angle = (Math.PI * i) / spikes;
                const xPos = radius * Math.cos(angle);
                const yPos = radius * Math.sin(angle);
                
                if (i === 0) {
                  ctx.moveTo(xPos, yPos);
                } else {
                  ctx.lineTo(xPos, yPos);
                }
              }
              ctx.closePath();
            } else if (specialShapes === 1) {
              // 绘制六边形
              ctx.beginPath();
              for (let i = 0; i < 6; i++) {
                const angle = (Math.PI * 2 * i) / 6;
                const xPos = size * Math.cos(angle);
                const yPos = size * Math.sin(angle);
                if (i === 0) ctx.moveTo(xPos, yPos);
                else ctx.lineTo(xPos, yPos);
              }
              ctx.closePath();
            } else {
              // 绘制圆形但添加发光效果
              ctx.beginPath();
              ctx.arc(0, 0, size, 0, Math.PI * 2);
              ctx.shadowBlur = 15;
              ctx.shadowColor = color;
            }
            
            ctx.fillStyle = color.replace(/[^,]+(?=\))/, opacity.toString());
            ctx.fill();
            
            // 添加光晕效果
            ctx.beginPath();
            ctx.arc(0, 0, size * 1.5, 0, Math.PI * 2);
            const gradient = ctx.createRadialGradient(0, 0, size, 0, 0, size * 1.5);
            gradient.addColorStop(0, color.replace(/[^,]+(?=\))/, (opacity * 0.5).toString()));
            gradient.addColorStop(1, color.replace(/[^,]+(?=\))/, '0'));
            ctx.fillStyle = gradient;
            ctx.fill();
          } else {
            // 普通粒子绘制
            ctx.beginPath();
            ctx.arc(x, y, size, 0, Math.PI * 2);
            ctx.fillStyle = color.replace(/[^,]+(?=\))/, opacity.toString());
            ctx.fill();
          }
          
          // 恢复绘图状态
          ctx.restore();

          // 更新粒子状态
          particle.x = x;
          particle.y = y;
          particle.speedX = speedX;
          particle.speedY = speedY;
          particle.opacity = opacity;

          // 如果粒子速度接近于0，给它一个小的随机速度
          if (Math.abs(speedX) < 0.05 && Math.abs(speedY) < 0.05) {
            particle.speedX = (Math.random() * 0.4 - 0.2) * (type === 'special' ? 1.5 : 1);
            particle.speedY = (Math.random() * 0.4 - 0.2) * (type === 'special' ? 1.5 : 1);
          }
        });
      }

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [particles.length, mousePosition, interactionStrength]); // 只依赖粒子数量而不是整个particles数组

  // 渲染季节特效元素
  const renderSeasonalEffects = () => {
    if (theme === 'spring') {
      // 春天樱花效果 - 增加数量和大小
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: -20,
                rotate: 0,
                scale: 1
              }}
              animate={{ 
                y: `${100 + Math.random() * 20}%`,
                rotate: 360,
                x: `${Math.random() * 100}%`,
                scale: [1, 1.1, 0.9, 1]
              }}
              transition={{ 
                duration: 12 + Math.random() * 8,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 5,
                scale: {
                  duration: 3,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
              style={{
                position: 'absolute',
                width: `${15 + Math.random() * 20}px`,
                height: `${15 + Math.random() * 20}px`,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%23FFB7C5' d='M50 0 C 60 30 70 30 100 50 C 70 70 60 70 50 100 C 40 70 30 70 0 50 C 30 30 40 30 50 0'/%3E%3C/svg%3E")`,
                backgroundSize: 'contain',
                opacity: 0.9,
                filter: 'drop-shadow(0 0 3px rgba(255,183,197,0.7))'
              }}
            />
          ))}
        </motion.div>
      );
    } else if (theme === 'winter') {
      // 冬天雪花效果 - 增加数量和大小
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: -20,
                rotate: 0,
                scale: 1
              }}
              animate={{ 
                y: `${100 + Math.random() * 20}%`,
                rotate: 360,
                x: `${(Math.random() * 100) + (Math.sin(Date.now() * 0.001) * 10)}%`,
                scale: [1, 1.2, 0.8, 1]
              }}
              transition={{ 
                duration: 8 + Math.random() * 12,
                repeat: Infinity,
                ease: 'linear',
                delay: Math.random() * 5,
                scale: {
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }
              }}
              style={{
                position: 'absolute',
                width: `${8 + Math.random() * 15}px`,
                height: `${8 + Math.random() * 15}px`,
                backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='%23FFFFFF' d='M50 0 L 54 45 L 100 50 L 54 55 L 50 100 L 46 55 L 0 50 L 46 45 Z'/%3E%3C/svg%3E")`,
                backgroundSize: 'contain',
                opacity: 0.95,
                filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.8))'
              }}
            />
          ))}
        </motion.div>
      );
    } else if (theme === 'autumn') {
      // 秋天落叶效果 - 新增
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          {Array.from({ length: 25 }).map((_, i) => {
            // 随机选择落叶颜色
            const colors = ['%23D2691E', '%23CD853F', '%238B4513', '%23A0522D', '%23FF8C00'];
            const color = colors[Math.floor(Math.random() * colors.length)];
            return (
              <motion.div
                key={i}
                initial={{ 
                  x: `${Math.random() * 100}%`, 
                  y: -20,
                  rotate: 0,
                  rotateX: 0,
                  rotateY: 0
                }}
                animate={{ 
                  y: `${100 + Math.random() * 20}%`,
                  rotate: 360 * (Math.random() > 0.5 ? 1 : -1),
                  x: `${Math.random() * 100}%`,
                  rotateX: [0, 45, 0, -45, 0],
                  rotateY: [0, 45, 0, -45, 0]
                }}
                transition={{ 
                  duration: 15 + Math.random() * 10,
                  repeat: Infinity,
                  ease: 'easeInOut',
                  delay: Math.random() * 5,
                  rotateX: {
                    duration: 5,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  },
                  rotateY: {
                    duration: 4,
                    repeat: Infinity,
                    ease: 'easeInOut'
                  }
                }}
                style={{
                  position: 'absolute',
                  width: `${15 + Math.random() * 20}px`,
                  height: `${15 + Math.random() * 20}px`,
                  backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='${color}' d='M50 0 C 60 10 80 20 85 40 C 90 60 80 80 50 100 C 20 80 10 60 15 40 C 20 20 40 10 50 0'/%3E%3C/svg%3E")`,
                  backgroundSize: 'contain',
                  opacity: 0.9,
                  filter: 'drop-shadow(0 0 3px rgba(139,69,19,0.5))'
                }}
              />
            );
          })}
        </motion.div>
      );
    } else if (theme === 'summer') {
      // 夏天气泡效果 - 新增
      return (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            pointerEvents: 'none',
            zIndex: 1
          }}
        >
          {Array.from({ length: 30 }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ 
                x: `${Math.random() * 100}%`, 
                y: `${100 + Math.random() * 20}%`,
                scale: 0.5
              }}
              animate={{ 
                y: `-${20 + Math.random() * 10}%`,
                x: `${Math.random() * 100}%`,
                scale: [0.5, 1, 1.2, 1, 0.8, 0.5]
              }}
              transition={{ 
                duration: 10 + Math.random() * 15,
                repeat: Infinity,
                ease: 'easeInOut',
                delay: Math.random() * 5
              }}
              style={{
                position: 'absolute',
                width: `${10 + Math.random() * 15}px`,
                height: `${10 + Math.random() * 15}px`,
                borderRadius: '50%',
                background: 'radial-gradient(circle at 30% 30%, rgba(255,255,255,0.8), rgba(135,206,250,0.6))',
                boxShadow: '0 0 10px rgba(135,206,250,0.5)',
                opacity: 0.9,
                filter: 'drop-shadow(0 0 5px rgba(135,206,250,0.7))'
              }}
            />
          ))}
        </motion.div>
      );
    }
    return null;
  };

  // 渲染波浪效果
  const renderWaves = () => {
    if (!enableWaves) return null;
    
    return (
      <WaveContainer>
        <Wave $delay={0} $opacity={0.3} isDarkMode={isDarkMode} theme={theme} />
        <Wave $delay={-5} $opacity={0.2} isDarkMode={isDarkMode} theme={theme} />
        <Wave $delay={-10} $opacity={0.1} isDarkMode={isDarkMode} theme={theme} />
      </WaveContainer>
    );
  };

  return (
    <EffectContainer>
      <GradientOverlay isDarkMode={isDarkMode} theme={theme} emotionState={emotionState} />
      <Canvas ref={canvasRef} />
      {renderSeasonalEffects()}
      {renderWaves()}
    </EffectContainer>
  );
};

export default BackgroundEffect;