import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import api from '../utils/api';
import { Howl, Howler } from 'howler';

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

const UploadContainer = styled.div`
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

const UploadArea = styled.div`
  border: 2px dashed #ddd;
  border-radius: 12px;
  padding: 3rem 2rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  margin-bottom: 2rem;
  
  &:hover {
    border-color: var(--primary-color);
    background-color: rgba(106, 90, 205, 0.05);
  }
`;

const UploadIcon = styled.div`
  margin-bottom: 1rem;
  color: var(--primary-color);
  font-size: 2.5rem;
`;

const UploadText = styled.p`
  color: #666;
  margin-bottom: 0.5rem;
`;

const UploadSubText = styled.p`
  color: #999;
  font-size: 0.875rem;
`;

const FileInput = styled.input`
  display: none;
`;

const ProgressContainer = styled.div`
  margin-top: 1.5rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background-color: #f0f0f0;
  border-radius: 4px;
  overflow: hidden;
  margin-bottom: 0.5rem;
`;

const Progress = styled.div<{ $width: string }>`
  height: 100%;
  width: ${props => props.$width};
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 4px;
  transition: width 0.3s ease;
`;

const ProgressText = styled.p`
  color: #666;
  font-size: 0.875rem;
  text-align: right;
`;

const WaveformContainer = styled.div`
  height: 100px;
  width: 100%;
  margin: 2rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #f9f9f9;
  border-radius: 8px;
  overflow: hidden;
  position: relative;
`;

const WaveformBar = styled(motion.div)<{ $height: number }>`
  width: 3px;
  height: ${props => props.$height}px;
  background: linear-gradient(to top, var(--primary-color), var(--secondary-color));
  margin: 0 2px;
  border-radius: 3px;
`;

const TemplateContainer = styled.div`
  margin-top: 2rem;
`;

const TemplateTitle = styled.h3`
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const TemplateGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
  gap: 1rem;
  margin-bottom: 2rem;
`;

const TemplateCard = styled.div<{ $isActive: boolean }>`
  background: ${props => props.$isActive ? 'rgba(106, 90, 205, 0.1)' : 'white'};
  border: 2px solid ${props => props.$isActive ? 'var(--primary-color)' : '#eee'};
  border-radius: 12px;
  padding: 1rem;
  text-align: center;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-3px);
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    border-color: var(--primary-color);
  }
`;

const TemplateIcon = styled.div`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background-color: #f0f0f0;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto 0.5rem;
  overflow: hidden;
`;

const TemplateImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const TemplateName = styled.p`
  font-weight: 500;
  color: #333;
  margin: 0;
`;

const EmotionContainer = styled.div`
  margin-top: 2rem;
`;

const EmotionTitle = styled.h3`
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
`;

const EmotionTags = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 0.75rem;
  margin-bottom: 2rem;
`;

const EmotionTag = styled.button<{ $isActive: boolean }>`
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  background-color: ${props => props.$isActive ? 'var(--primary-color)' : '#f0f0f0'};
  color: ${props => props.$isActive ? 'white' : '#666'};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.$isActive ? 'var(--primary-color)' : '#e8e8e8'};
  }
`;

const ResultContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: var(--card-shadow);
  margin-top: 3rem;
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const ResultTitle = styled.h3`
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1.5rem;
  text-align: center;
`;

const AudioPlayerContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
  margin-bottom: 2rem;
`;

const AudioPlayer = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  padding: 1rem;
  background-color: #f9f9f9;
  border-radius: 12px;
`;

const AudioLabel = styled.div`
  font-weight: 600;
  color: #555;
  min-width: 80px;
`;

const AudioControls = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const PlayButton = styled(motion.button)`
  background-color: var(--primary-color);
  color: white;
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  
  &:hover {
    background-color: var(--secondary-color);
  }
  
  &:disabled {
    background-color: #ccc;
    cursor: not-allowed;
  }
`;

