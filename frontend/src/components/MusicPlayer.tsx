import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const PlayerContainer = styled.div`
  background: white;
  border-radius: 16px;
  padding: 2rem;
  box-shadow: var(--card-shadow);
  margin-bottom: 2rem;
  transition: transform 0.3s, box-shadow 0.3s;
  position: relative;
  overflow: hidden;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;

const AlbumArt = styled.div`
  width: 200px;
  height: 200px;
  border-radius: 10px;
  overflow: hidden;
  margin: 0 auto 2rem;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  position: relative;
`;

const AlbumImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: block;
  transition: transform 0.5s;
  
  &:hover {
    transform: scale(1.05);
  }
`;

const SongInfo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const SongTitle = styled.h2`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 0.5rem;
`;

const Artist = styled.p`
  color: #666;
  font-size: 1rem;
`;

const Controls = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;

const ControlButton = styled(motion.button)`
  background: none;
  border: none;
  cursor: pointer;
  color: var(--primary-color);
  font-size: 1.5rem;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  border-radius: 50%;
  transition: all 0.3s;
  
  &:hover {
    background-color: rgba(106, 90, 205, 0.1);
  }
  
  &:disabled {
    color: #ccc;
    cursor: not-allowed;
  }
`;

const PlayButton = styled(ControlButton)`
  background-color: var(--primary-color);
  color: white;
  width: 60px;
  height: 60px;
  
  &:hover {
    background-color: var(--secondary-color);
    transform: scale(1.1);
  }
`;

const ProgressContainer = styled.div`
  width: 100%;
  margin-bottom: 1rem;
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 6px;
  background-color: #f0f0f0;
  border-radius: 3px;
  cursor: pointer;
  position: relative;
`;

const Progress = styled.div<{ $width: string }>`
  height: 100%;
  width: ${props => props.$width};
  background: linear-gradient(90deg, var(--primary-color), var(--secondary-color));
  border-radius: 3px;
  position: relative;
  transition: width 0.1s linear;
  
  &::after {
    content: '';
    position: absolute;
    right: 0;
    top: 50%;
    transform: translate(50%, -50%);
    width: 12px;
    height: 12px;
    background-color: var(--primary-color);
    border-radius: 50%;
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.2);
  }
`;

const TimeInfo = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 0.875rem;
  color: #666;
  margin-top: 0.5rem;
`;

const VolumeContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: 1rem;
`;

const VolumeIcon = styled.div`
  color: var(--primary-color);
  font-size: 1.2rem;
`;

const VolumeSlider = styled.input`
  -webkit-appearance: none;
  width: 100%;
  height: 4px;
  border-radius: 2px;
  background: #f0f0f0;
  outline: none;
  
  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
  }
  
  &::-moz-range-thumb {
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--primary-color);
    cursor: pointer;
    border: none;
  }
`;

const WaveformContainer = styled.div`
  height: 60px;
  width: 100%;
  margin: 1rem 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const WaveformBar = styled(motion.div)<{ $height: number }>`
  width: 3px;
  height: ${props => props.$height}px;
  background: linear-gradient(to top, var(--primary-color), var(--secondary-color));
  margin: 0 2px;
  border-radius: 3px;
`;

// 添加音符组件
const MusicNote = styled(motion.div)`
  position: absolute;
  font-size: 1.5rem;
  color: var(--primary-color);
  opacity: 0.8;
  z-index: 1;
  user-select: none;
  pointer-events: none;
