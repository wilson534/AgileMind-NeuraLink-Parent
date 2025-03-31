import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, } from 'chart.js';
import styled from 'styled-components';
// 注册ChartJS组件
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);
const ButtonContainer = styled.div `
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 20px;
`;
const MetricButton = styled.button `
  padding: 10px 20px;
  border: none;
  border-radius: 8px;
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
const ChartContainer = styled.div `
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
const MealTable = styled.table `
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;
const TableHeader = styled.th `
  background: var(--primary-color);
  color: white;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
`;
const TableCell = styled.td `
  padding: 12px;
  border-bottom: 1px solid #eee;
  color: #333;
  font-size: 14px;
`;
const TableRow = styled.tr `
  &:hover {
    background-color: #f8f9fa;
  }
  
  &:last-child td {
    border-bottom: none;
  }
`;
const MealTypeCell = styled(TableCell) `
  font-weight: 600;
  color: var(--primary-color);
  width: 80px;
`;
const AdviceButtonContainer = styled.div `
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;
const AdviceButton = styled.button `
  padding: 8px 16px;
  border: none;
  border-radius: 6px;
  background: ${props => props.isActive ? 'var(--primary-color)' : '#f0f0f0'};
  color: ${props => props.isActive ? 'white' : '#666'};
  cursor: pointer;
  transition: all 0.3s ease;
  font-weight: ${props => props.isActive ? '600' : '400'};
  font-size: 14px;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  }
`;
const AdviceCard = styled.div `
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;
const AdviceTitle = styled.div `
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 8px;
`;
const AdviceContent = styled.div `
  font-size: 14px;
  color: #333;
  line-height: 1.6;