const AudioProgressBar = styled.div`
  flex: 1;
  height: 4px;
  background-color: #ddd;
  border-radius: 2px;
  position: relative;
  cursor: pointer;
`;

const AudioProgress = styled.div<{ $width: string }>`
  height: 100%;
  width: ${props => props.$width};
  background-color: var(--primary-color);
  border-radius: 2px;
  position: relative;
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
    width: 10px;
    height: 10px;
    background-color: var(--primary-color);
    border-radius: 50%;
  }
`;

const TimeInfo = styled.div`
  font-size: 0.75rem;
  color: #666;
  min-width: 70px;
  text-align: right;
`;

const CompareContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-top: 2rem;
`;

const CompareTitle = styled.h4`
  font-size: 1.1rem;
  color: var(--primary-color);
  margin-bottom: 0.5rem;
`;

const CompareText = styled.p`
  color: #666;
  margin-bottom: 1rem;
`;

// 增强小熊动画效果
const BearAnimation = styled(motion.div)`
  width: 200px;
  height: 200px;
  margin: 2rem auto;
  position: relative;
  
  /* 添加呼吸效果 */
  animation: breathe 3s infinite ease-in-out;
  
  @keyframes breathe {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
`;

const BearFace = styled(motion.div)`
  width: 120px;
  height: 120px;
  background-color: #b08968;
  border-radius: 60% 60% 50% 50%;
  position: relative;
  margin: 0 auto;
`;

const BearEar = styled(motion.div)`
  width: 40px;
  height: 40px;
  background-color: #b08968;
  border-radius: 50%;
  position: absolute;
  top: -15px;
`;

const BearEarLeft = styled(BearEar)`
  left: 15px;
`;

const BearEarRight = styled(BearEar)`
  right: 15px;
`;

const BearEye = styled(motion.div)`
  width: 15px;
  height: 15px;
  background-color: #333;
  border-radius: 50%;
  position: absolute;
  top: 40px;
`;

const BearEyeLeft = styled(BearEye)`
  left: 30px;
`;

const BearEyeRight = styled(BearEye)`
  right: 30px;
`;

const BearNose = styled(motion.div)`
  width: 25px;
  height: 15px;
  background-color: #333;
  border-radius: 50%;
  position: absolute;
  top: 60px;
  left: 50%;
  transform: translateX(-50%);
`;

const BearMouth = styled(motion.div)<{ $isOpen: boolean }>`
  width: 40px;
  height: ${props => props.$isOpen ? '20px' : '5px'};
  background-color: ${props => props.$isOpen ? '#ff9999' : '#333'};
  border-radius: ${props => props.$isOpen ? '0 0 20px 20px' : '5px'};
  position: absolute;
  top: 80px;
  left: 50%;
  transform: translateX(-50%);
  overflow: hidden;
  transition: all 0.3s;
  transform-origin: center;
  
  /* 添加舌头元素 */
  &::after {
    content: '';
    display: ${props => props.$isOpen ? 'block' : 'none'};
    width: 20px;
    height: 10px;
    background-color: #ff6666;
    border-radius: 10px;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
  }
`;

const GenerateButton = styled(motion.button)`
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
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
  }
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

// 图标组件
const UploadIconSvg = () => (
  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M19.35 10.04C18.67 6.59 15.64 4 12 4C9.11 4 6.6 5.64 5.35 8.04C2.34 8.36 0 10.91 0 14C0 17.31 2.69 20 6 20H19C21.76 20 24 17.76 24 15C24 12.36 21.95 10.22 19.35 10.04ZM19 18H6C3.79 18 2 16.21 2 14C2 11.95 3.53 10.24 5.56 10.03L6.63 9.92L7.13 8.97C8.08 7.14 9.94 6 12 6C14.62 6 16.88 7.86 17.39 10.43L17.69 11.93L19.22 12.04C20.78 12.14 22 13.45 22 15C22 16.65 20.65 18 19 18ZM8 13H10.55V16H13.45V13H16L12 9L8 13Z" fill="currentColor"/>
  </svg>
);

const PlayIconSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
  </svg>
);

const PauseIconSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" fill="currentColor" />
  </svg>
);

interface Template {
  id: string;
  name: string;
  image: string;
}

interface AudioFile {
  name: string;
  url: string;
  duration: number;
}

interface VoiceTemplate {
  id: string;
  name: string;
  description: string;
  audioUrl: string;
}

const VoiceClonePage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState<number>(0);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [selectedTemplate, setSelectedTemplate] = useState<string>('dad');
  const [selectedEmotion, setSelectedEmotion] = useState<string>('comfort');
  const [originalAudio, setOriginalAudio] = useState<AudioFile | null>(null);
  const [clonedAudio, setClonedAudio] = useState<AudioFile | null>(null);
  const [isGenerating, setIsGenerating] = useState<boolean>(false);
  const [isMouthOpen, setIsMouthOpen] = useState<boolean>(false);
  const [isPlayingOriginal, setIsPlayingOriginal] = useState<boolean>(false);
  const [isPlayingCloned, setIsPlayingCloned] = useState<boolean>(false);
  const [originalProgress, setOriginalProgress] = useState<number>(0);
  const [clonedProgress, setClonedProgress] = useState<number>(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const originalIntervalRef = useRef<number | null>(null);
  const clonedIntervalRef = useRef<number | null>(null);
  const originalSoundRef = useRef<Howl | null>(null);
  const clonedSoundRef = useRef<Howl | null>(null);
  const lastMouthUpdateRef = useRef<number>(0);
  
  // 家庭成员角色模板数据
  const templates: Template[] = [
    { id: 'grandpa', name: '爷爷', image: '/images/avatars/grandpa.svg' },
    { id: 'grandma', name: '奶奶', image: '/images/avatars/grandma.svg' },
    { id: 'dad', name: '爸爸', image: '/images/avatars/dad.svg' },
    { id: 'mom', name: '妈妈', image: '/images/avatars/mom.svg' },
    { id: 'brother', name: '哥哥', image: '/images/avatars/brother.svg' },
    { id: 'sister', name: '姐姐', image: '/images/avatars/sister.svg' },
    { id: 'uncle', name: '叔叔', image: '/images/avatars/uncle.svg' },
    { id: 'aunt', name: '阿姨', image: '/images/avatars/aunt.svg' },
  ];
  
  // 家庭成员声音模板数据
  const voiceTemplates: VoiceTemplate[] = [
    { 
      id: 'grandpa', 
      name: '爷爷', 
      description: '温和慈祥的声音，适合讲故事和传授经验', 
      audioUrl: '/audio/dad_sample.mp3' // 暂时使用爸爸的声音样本
    },
    { 
      id: 'grandma', 
      name: '奶奶', 
      description: '温暖亲切的声音，适合表达关爱和安慰', 
      audioUrl: '/audio/dad_sample.mp3' // 暂时使用爸爸的声音样本
    },
    { 
      id: 'dad', 
      name: '爸爸', 
      description: '稳重有力的声音，适合鼓励和指导', 
      audioUrl: '/audio/dad_sample.mp3' 
    },
    { 
      id: 'mom', 
      name: '妈妈', 
      description: '温柔体贴的声音，适合安慰和关怀', 
      audioUrl: '/audio/dad_sample.mp3' // 暂时使用爸爸的声音样本
    },
    { 
      id: 'brother', 
      name: '哥哥', 
      description: '活力四射的声音，适合鼓励和陪伴', 
      audioUrl: '/audio/dad_sample.mp3' // 暂时使用爸爸的声音样本
    },
    { 
      id: 'sister', 
      name: '姐姐', 
      description: '温柔耐心的声音，适合指导和关心', 
      audioUrl: '/audio/dad_sample.mp3' // 暂时使用爸爸的声音样本
    },
    { 
      id: 'uncle', 
      name: '叔叔', 
      description: '亲切幽默的声音，适合讲故事和教导', 
      audioUrl: '/audio/dad_sample.mp3' // 暂时使用爸爸的声音样本
    },
    { 
      id: 'aunt', 
      name: '阿姨', 
      description: '和蔼可亲的声音，适合关怀和鼓励', 
      audioUrl: '/audio/dad_sample.mp3' // 暂时使用爸爸的声音样本
    },
  ];
  
  // 情感标签
  const emotions = [
    { id: 'comfort', label: '安慰' },
    { id: 'encourage', label: '鼓励' },
    { id: 'praise', label: '表扬' },
    { id: 'teach', label: '教导' },
    { id: 'story', label: '讲故事' },
  ];
  
  // 处理文件选择
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setSelectedFile(file);
      
      // 模拟上传过程
      handleUpload(file);
    }
  };
  
  // 处理上传区域点击
  const handleUploadAreaClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };
  
  // 处理文件上传
  const handleUpload = async (file: File) => {
    setIsUploading(true);
    setUploadProgress(0);
    
    // 模拟上传进度
    const interval = setInterval(() => {
      setUploadProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        return prev + 10;
      });
    }, 300);
    
    // 模拟上传完成
    setTimeout(() => {
      clearInterval(interval);
      setUploadProgress(100);
      setIsUploading(false);
      
      // 创建音频URL
      const audioUrl = URL.createObjectURL(file);
      
      // 检查文件类型
      const isVideoFile = file.type.startsWith('video/');
      
      if (isVideoFile) {
        // 对于视频文件，直接设置originalAudio状态，使用默认时长
        console.log('视频文件已上传:', file.name);
        setOriginalAudio({
          name: file.name,
          url: audioUrl,
          duration: 30 // 设置默认时长为30秒
        });
      } else {
        // 使用Howler获取音频时长
        const tempSound = new Howl({
          src: [audioUrl],
          html5: true,
          onload: () => {
            setOriginalAudio({
              name: file.name,
              url: audioUrl,
              duration: tempSound.duration()
            });
          },
          onloaderror: () => {
            console.error('音频加载失败:', file.name);
            // 即使加载失败，也设置originalAudio状态，使用默认时长
            setOriginalAudio({
              name: file.name,
              url: audioUrl,
              duration: 30 // 设置默认时长为30秒
            });
          }
        });
        
        // 添加超时处理，确保即使Howler回调没有触发，也能设置originalAudio状态
        setTimeout(() => {
          if (!originalAudio) {
            console.log('Howler回调超时，使用默认设置');
            setOriginalAudio({
              name: file.name,
              url: audioUrl,
              duration: 30 // 设置默认时长为30秒
            });
          }
        }, 2000);
      }
    }, 3000);
  };
  
  // 生成随机波形数据
  const generateWaveform = () => {
    return Array.from({ length: 50 }).map(() => {
      const baseHeight = 10;
      const randomFactor = Math.random() * 50;
      return baseHeight + randomFactor;
    });
  };
  
  // 处理音频播放和暂停 - 原始音频
  useEffect(() => {
    if (!originalAudio) return;
    
    // 使用Howler.js创建音频对象
    if (!originalSoundRef.current) {
      originalSoundRef.current = new Howl({
        src: [originalAudio.url],
        html5: true,
        onplay: () => {
          setIsPlayingOriginal(true);
        },
        onpause: () => {
          setIsPlayingOriginal(false);
        },
        onend: () => {
          setIsPlayingOriginal(false);
        },
        onstop: () => {
          setIsPlayingOriginal(false);
        }
      });
    }
    
    if (isPlayingOriginal) {
      originalSoundRef.current.play();
      
      // 设置进度更新定时器
      originalIntervalRef.current = window.setInterval(() => {
        if (originalSoundRef.current) {
          const currentTime = originalSoundRef.current.seek() as number;
          const duration = originalSoundRef.current.duration();
          setOriginalProgress((currentTime / duration) * 100);
        }
      }, 100);
    } else {
      originalSoundRef.current.pause();
      
      // 清除进度更新定时器
      if (originalIntervalRef.current) {
        clearInterval(originalIntervalRef.current);
        originalIntervalRef.current = null;
      }
    }
    
    // 清理函数
    return () => {
      if (originalIntervalRef.current) {
        clearInterval(originalIntervalRef.current);
      }
    };
  }, [originalAudio, isPlayingOriginal]);
  
  // 处理音频播放和暂停 - 克隆音频
  useEffect(() => {
    if (!clonedAudio) return;
    
    // 使用Howler.js创建音频对象
    if (!clonedSoundRef.current) {
      clonedSoundRef.current = new Howl({
        src: [clonedAudio.url],
        html5: true,
        preload: true,
        format: ['mp3'],
        buffer: true, // 启用音频缓冲
        onload: () => {
          console.log('克隆音频加载完成');
        },
        onplay: () => {
          setIsPlayingCloned(true);
          setIsMouthOpen(true);
          console.log('开始播放克隆音频');
        },
        onpause: () => {
          setIsPlayingCloned(false);
          setIsMouthOpen(false);
          console.log('暂停播放克隆音频');
        },
        onend: () => {
          setIsPlayingCloned(false);
          setIsMouthOpen(false);
          console.log('克隆音频播放结束');
        },
        onstop: () => {
          setIsPlayingCloned(false);
          setIsMouthOpen(false);
          console.log('停止播放克隆音频');
        },
        onseek: () => {
          if (clonedSoundRef.current && clonedSoundRef.current.playing()) {
            setIsMouthOpen(true);
          }
        }
      });
    }
    
    if (isPlayingCloned) {
      clonedSoundRef.current.play();
      
      // 设置进度更新定时器
      clonedIntervalRef.current = window.setInterval(() => {
        if (clonedSoundRef.current) {
          const currentTime = clonedSoundRef.current.seek() as number;
          const duration = clonedSoundRef.current.duration();
          setClonedProgress((currentTime / duration) * 100);
          
          // 根据音频播放状态控制嘴巴动画
          if (clonedSoundRef.current.playing()) {
            // 使用更自然的动画频率
            const now = Date.now();
            if (now - (lastMouthUpdateRef.current || 0) > 100) {
              const shouldOpen = Math.random() > 0.4;
              setIsMouthOpen(shouldOpen);
              lastMouthUpdateRef.current = now;
            }
          }
        }
      }, 50); // 提高更新频率以获得更流畅的动画
    } else {
      clonedSoundRef.current.pause();
      
      // 清除进度更新定时器
      if (clonedIntervalRef.current) {
        clearInterval(clonedIntervalRef.current);
        clonedIntervalRef.current = null;
      }
    }
    
    // 清理函数
    return () => {
      if (clonedIntervalRef.current) {
        clearInterval(clonedIntervalRef.current);
      }
    };
  }, [clonedAudio, isPlayingCloned]);
  
  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // 处理生成克隆声音
  const handleGenerateVoice = async () => {
    if (!originalAudio) return;
    
    setIsGenerating(true);
    
    try {
      // 创建FormData对象用于文件上传
      const formData = new FormData();
      formData.append('audio', selectedFile);
      formData.append('template', selectedTemplate);
      formData.append('emotion', selectedEmotion);
      
      // 使用本地示例音频（无需后端）
      const useMockResponse = true; // 设置为true以使用本地示例音频
      
      if (useMockResponse) {
        // 模拟API响应延迟
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // 使用本地示例音频 - 确保使用完整的URL路径
        const sampleAudioPath = '/audio/dad_sample.mp3';
        console.log('使用本地示例音频:', sampleAudioPath);
        
        // 设置克隆音频状态
        setClonedAudio({
          name: '爸爸声音示例',
          url: sampleAudioPath,
          duration: 30 // 默认时长
        });
        
        // 创建新的Howl实例播放克隆后的声音
        if (clonedSoundRef.current) {
          clonedSoundRef.current.unload(); // 卸载之前的音频
        }
        
        clonedSoundRef.current = new Howl({
          src: [sampleAudioPath],
          html5: true,
          preload: true,
          format: ['mp3'],
          loop: false, // 确保不循环播放
          autoplay: false, // 不自动播放，等待用户点击
          volume: 1.0, // 设置音量为最大
          onload: () => {
            console.log('音频加载成功');
            // 确保音频完全加载后再允许播放
            setIsGenerating(false);
          },
          onplay: () => {
            console.log('开始播放克隆音频');
            setIsPlayingCloned(true);
            setIsMouthOpen(true);
          },
          onpause: () => {
            console.log('暂停播放克隆音频');
            setIsPlayingCloned(false);
            setIsMouthOpen(false);
          },
          onloaderror: (id, error) => {
            console.error('音频加载失败:', error);
            alert('音频加载失败，请刷新页面重试');
            // 即使加载失败，也重置播放状态
            setIsPlayingCloned(false);
            setIsMouthOpen(false);
          },
          onplayerror: (id, error) => {
            console.error('音频播放失败:', error);
            setIsPlayingCloned(false);
            setIsMouthOpen(false);
            alert('音频播放失败，请重试');
          },
          onend: () => {
            console.log('克隆音频播放结束');
            setIsPlayingCloned(false);
            setIsMouthOpen(false);
            if (clonedIntervalRef.current) {
              clearInterval(clonedIntervalRef.current);
              clonedIntervalRef.current = null;
            }
          },
          onstop: () => {
            console.log('停止播放克隆音频');
            setIsPlayingCloned(false);
            setIsMouthOpen(false);
          },
          onseek: () => {
            if (clonedSoundRef.current && clonedSoundRef.current.playing()) {
              setIsMouthOpen(true);
            }
          }
        });
      } else {
        // 调用后端API
        const response = await api.post('/voice/clone', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          },
          onUploadProgress: (progressEvent) => {
            const percentCompleted = Math.round((progressEvent.loaded * 100) / progressEvent.total);
            setUploadProgress(percentCompleted);
          }
        });
        
        // 处理API响应
        if (response.data.success) {
          const { name, url, duration, template, emotion } = response.data.data;
          
          // 构建完整的URL
          const fullUrl = url.startsWith('http') ? url : `${window.location.origin}${url}`;
          
          console.log('克隆声音URL:', fullUrl);
          
          // 使用后端返回的音频URL
          setClonedAudio({
            name,
            url: fullUrl, // 使用完整的URL
            duration: duration || originalAudio.duration
          });
          
          // 创建新的Howl实例播放克隆后的声音
          if (clonedSoundRef.current) {
            clonedSoundRef.current.unload(); // 卸载之前的音频
          }
          
          clonedSoundRef.current = new Howl({
            src: [fullUrl],
            html5: true,
            preload: true,
            format: ['mp3'],
            loop: false,
            autoplay: false,
            volume: 1.0,
            onload: () => {
              console.log('音频加载成功');
              // 音频加载成功后立即播放
              clonedSoundRef.current?.play();
              setIsPlayingCloned(true);
              setIsMouthOpen(true);
            },
            onplay: () => {
              console.log('开始播放克隆音频');
              setIsPlayingCloned(true);
              setIsMouthOpen(true);
            },
            onpause: () => {
              console.log('暂停播放克隆音频');
              setIsPlayingCloned(false);
              setIsMouthOpen(false);
            },
            onloaderror: (id, error) => {
              console.error('音频加载失败:', error);
              setIsPlayingCloned(false);
              setIsMouthOpen(false);
            },
            onplayerror: (id, error) => {
              console.error('音频播放失败:', error);
              setIsPlayingCloned(false);
              setIsMouthOpen(false);
            },
            onend: () => {
              console.log('克隆音频播放结束');
              setIsPlayingCloned(false);
              setIsMouthOpen(false);
              if (clonedIntervalRef.current) {
                clearInterval(clonedIntervalRef.current);
                clonedIntervalRef.current = null;
              }
            },
            onstop: () => {
              console.log('停止播放克隆音频');
              setIsPlayingCloned(false);
              setIsMouthOpen(false);
            },
            onseek: () => {
              if (clonedSoundRef.current && clonedSoundRef.current.playing()) {
                setIsMouthOpen(true);
              }
            }
          });
        } else {
          throw new Error(response.data.message || '生成克隆声音失败');
        }
      }
    } catch (error) {
      console.error('生成克隆声音失败:', error);
      alert('生成克隆声音失败，请稍后再试');
    } finally {
      setIsGenerating(false);
    }
  };
  
  return (
    <PageContainer>
      <Title>声音克隆</Title>
      <Description>
        上传音频，AI声纹克隆，让小熊用家人的声音说话
      </Description>
      
      <UploadContainer>
        <UploadArea onClick={handleUploadAreaClick}>
          <UploadIcon>
            <UploadIconSvg />
          </UploadIcon>
          {selectedFile ? (
            <>
              <UploadText>已上传: {selectedFile.name}</UploadText>
              <UploadSubText>点击重新上传</UploadSubText>
            </>
          ) : (
            <>
              <UploadText>点击上传音频或视频文件或拖拽文件到此处</UploadText>
              <UploadSubText>支持 MP3, WAV, M4A, MP4, AVI 格式，最大 10MB</UploadSubText>
            </>
          )}
          <FileInput 
            type="file" 
            ref={fileInputRef} 
            accept="audio/*,video/*" 
            onChange={handleFileSelect} 
          />
        </UploadArea>
        
        {isUploading && (
          <ProgressContainer>
            <ProgressBar>
              <Progress $width={`${uploadProgress}%`} />
            </ProgressBar>
            <ProgressText>{uploadProgress}% 已上传</ProgressText>
          </ProgressContainer>
        )}
        
        {originalAudio && (
          <WaveformContainer>
            {generateWaveform().map((height, index) => (
              <WaveformBar
                key={index}
                $height={height}
                animate={{
                  height: isPlayingOriginal ? [height - 10, height, height - 10] : height,
                  opacity: isPlayingOriginal ? [0.7, 1, 0.7] : 0.7
                }}
                transition={{
                  repeat: isPlayingOriginal ? Infinity : 0,
                  duration: isPlayingOriginal ? 0.8 + Math.random() * 0.5 : 0,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </WaveformContainer>
        )}
        
        <TemplateContainer>
          <TemplateTitle>选择角色模板</TemplateTitle>
          <TemplateGrid>
            {templates.map(template => (
              <TemplateCard
                key={template.id}
                $isActive={selectedTemplate === template.id}
                onClick={() => setSelectedTemplate(template.id)}
              >
                <TemplateIcon>
                  <TemplateImage src={template.image} alt={template.name} />
                </TemplateIcon>
                <TemplateName>{template.name}</TemplateName>
              </TemplateCard>
            ))}
          </TemplateGrid>
        </TemplateContainer>
        
        <EmotionContainer>
          <EmotionTitle>选择情感语调</EmotionTitle>
          <EmotionTags>
            {emotions.map(emotion => (
              <EmotionTag
                key={emotion.id}
                $isActive={selectedEmotion === emotion.id}
                onClick={() => setSelectedEmotion(emotion.id)}
              >
                {emotion.label}
              </EmotionTag>
            ))}
          </EmotionTags>
        </EmotionContainer>
        
        <GenerateButton
          onClick={handleGenerateVoice}
          disabled={!originalAudio}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {isGenerating ? 'AI声音克隆中...' : '生成克隆声音'}
        </GenerateButton>
      </UploadContainer>
      
      {isGenerating && (
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
          <LoadingText>AI正在克隆声音...</LoadingText>
        </LoadingContainer>
      )}
      
      {clonedAudio && (
        <ResultContainer>
          <ResultTitle>声音克隆结果</ResultTitle>
          
          <BearAnimation>
            <BearFace>
              <BearEarLeft />
              <BearEarRight />
              <BearEyeLeft />
              <BearEyeRight />
              <BearNose />
              <BearMouth 
                $isOpen={isMouthOpen}
                animate={isMouthOpen ? {
                  height: [15, 20, 15, 20],
                  scaleX: [1, 1.1, 1, 1.1]
                } : {}}
                transition={{
                  repeat: Infinity,
                  duration: 0.5,
                  ease: "easeInOut"
                }}
              />
            </BearFace>
          </BearAnimation>
          
          <AudioPlayerContainer>
            <AudioPlayer>
              <AudioLabel>原始音频</AudioLabel>
              <AudioControls>
                <PlayButton
                  onClick={() => setIsPlayingOriginal(!isPlayingOriginal)}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlayingOriginal ? <PauseIconSvg /> : <PlayIconSvg />}
                </PlayButton>
                <AudioProgressBar onClick={(e) => {
                  if (!originalSoundRef.current || !originalAudio) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  originalSoundRef.current.seek(pos * originalAudio.duration);
                  setOriginalProgress(pos * 100);
                }}>
                  <AudioProgress $width={`${originalProgress}%`} />
                </AudioProgressBar>
                <TimeInfo>
                  {originalAudio ? formatTime(originalSoundRef.current?.seek() || 0) : '0:00'} / 
                  {originalAudio ? formatTime(originalAudio.duration) : '0:00'}
                </TimeInfo>
              </AudioControls>
            </AudioPlayer>
            
            <AudioPlayer>
              <AudioLabel>克隆音频</AudioLabel>
              <AudioControls>
                <PlayButton
                  onClick={() => {
                    if (isPlayingCloned) {
                      // 暂停播放
                      clonedSoundRef.current?.pause();
                      setIsPlayingCloned(false);
                      setIsMouthOpen(false);
                    } else {
                      // 开始播放
                      if (clonedSoundRef.current) {
                        // 确保音频已加载并准备好播放
                        if (!clonedSoundRef.current.playing()) {
                          console.log('开始播放克隆音频');
                          // 如果音频已经结束，重置到开始位置
                          if (clonedSoundRef.current.state() === 'loaded') {
                            clonedSoundRef.current.seek(0);
                          }
                          clonedSoundRef.current.play();
                          setIsPlayingCloned(true);
                          setIsMouthOpen(true);
                        }
                      }
                    }
                  }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  {isPlayingCloned ? <PauseIconSvg /> : <PlayIconSvg />}
                </PlayButton>
                <AudioProgressBar onClick={(e) => {
                  if (!clonedSoundRef.current || !clonedAudio) return;
                  const rect = e.currentTarget.getBoundingClientRect();
                  const pos = (e.clientX - rect.left) / rect.width;
                  clonedSoundRef.current.seek(pos * clonedAudio.duration);
                  setClonedProgress(pos * 100);
                }}>
                  <AudioProgress $width={`${clonedProgress}%`} />
                </AudioProgressBar>
                <TimeInfo>
                  {clonedAudio ? formatTime(clonedSoundRef.current?.seek() || 0) : '0:00'} / 
                  {clonedAudio ? formatTime(clonedAudio.duration) : '0:00'}
                </TimeInfo>
              </AudioControls>
            </AudioPlayer>
          </AudioPlayerContainer>
          
          <CompareContainer>
            <CompareTitle>声音对比</CompareTitle>
            <CompareText>
              通过AI声纹克隆技术，我们成功将您的声音转换为{templates.find(t => t.id === selectedTemplate)?.name}的声音，
              并赋予了{emotions.find(e => e.id === selectedEmotion)?.label}的情感语调。
              您可以通过上方的播放器对比原始声音和克隆后的声音。
            </CompareText>
          </CompareContainer>
        </ResultContainer>
      )}
    </PageContainer>
  );
};

export default VoiceClonePage;