`;

// 添加音符字符数组
const musicNotes = ['♪', '♫', '♬', '♩', '♭', '♮'];

// 音乐播放器图标组件
const PlayIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M8 5V19L19 12L8 5Z" fill="currentColor" />
  </svg>
);

const PauseIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 19H10V5H6V19ZM14 5V19H18V5H14Z" fill="currentColor" />
  </svg>
);

const PrevIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6 6H8V18H6V6ZM9.5 12L18 18V6L9.5 12Z" fill="currentColor" />
  </svg>
);

const NextIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M16 18H18V6H16V18ZM6 6L14.5 12L6 18V6Z" fill="currentColor" />
  </svg>
);

const VolumeIconSvg = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 9V15H7L12 20V4L7 9H3ZM16.5 12C16.5 10.23 15.48 8.71 14 7.97V16.02C15.48 15.29 16.5 13.77 16.5 12ZM14 3.23V5.29C18.01 6.15 19 8.83 19 12C19 15.17 16.89 17.85 14 18.71V20.77C18.01 19.86 21 16.28 21 12C21 7.72 18.01 4.14 14 3.23Z" fill="currentColor" />
  </svg>
);

interface Song {
  id: string;
  title: string;
  artist: string;
  albumArt: string;
  audioUrl: string;
  duration: number;
  emotion?: string;
  mood?: string;
}

interface MusicPlayerProps {
  song: Song | null;
  isPlaying: boolean;
  onPlayPause: () => void;
  onNext: () => void;
  onPrev: () => void;
  volume: number;
  onVolumeChange: (volume: number) => void;
}

const MusicPlayer: React.FC<MusicPlayerProps> = ({
  song,
  isPlaying,
  onPlayPause,
  onNext,
  onPrev,
  volume,
  onVolumeChange
}) => {
  const [progress, setProgress] = useState<number>(0);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const [notes, setNotes] = useState<Array<{id: number, x: number, y: number, note: string}>>([]);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const progressIntervalRef = useRef<number | null>(null);
  const playerContainerRef = useRef<HTMLDivElement>(null);
  
  // 处理音频播放和暂停
  useEffect(() => {
    if (!audioRef.current) {
      audioRef.current = new Audio();
      audioRef.current.volume = volume;
    }
    
    if (song) {
      audioRef.current.src = song.audioUrl;
      
      if (isPlaying) {
        audioRef.current.play().catch(error => {
          console.error('播放失败:', error);
        });
        
        // 设置进度更新定时器
        progressIntervalRef.current = window.setInterval(() => {
          if (audioRef.current) {
            const currentTime = audioRef.current.currentTime;
            const duration = audioRef.current.duration || song.duration;
            setCurrentTime(currentTime);
            setProgress((currentTime / duration) * 100);
          }
        }, 1000);
      } else {
        audioRef.current.pause();
        
        // 清除进度更新定时器
        if (progressIntervalRef.current) {
          clearInterval(progressIntervalRef.current);
          progressIntervalRef.current = null;
        }
      }
    }
    
    // 清理函数
    return () => {
      if (progressIntervalRef.current) {
        clearInterval(progressIntervalRef.current);
      }
    };
  }, [song, isPlaying, volume]);
  
  // 处理音量变化
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);
  
  // 生成漂浮音符
  useEffect(() => {
    if (!isPlaying) {
      setNotes([]);
      return;
    }
    
    const interval = setInterval(() => {
      if (playerContainerRef.current) {
        const containerWidth = playerContainerRef.current.offsetWidth;
        const x = Math.random() * containerWidth;
        const y = playerContainerRef.current.offsetHeight;
        const noteIndex = Math.floor(Math.random() * musicNotes.length);
        
        setNotes(prev => [
          ...prev, 
          {
            id: Date.now(),
            x,
            y,
            note: musicNotes[noteIndex]
          }
        ]);
        
        // 限制音符数量，避免性能问题
        if (notes.length > 15) {
          setNotes(prev => prev.slice(1));
        }
      }
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isPlaying, notes.length]);
  
  // 格式化时间
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  // 处理进度条点击
  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !song) return;
    
    const progressBar = e.currentTarget;
    const rect = progressBar.getBoundingClientRect();
    const clickPosition = (e.clientX - rect.left) / rect.width;
    
    const duration = audioRef.current.duration || song.duration;
    const newTime = clickPosition * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
    setProgress(clickPosition * 100);
  };
  
  // 生成随机波形数据
  const generateWaveform = () => {
    return Array.from({ length: 40 }).map(() => {
      const baseHeight = isPlaying ? 20 : 5;
      const randomFactor = Math.random() * (isPlaying ? 15 : 3);
      return baseHeight + randomFactor;
    });
  }
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 20 : 5;
    const randomFactor = Math.random() * (isPlaying ? 15 : 3);
    return baseHeight + randomFactor;
  });
  
  return Array.from({ length: 40 }).map(() => {
    const baseHeight = isPlaying ? 2