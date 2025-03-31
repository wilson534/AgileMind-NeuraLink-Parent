import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import { useState, useRef } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import HealthChart from '../components/HealthChart';
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
const SectionTitle = styled.h2 `
  font-size: 1.5rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  font-weight: 600;
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
const FormSection = styled.div `
  margin-bottom: 2rem;
`;
const MealSection = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 1.5rem;
`;
const MealCard = styled.div `
  background: #f9f9f9;
  border-radius: 12px;
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;
const MealTitle = styled.h3 `
  font-size: 1.2rem;
  color: var(--primary-color);
  margin: 0;
`;
const ImageUploadContainer = styled.div `
  width: 100%;
  height: 150px;
  border: 2px dashed #ccc;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  position: relative;
  transition: all 0.3s ease;
  
  &:hover {
    border-color: var(--primary-color);
  }
`;
const UploadedImage = styled.img `
  width: 100%;
  height: 100%;
  object-fit: cover;
  opacity: 0;
  transition: opacity 0.5s ease-in;
  
  &.visible {
    opacity: 1;
  }
`;
const UploadIcon = styled.div `
  color: #999;
  font-size: 2rem;
  position: absolute;
`;
const TextArea = styled.textarea `
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  resize: vertical;
  min-height: 80px;
  font-family: inherit;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;
const InputGroup = styled.div `
  margin-bottom: 1.5rem;
`;
const Label = styled.label `
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
  color: #555;
`;
const Select = styled.select `
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  background-color: white;
  font-family: inherit;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;
const Input = styled.input `
  width: 100%;
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  font-family: inherit;
  transition: border-color 0.3s;
  
  &:focus {
    outline: none;
    border-color: var(--primary-color);
  }
`;
const TimeInputContainer = styled.div `
  display: flex;
  gap: 1rem;
  align-items: center;