`;
// 生成最近7天的日期（比当前日期落后一天）
const generateDates = () => {
    const dates = [];
    const today = new Date();
    // 设置日期为昨天
    today.setDate(today.getDate() - 1);
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        dates.push(date.toISOString().split('T')[0]);
    }
    return dates;
};
// AI健康建议数组
const aiHealthAdvices = [
    "根据您的饮食结构分析，建议增加全谷物摄入，减少精制碳水化合物，有助于稳定血糖和提供持久能量。",
    "您的蛋白质摄入略低，建议早餐增加鸡蛋或豆制品，午餐可适量添加瘦肉，保障肌肉健康和代谢功能。",
    "分析显示您的膳食纤维摄入不足，建议每天增加2-3份新鲜蔬菜和水果，改善肠道健康和消化功能。",
    "您的饮食中钙质摄入不足，建议适量增加奶制品或豆制品，预防骨质疏松，保障骨骼健康。",
    "监测到您的水分摄入不足，建议每天饮水量达到2000ml，保持良好的新陈代谢和皮肤状态。",
    "您的饮食多样性良好，建议保持均衡饮食习惯，适当控制晚餐摄入量，有助于维持健康体重。",
    "分析显示您的维生素D摄入不足，建议适当增加阳光照射时间和富含维生素D的食物，如鱼类和蛋黄。"
];
// 模拟最近7天的数据
const mockData = {
    dates: generateDates(),
    meals: {
        breakfast: ['牛奶+全麦面包+水煮蛋', '豆浆+燕麦粥+坚果', '酸奶+水果沙拉+全麦吐司', '小米粥+煮鸡蛋+蒸南瓜', '牛奶+藜麦粥+蓝莓', '豆浆+杂粮饼+鲜切水果', '希腊酸奶+香蕉+核桃'],
        lunch: ['糙米饭+清蒸鱼+西兰花', '荞麦面+鸡胸肉+菠菜', '藜麦饭+烤三文鱼+芦笋', '糙米饭+红烧牛肉+胡萝卜', '意大利面+番茄虾仁+沙拉', '糙米饭+宫保鸡丁+黄瓜', '藜麦沙拉+烤鸡胸+牛油果'],
        dinner: ['紫米饭+清蒸鸡胸+菌菇', '小米粥+蒸蛋+凉拌豆芽', '糙米饭+烤鱼+炒青菜', '杂粮粥+清炒虾仁+西葫芦', '藜麦饭+烤牛肉+芹菜', '南瓜粥+清蒸豆腐+海带汤', '糙米饭+清蒸鲈鱼+空心菜'],
    },
    sleep: [8.5, 9, 8, 9.5, 8.5, 9, 8.5],
    exercise: [45, 30, 60, 45, 30, 60, 45],
};
// 计算总体健康评分
const calculateOverallScore = (index) => {
    const dietScore = [5, 4, 6, 5, 4, 6, 5][index];
    const sleepScore = mockData.sleep[index] >= 8 ? 5 : mockData.sleep[index] >= 7 ? 4 : 3;
    const exerciseScore = mockData.exercise[index] >= 60 ? 5 : mockData.exercise[index] >= 30 ? 4 : 3;
    return Math.round((dietScore + sleepScore + exerciseScore) / 3);
};
// 生成健康建议
const generateHealthAdvice = (index) => {
    const dietScore = [5, 4, 6, 5, 4, 6, 5][index];
    const sleepScore = mockData.sleep[index] >= 8 ? 5 : mockData.sleep[index] >= 7 ? 4 : 3;
    const exerciseScore = mockData.exercise[index] >= 60 ? 5 : mockData.exercise[index] >= 30 ? 4 : 3;
    const advice = [];
    if (dietScore < 5)
        advice.push('建议增加蛋白质和蔬菜的摄入');
    if (sleepScore < 4)
        advice.push('建议保证充足的睡眠时间');
    if (exerciseScore < 4)
        advice.push('建议增加运动量');
    return advice.length > 0 ? advice.join('；') : '继续保持良好的生活习惯';
};
const HealthChart = () => {
    const [activeMetric, setActiveMetric] = useState('diet');
    const [showMealDetails, setShowMealDetails] = useState(false);
    const [adviceType, setAdviceType] = useState('regular');
    const getChartData = () => {
        switch (activeMetric) {
            case 'diet':
                return {
                    labels: mockData.dates,
                    datasets: [
                        {
                            label: '营养均衡评分',
                            data: [5, 4, 6, 5, 4, 6, 5],
                            borderColor: 'rgb(255, 99, 132)',
                            backgroundColor: 'rgba(255, 99, 132, 0.5)',
                        },
                    ],
                };
            case 'sleep':
                return {
                    labels: mockData.dates,
                    datasets: [
                        {
                            label: '睡眠时长（小时）',
                            data: mockData.sleep,
                            borderColor: 'rgb(53, 162, 235)',
                            backgroundColor: 'rgba(53, 162, 235, 0.5)',
                        },
                    ],
                };
            case 'exercise':
                return {
                    labels: mockData.dates,
                    datasets: [
                        {
                            label: '运动时长（分钟）',
                            data: mockData.exercise,
                            borderColor: 'rgb(75, 192, 192)',
                            backgroundColor: 'rgba(75, 192, 192, 0.5)',
                        },
                    ],
                };
            default:
                return {
                    labels: [],
                    datasets: [],
                };
        }
    };
    const options = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: true,
                text: activeMetric === 'diet' ? '营养均衡趋势' :
                    activeMetric === 'sleep' ? '睡眠时长趋势' :
                        '运动时长趋势',
            },
        },
        scales: {
            y: {
                beginAtZero: true,
                max: activeMetric === 'diet' ? 6 :
                    activeMetric === 'sleep' ? 12 :
                        120,
            },
        },
    };
    const renderMealDetails = () => {
        if (!showMealDetails)
            return null;
        return (_jsxs("div", { style: { marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }, children: [_jsx("h4", { style: { marginBottom: '10px', color: '#666', fontSize: '16px', fontWeight: '600' }, children: "\u6700\u8FD1\u4E03\u5929\u7684\u996E\u98DF\u8BE6\u60C5" }), _jsxs(AdviceButtonContainer, { children: [_jsx(AdviceButton, { isActive: adviceType === 'regular', onClick: () => setAdviceType('regular'), children: "\u5E38\u89C4\u5EFA\u8BAE" }), _jsx(AdviceButton, { isActive: adviceType === 'ai', onClick: () => setAdviceType('ai'), children: "AI\u5EFA\u8BAE" })] }), _jsxs(MealTable, { children: [_jsx("thead", { children: _jsxs("tr", { children: [_jsx(TableHeader, { style: { width: '100px' }, children: "\u65E5\u671F" }), _jsx(TableHeader, { children: "\u65E9\u9910" }), _jsx(TableHeader, { children: "\u5348\u9910" }), _jsx(TableHeader, { children: "\u665A\u9910" }), _jsx(TableHeader, { style: { width: '100px' }, children: "\u5065\u5EB7\u8BC4\u5206" }), _jsx(TableHeader, { children: "\u5EFA\u8BAE" })] }) }), _jsx("tbody", { children: mockData.dates.map((date, index) => (_jsxs(TableRow, { children: [_jsx(TableCell, { style: { fontWeight: '600' }, children: date }), _jsx(TableCell, { children: mockData.meals.breakfast[index] }), _jsx(TableCell, { children: mockData.meals.lunch[index] }), _jsx(TableCell, { children: mockData.meals.dinner[index] }), _jsx(TableCell, { children: _jsxs("div", { style: {
                                                display: 'inline-block',
                                                padding: '4px 8px',
                                                borderRadius: '12px',
                                                backgroundColor: calculateOverallScore(index) >= 4 ? '#e6f4ea' : '#fce8e6',
                                                color: calculateOverallScore(index) >= 4 ? '#1e7e34' : '#dc3545',
                                                fontWeight: '600'
                                            }, children: [calculateOverallScore(index), "\u5206"] }) }), _jsx(TableCell, { children: _jsxs(AdviceCard, { children: [_jsx(AdviceTitle, { children: adviceType === 'regular' ? '常规建议' : 'AI智能建议' }), _jsx(AdviceContent, { children: adviceType === 'regular' ? generateHealthAdvice(index) : aiHealthAdvices[index % aiHealthAdvices.length] })] }) })] }, date))) })] })] }));
    };
    return (_jsxs(ChartContainer, { children: [_jsxs(ButtonContainer, { children: [_jsx(MetricButton, { isActive: activeMetric === 'diet', onClick: () => {
                            setActiveMetric('diet');
                            setShowMealDetails(true);
                        }, children: "\u996E\u98DF" }), _jsx(MetricButton, { isActive: activeMetric === 'sleep', onClick: () => {
                            setActiveMetric('sleep');
                            setShowMealDetails(false);
                        }, children: "\u7761\u7720" }), _jsx(MetricButton, { isActive: activeMetric === 'exercise', onClick: () => {
                            setActiveMetric('exercise');
                            setShowMealDetails(false);
                        }, children: "\u8FD0\u52A8" })] }), _jsx(Line, { options: options, data: getChartData() }), renderMealDetails()] }));
};
export default HealthChart;