`;
const GenerateButton = styled(motion.button) `
  background: linear-gradient(135deg, #E066FF, #9370DB);
  color: white;
  border: none;
  border-radius: 30px;
  padding: 1rem 2.5rem;
  font-size: 1.1rem;
  font-weight: 600;
  cursor: pointer;
  display: block;
  margin: 2rem auto 0;
  box-shadow: 0 4px 15px rgba(224, 102, 255, 0.3);
  transition: all 0.3s ease;
  
  &:hover {
    box-shadow: 0 6px 20px rgba(224, 102, 255, 0.4);
    transform: translateY(-2px);
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  &:disabled {
    opacity: 0.7;
    cursor: not-allowed;
    background: linear-gradient(135deg, #B19CD9, #9F9FED);
    box-shadow: none;
    transform: none;
  }
`;
const ButtonLoadingSpinner = styled.div `
  display: inline-block;
  width: 20px;
  height: 20px;
  margin-left: 10px;
  border: 3px solid rgba(255, 255, 255, 0.3);
  border-radius: 50%;
  border-top-color: white;
  animation: spin 1s ease-in-out infinite;
  vertical-align: middle;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;
const AdviceContainer = styled.div `
  background: white;
  border-radius: 12px;
  padding: 20px;
  margin: 20px 0;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  position: relative;
  overflow: hidden;
`;
const AdviceHeader = styled.div `
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
  padding-bottom: 15px;
`;
const AdviceTitle = styled.h2 `
  color: var(--primary-color);
  font-size: 1.5rem;
  margin: 0;
`;
const AdviceTypeSelector = styled.div `
  display: flex;
  gap: 10px;
`;
const AdviceTypeButton = styled.button `
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: ${props => props.isActive ? 'var(--primary-color)' : '#f0f0f0'};
  color: ${props => props.isActive ? 'white' : '#666'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${props => props.isActive ? '600' : '400'};
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;
const AdviceSection = styled.div `
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  background: ${props => props.theme === 'diet' ? 'rgba(255, 182, 193, 0.1)' :
    props.theme === 'exercise' ? 'rgba(152, 251, 152, 0.1)' :
        'rgba(135, 206, 235, 0.1)'};
`;
const AdviceSectionTitle = styled.h3 `
  color: ${props => props.theme === 'diet' ? '#FF69B4' :
    props.theme === 'exercise' ? '#3CB371' :
        '#4682B4'};
  font-size: 1.2rem;
  margin: 0 0 10px 0;
  display: flex;
  align-items: center;
  gap: 8px;
`;
const AdviceContent = styled.div `
  font-size: 1rem;
  line-height: 1.6;
  color: #333;
  
  p {
    margin: 8px 0;
  }
  
  ul {
    margin: 8px 0;
    padding-left: 20px;
  }
  
  li {
    margin: 4px 0;
  }
`;
const HighlightedText = styled.span `
  background: linear-gradient(120deg, rgba(106, 90, 205, 0.2), rgba(106, 90, 205, 0.1));
  color: var(--primary-color);
  font-weight: 600;
  padding: 0 0.3rem;
  border-radius: 4px;
`;
const ScanningLight = styled(motion.div) `
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 4px;
  background: linear-gradient(90deg, transparent, var(--primary-color), transparent);
  opacity: 0.6;
`;
// 上传图标组件
const UploadIconSvg = () => (_jsx("svg", { width: "32", height: "32", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: _jsx("path", { d: "M19 13V19H5V13H3V19C3 20.1 3.9 21 5 21H19C20.1 21 21 20.1 21 19V13H19ZM13 13V7H16L12 3L8 7H11V13H13Z", fill: "currentColor" }) }));
// 运动类型选项
const exerciseTypes = [
    { value: '', label: '请选择运动类型' },
    { value: 'running', label: '跑步' },
    { value: 'walking', label: '走路' },
    { value: 'swimming', label: '游泳' },
    { value: 'cycling', label: '骑行' },
    { value: 'jumping', label: '跳绳' },
    { value: 'ball_games', label: '球类运动' },
    { value: 'dancing', label: '舞蹈' },
    { value: 'yoga', label: '瑜伽' },
    { value: 'other', label: '其他' },
];
const ChartSection = styled.div `
  margin-top: 2rem;
  margin-bottom: 2rem;
`;
// 添加图标组件
const DietIcon = () => (_jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", children: _jsx("path", { d: "M11 9H9V2H7v7H5V2H3v7c0 2.12 1.66 3.84 3.75 3.97V22h2.5v-9.03C11.34 12.84 13 11.12 13 9V2h-2v7zm5-3v8h2.5v8H21V2c-2.76 0-5 2.24-5 4z" }) }));
const ExerciseIcon = () => (_jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", children: _jsx("path", { d: "M13.49 5.48c1.1 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2zm-3.6 13.9l1-4.4 2.1 2v6h2v-7.5l-2.1-2 .6-3c1.3 1.5 3.3 2.5 5.5 2.5v-2c-1.9 0-3.5-1-4.3-2.4l-1-1.6c-.4-.6-1-1-1.7-1-.3 0-.5.1-.8.1l-5.2 2.2v4.7h2v-3.4l1.8-.7-1.6 8.1-4.9-1-.4 2 7 1.4z" }) }));
const SleepIcon = () => (_jsx("svg", { width: "20", height: "20", viewBox: "0 0 24 24", fill: "currentColor", children: _jsx("path", { d: "M12.34 2.02C6.59 1.82 2 6.42 2 12c0 5.52 4.48 10 10 10 3.71 0 6.93-2.02 8.66-5.02-7.51-.25-12.09-8.43-8.32-14.96z" }) }));
const HealthManagerPage = () => {
    // 引用
    const fileInputRefs = {
        breakfast: useRef(null),
        lunch: useRef(null),
        dinner: useRef(null),
    };
    // 状态
    const [healthData, setHealthData] = useState({
        meals: {
            breakfast: { image: null, imagePreview: '', description: '' },
            lunch: { image: null, imagePreview: '', description: '' },
            dinner: { image: null, imagePreview: '', description: '' },
        },
        exercise: {
            type: '',
            duration: '',
            description: '',
        },
        sleep: {
            startTime: '22:00',
            endTime: '07:00',
            totalHours: '9',
        },
    });
    const [isGenerating, setIsGenerating] = useState(false);
    const [adviceType, setAdviceType] = useState('regular');
    const [regularAdvice, setRegularAdvice] = useState('');
    const [aiAdvice, setAiAdvice] = useState('');
    const [showScanningEffect, setShowScanningEffect] = useState(false);
    const [error, setError] = useState(null);
    // 处理图片上传
    const handleImageUpload = (meal, e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onloadend = () => {
                setHealthData(prev => ({
                    ...prev,
                    meals: {
                        ...prev.meals,
                        [meal]: {
                            ...prev.meals[meal],
                            image: file,
                            imagePreview: reader.result,
                        },
                    },
                }));
            };
            reader.readAsDataURL(file);
        }
    };
    // 处理文本描述变化
    const handleDescriptionChange = (meal, value) => {
        setHealthData(prev => ({
            ...prev,
            meals: {
                ...prev.meals,
                [meal]: {
                    ...prev.meals[meal],
                    description: value,
                },
            },
        }));
    };
    // 处理运动信息变化
    const handleExerciseChange = (field, value) => {
        setHealthData(prev => ({
            ...prev,
            exercise: {
                ...prev.exercise,
                [field]: value,
            },
        }));
    };
    // 处理睡眠信息变化
    const handleSleepChange = (field, value) => {
        setHealthData(prev => ({
            ...prev,
            sleep: {
                ...prev.sleep,
                [field]: value,
            },
        }));
    };
    // 计算睡眠总时长
    const calculateSleepHours = () => {
        const { startTime, endTime } = healthData.sleep;
        if (startTime && endTime) {
            const start = new Date(`2023-01-01T${startTime}:00`);
            let end = new Date(`2023-01-01T${endTime}:00`);
            // 如果结束时间小于开始时间，说明跨天了
            if (end < start) {
                end = new Date(`2023-01-02T${endTime}:00`);
            }
            const diffMs = end.getTime() - start.getTime();
            const diffHours = diffMs / (1000 * 60 * 60);
            setHealthData(prev => ({
                ...prev,
                sleep: {
                    ...prev.sleep,
                    totalHours: diffHours.toFixed(1),
                },
            }));
        }
    };
    const generateHealthAdvice = async () => {
        setIsGenerating(true);
        setShowScanningEffect(true);
        setRegularAdvice('');
        setAiAdvice('');
        setError(null);
        try {
            const formData = new FormData();
            // 添加三餐信息
            Object.entries(healthData.meals).forEach(([meal, data]) => {
                if (data.image) {
                    formData.append(`${meal}Image`, data.image);
                }
                formData.append(`${meal}Description`, data.description);
            });
            // 添加运动信息
            formData.append('exerciseType', healthData.exercise.type);
            formData.append('exerciseDuration', healthData.exercise.duration);
            formData.append('exerciseDescription', healthData.exercise.description);
            // 添加睡眠信息
            formData.append('sleepStartTime', healthData.sleep.startTime);
            formData.append('sleepEndTime', healthData.sleep.endTime);
            formData.append('sleepTotalHours', healthData.sleep.totalHours);
            // 获取常规建议
            const regularResponse = await axios.post('/api/health/check', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            // 获取AI建议
            const aiResponse = await axios.post('/api/health/gpt-advice', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            if (regularResponse.data.status === 'success') {
                setRegularAdvice(regularResponse.data.data.advice);
            }
            if (aiResponse.data.status === 'success') {
                setAiAdvice(aiResponse.data.data.advice);
            }
        }
        catch (error) {
            console.error('生成健康建议失败:', error);
            setError(error.response?.data?.message || '生成建议时出错');
        }
        finally {
            setIsGenerating(false);
            setTimeout(() => {
                setShowScanningEffect(false);
            }, 2000);
        }
    };
    // 高亮关键词
    const highlightKeywords = (text) => {
        // 使用正则表达式匹配<关键词>格式的文本
        return text.split(/(<[^>]+>)/).map((part, index) => {
            if (part.startsWith('<') && part.endsWith('>')) {
                // 提取关键词（去掉尖括号）
                const keyword = part.substring(1, part.length - 1);
                return _jsx(HighlightedText, { children: keyword }, index);
            }
            return part;
        });
    };
    return (_jsxs(PageContainer, { children: [_jsx(Title, { children: "\u5065\u5EB7\u7BA1\u7406" }), _jsx(Description, { children: "\u8BB0\u5F55\u60A8\u5B69\u5B50\u7684\u65E5\u5E38\u996E\u98DF\u3001\u8FD0\u52A8\u548C\u7761\u7720\u60C5\u51B5\uFF0C\u83B7\u53D6\u4E13\u4E1A\u7684\u5065\u5EB7\u5EFA\u8BAE" }), _jsx(FormContainer, { children: _jsxs("form", { onSubmit: (e) => e.preventDefault(), children: [_jsxs(FormSection, { children: [_jsx(SectionTitle, { children: "\u4E09\u9910\u8BB0\u5F55" }), _jsxs(MealSection, { children: [_jsxs(MealCard, { children: [_jsx(MealTitle, { children: "\u65E9\u9910" }), _jsxs(ImageUploadContainer, { onClick: () => fileInputRefs.breakfast.current?.click(), children: [_jsx("input", { type: "file", ref: fileInputRefs.breakfast, style: { display: 'none' }, accept: "image/*", onChange: (e) => handleImageUpload('breakfast', e) }), healthData.meals.breakfast.imagePreview ? (_jsx(UploadedImage, { src: healthData.meals.breakfast.imagePreview, alt: "\u65E9\u9910", className: healthData.meals.breakfast.imagePreview ? 'visible' : '' })) : (_jsx(UploadIcon, { children: _jsx(UploadIconSvg, {}) }))] }), _jsx(TextArea, { placeholder: "\u63CF\u8FF0\u65E9\u9910\u5185\u5BB9\uFF0C\u5982\uFF1A\u725B\u5976\u3001\u9762\u5305\u3001\u9E21\u86CB\u7B49", value: healthData.meals.breakfast.description, onChange: (e) => handleDescriptionChange('breakfast', e.target.value) })] }), _jsxs(MealCard, { children: [_jsx(MealTitle, { children: "\u5348\u9910" }), _jsxs(ImageUploadContainer, { onClick: () => fileInputRefs.lunch.current?.click(), children: [_jsx("input", { type: "file", ref: fileInputRefs.lunch, style: { display: 'none' }, accept: "image/*", onChange: (e) => handleImageUpload('lunch', e) }), healthData.meals.lunch.imagePreview ? (_jsx(UploadedImage, { src: healthData.meals.lunch.imagePreview, alt: "\u5348\u9910", className: healthData.meals.lunch.imagePreview ? 'visible' : '' })) : (_jsx(UploadIcon, { children: _jsx(UploadIconSvg, {}) }))] }), _jsx(TextArea, { placeholder: "\u63CF\u8FF0\u5348\u9910\u5185\u5BB9\uFF0C\u5982\uFF1A\u7C73\u996D\u3001\u852C\u83DC\u3001\u8089\u7C7B\u7B49", value: healthData.meals.lunch.description, onChange: (e) => handleDescriptionChange('lunch', e.target.value) })] }), _jsxs(MealCard, { children: [_jsx(MealTitle, { children: "\u665A\u9910" }), _jsxs(ImageUploadContainer, { onClick: () => fileInputRefs.dinner.current?.click(), children: [_jsx("input", { type: "file", ref: fileInputRefs.dinner, style: { display: 'none' }, accept: "image/*", onChange: (e) => handleImageUpload('dinner', e) }), healthData.meals.dinner.imagePreview ? (_jsx(UploadedImage, { src: healthData.meals.dinner.imagePreview, alt: "\u665A\u9910", className: healthData.meals.dinner.imagePreview ? 'visible' : '' })) : (_jsx(UploadIcon, { children: _jsx(UploadIconSvg, {}) }))] }), _jsx(TextArea, { placeholder: "\u63CF\u8FF0\u665A\u9910\u5185\u5BB9\uFF0C\u5982\uFF1A\u9762\u6761\u3001\u6C34\u679C\u3001\u6C64\u7B49", value: healthData.meals.dinner.description, onChange: (e) => handleDescriptionChange('dinner', e.target.value) })] })] })] }), _jsxs(FormSection, { children: [_jsx(SectionTitle, { children: "\u8FD0\u52A8\u60C5\u51B5" }), _jsxs(InputGroup, { children: [_jsx(Label, { children: "\u8FD0\u52A8\u7C7B\u578B" }), _jsx(Select, { value: healthData.exercise.type, onChange: (e) => handleExerciseChange('type', e.target.value), children: exerciseTypes.map((type) => (_jsx("option", { value: type.value, children: type.label }, type.value))) })] }), _jsxs(InputGroup, { children: [_jsx(Label, { children: "\u8FD0\u52A8\u65F6\u957F\uFF08\u5206\u949F\uFF09" }), _jsx(Input, { type: "number", placeholder: "\u4F8B\u5982\uFF1A30", value: healthData.exercise.duration, onChange: (e) => handleExerciseChange('duration', e.target.value) })] }), _jsxs(InputGroup, { children: [_jsx(Label, { children: "\u8865\u5145\u63CF\u8FF0\uFF08\u53EF\u9009\uFF09" }), _jsx(TextArea, { placeholder: "\u8865\u5145\u63CF\u8FF0\u8FD0\u52A8\u60C5\u51B5\uFF0C\u5982\uFF1A\u5728\u516C\u56ED\u8DD1\u6B65\u3001\u53C2\u52A0\u4E86\u5B66\u6821\u7684\u7BEE\u7403\u8BFE\u7B49", value: healthData.exercise.description, onChange: (e) => handleExerciseChange('description', e.target.value) })] })] }), _jsxs(FormSection, { children: [_jsx(SectionTitle, { children: "\u7761\u7720\u60C5\u51B5" }), _jsxs(InputGroup, { children: [_jsx(Label, { children: "\u7761\u7720\u65F6\u95F4\u6BB5" }), _jsxs(TimeInputContainer, { children: [_jsx(Input, { type: "time", value: healthData.sleep.startTime, onChange: (e) => handleSleepChange('startTime', e.target.value), onBlur: calculateSleepHours }), _jsx("span", { children: "\u81F3" }), _jsx(Input, { type: "time", value: healthData.sleep.endTime, onChange: (e) => handleSleepChange('endTime', e.target.value), onBlur: calculateSleepHours })] })] }), _jsxs(InputGroup, { children: [_jsx(Label, { children: "\u603B\u7761\u7720\u65F6\u957F\uFF08\u5C0F\u65F6\uFF09" }), _jsx(Input, { type: "number", step: "0.1", placeholder: "\u4F8B\u5982\uFF1A9", value: healthData.sleep.totalHours, onChange: (e) => handleSleepChange('totalHours', e.target.value) })] })] }), _jsx(GenerateButton, { onClick: generateHealthAdvice, disabled: isGenerating, whileHover: { scale: 1.02 }, whileTap: { scale: 0.98 }, children: isGenerating ? (_jsxs(_Fragment, { children: ["\u751F\u6210\u4E2D", _jsx(ButtonLoadingSpinner, {})] })) : ('生成健康建议') })] }) }), (regularAdvice || aiAdvice) && (_jsxs(AdviceContainer, { children: [showScanningEffect && (_jsx(ScanningLight, { animate: {
                            y: ['0%', '100%', '0%'],
                        }, transition: {
                            repeat: Infinity,
                            duration: 2,
                            ease: 'linear',
                        } })), _jsxs(AdviceHeader, { children: [_jsx(AdviceTitle, { children: "\u5065\u5EB7\u5EFA\u8BAE" }), _jsxs(AdviceTypeSelector, { children: [_jsx(AdviceTypeButton, { isActive: adviceType === 'regular', onClick: () => setAdviceType('regular'), children: "\u5E38\u89C4\u5EFA\u8BAE" }), _jsx(AdviceTypeButton, { isActive: adviceType === 'ai', onClick: () => setAdviceType('ai'), children: "AI\u5EFA\u8BAE" })] })] }), _jsx(AdviceContent, { children: adviceType === 'regular' ? (_jsxs(_Fragment, { children: [_jsxs(AdviceSection, { theme: "diet", children: [_jsxs(AdviceSectionTitle, { theme: "diet", children: [_jsx(DietIcon, {}), " \u996E\u98DF\u5EFA\u8BAE"] }), regularAdvice.split('\n')
                                            .filter(line => line.includes('早餐') || line.includes('午餐') || line.includes('晚餐') || line.includes('饮食'))
                                            .map((line, index) => (_jsx("p", { children: highlightKeywords(line) }, index)))] }), _jsxs(AdviceSection, { theme: "exercise", children: [_jsxs(AdviceSectionTitle, { theme: "exercise", children: [_jsx(ExerciseIcon, {}), " \u8FD0\u52A8\u5EFA\u8BAE"] }), regularAdvice.split('\n')
                                            .filter(line => line.includes('运动') || line.includes('活动'))
                                            .map((line, index) => (_jsx("p", { children: highlightKeywords(line) }, index)))] }), _jsxs(AdviceSection, { theme: "sleep", children: [_jsxs(AdviceSectionTitle, { theme: "sleep", children: [_jsx(SleepIcon, {}), " \u7761\u7720\u5EFA\u8BAE"] }), regularAdvice.split('\n')
                                            .filter(line => line.includes('睡眠') || line.includes('作息'))
                                            .map((line, index) => (_jsx("p", { children: highlightKeywords(line) }, index)))] })] })) : (_jsxs(_Fragment, { children: [_jsxs(AdviceSection, { theme: "diet", children: [_jsxs(AdviceSectionTitle, { theme: "diet", children: [_jsx(DietIcon, {}), " \u996E\u98DF\u5EFA\u8BAE"] }), aiAdvice.split('\n')
                                            .filter(line => line.includes('早餐') || line.includes('午餐') || line.includes('晚餐') || line.includes('饮食'))
                                            .map((line, index) => (_jsx("p", { children: highlightKeywords(line) }, index)))] }), _jsxs(AdviceSection, { theme: "exercise", children: [_jsxs(AdviceSectionTitle, { theme: "exercise", children: [_jsx(ExerciseIcon, {}), " \u8FD0\u52A8\u5EFA\u8BAE"] }), aiAdvice.split('\n')
                                            .filter(line => line.includes('运动') || line.includes('活动'))
                                            .map((line, index) => (_jsx("p", { children: highlightKeywords(line) }, index)))] }), _jsxs(AdviceSection, { theme: "sleep", children: [_jsxs(AdviceSectionTitle, { theme: "sleep", children: [_jsx(SleepIcon, {}), " \u7761\u7720\u5EFA\u8BAE"] }), aiAdvice.split('\n')
                                            .filter(line => line.includes('睡眠') || line.includes('作息'))
                                            .map((line, index) => (_jsx("p", { children: highlightKeywords(line) }, index)))] })] })) })] })), _jsxs(ChartSection, { children: [_jsx(SectionTitle, { children: "\u8FD1\u4E00\u5468\u5065\u5EB7\u72B6\u6001\u8D8B\u52BF" }), _jsx(HealthChart, {})] })] }));
};
export default HealthManagerPage;
