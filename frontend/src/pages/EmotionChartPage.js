import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import ReactECharts from 'echarts-for-react';
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
const ChartContainer = styled.div `
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
const FilterContainer = styled.div `
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  margin-bottom: 2rem;
  justify-content: center;
`;
const TimeRangeContainer = styled.div `
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
`;
const TimeRangeLabel = styled.div `
  font-weight: 600;
  color: #555;
  margin-right: 0.5rem;
`;
const FilterButton = styled.button `
  padding: 0.5rem 1.5rem;
  border-radius: 30px;
  border: none;
  background-color: ${props => props.$isActive ? 'var(--primary-color)' : '#f0f0f0'};
  color: ${props => props.$isActive ? 'white' : '#666'};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background-color: ${props => props.$isActive ? 'var(--primary-color)' : '#e8e8e8'};
  }
`;
const EmotionFilterContainer = styled.div `
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin-bottom: 1rem;
  justify-content: center;
`;
const EmotionFilterLabel = styled.div `
  font-weight: 600;
  color: #555;
  margin-right: 0.5rem;
`;
const EmotionTag = styled.button `
  padding: 0.5rem 1rem;
  border-radius: 20px;
  border: none;
  background-color: ${props => props.$isActive ? props.$color : '#f0f0f0'};
  color: ${props => props.$isActive ? 'white' : '#666'};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  font-size: 0.875rem;
  cursor: pointer;
  transition: all 0.3s;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }
`;
const ChartWrapper = styled.div `
  width: 100%;
  height: 400px;
  margin-top: 2rem;
`;
const PieChartContainer = styled.div `
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  margin-top: 3rem;
`;
const PieChartCard = styled.div `
  background: white;
  border-radius: 16px;
  padding: 1.5rem;
  box-shadow: var(--card-shadow);
  transition: transform 0.3s, box-shadow 0.3s;
  
  &:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
  }
`;
const PieChartTitle = styled.h3 `
  font-size: 1.2rem;
  color: var(--primary-color);
  margin-bottom: 1rem;
  text-align: center;
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
const EmotionChartPage = () => {
    const [timeRange, setTimeRange] = useState('7days');
    const [selectedEmotions, setSelectedEmotions] = useState(['happy', 'sad', 'angry']);
    const [isLoading, setIsLoading] = useState(false);
    const [emotionData, setEmotionData] = useState([]);
    const [distributionData, setDistributionData] = useState([]);
    const [startDate, setStartDate] = useState('');
    const [endDate, setEndDate] = useState('');
    // 情绪颜色映射
    const emotionColors = {
        happy: '#4CAF50',
        sad: '#9C27B0',
        angry: '#F44336',
        anxious: '#FFC107',
        calm: '#2196F3'
    };
    // 情绪标签映射
    const emotionLabels = {
        happy: '快乐',
        sad: '伤感',
        angry: '生气',
        anxious: '焦虑',
        calm: '平静'
    };
    // 设置默认的开始日期和结束日期
    useEffect(() => {
        const today = new Date();
        const lastWeek = new Date(today);
        lastWeek.setDate(today.getDate() - 7);
        setEndDate(today.toISOString().split('T')[0]);
        setStartDate(lastWeek.toISOString().split('T')[0]);
    }, []);
    // 模拟获取情绪数据
    useEffect(() => {
        const fetchEmotionData = async () => {
            setIsLoading(true);
            try {
                // 实际项目中，这里应该调用后端API
                // const response = await axios.get(`/api/emotion/analytics?timeRange=${timeRange}`);
                // const data = response.data;
                // 模拟API调用延迟
                await new Promise(resolve => setTimeout(resolve, 1000));
                // 模拟数据
                let days = timeRange === '3days' ? 3 : timeRange === '7days' ? 7 : 30;
                const mockData = [];
                let today = new Date();
                // 处理自定义时间范围
                if (timeRange === 'custom' && startDate && endDate) {
                    const start = new Date(startDate);
                    const end = new Date(endDate);
                    days = Math.ceil((end.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)) + 1;
                    today = end;
                }
                for (let i = days - 1; i >= 0; i--) {
                    const date = new Date(today);
                    date.setDate(date.getDate() - i);
                    const dateStr = date.toISOString().split('T')[0];
                    mockData.push({
                        date: dateStr,
                        happy: Math.random() * 50 + 50, // 50-100
                        sad: Math.random() * 40 + 10, // 10-50
                        angry: Math.random() * 30 + 5, // 5-35
                        anxious: Math.random() * 40 + 20, // 20-60
                        calm: Math.random() * 40 + 40, // 40-80
                    });
                }
                setEmotionData(mockData);
                // 生成分布数据
                const totalEmotions = mockData.reduce((acc, day) => {
                    acc.happy += day.happy;
                    acc.sad += day.sad;
                    acc.angry += day.angry;
                    acc.anxious += day.anxious;
                    acc.calm += day.calm;
                    return acc;
                }, { happy: 0, sad: 0, angry: 0, anxious: 0, calm: 0 });
                const total = Object.values(totalEmotions).reduce((sum, val) => sum + val, 0);
                const distribution = Object.entries(totalEmotions).map(([emotion, value]) => ({
                    emotion: emotionLabels[emotion],
                    value: Math.round((value / total) * 100),
                    color: emotionColors[emotion]
                }));
                setDistributionData(distribution);
            }
            catch (error) {
                console.error('获取情绪数据失败:', error);
            }
            finally {
                setIsLoading(false);
            }
        };
        fetchEmotionData();
    }, [timeRange]);
    // 切换情绪选择
    const toggleEmotion = (emotion) => {
        if (selectedEmotions.includes(emotion)) {
            // 至少保留一个情绪
            if (selectedEmotions.length > 1) {
                setSelectedEmotions(selectedEmotions.filter(e => e !== emotion));
            }
        }
        else {
            setSelectedEmotions([...selectedEmotions, emotion]);
        }
    };
    // 处理自定义日期应用
    const handleCustomDateApply = () => {
        if (startDate && endDate) {
            // 验证日期范围
            const start = new Date(startDate);
            const end = new Date(endDate);
            if (start > end) {
                alert('开始日期不能晚于结束日期');
                return;
            }
            // 重新获取数据
            // 这里不需要额外调用，因为timeRange变化会触发useEffect
        }
        else {
            alert('请选择开始和结束日期');
        }
    };
    // 生成折线图配置
    const getLineChartOption = () => {
        const series = selectedEmotions.map(emotion => ({
            name: emotionLabels[emotion],
            type: 'line',
            data: emotionData.map(day => day[emotion]),
            smooth: true,
            showSymbol: true,
            symbolSize: 8,
            lineStyle: {
                width: 3,
                color: emotionColors[emotion]
            },
            itemStyle: {
                color: emotionColors[emotion]
            },
            areaStyle: {
                color: {
                    type: 'linear',
                    x: 0,
                    y: 0,
                    x2: 0,
                    y2: 1,
                    colorStops: [{
                            offset: 0,
                            color: `${emotionColors[emotion]}80` // 80 是透明度
                        }, {
                            offset: 1,
                            color: `${emotionColors[emotion]}10`
                        }]
                }
            },
            emphasis: {
                focus: 'series'
            },
            // 动画效果
            animationDuration: 2000,
            animationEasing: 'cubicOut'
        }));
        return {
            tooltip: {
                trigger: 'axis',
                formatter: function (params) {
                    let result = params[0].axisValue + '<br/>';
                    params.forEach((param) => {
                        result += `${param.marker} ${param.seriesName}: ${param.value.toFixed(1)}<br/>`;
                    });
                    return result;
                }
            },
            legend: {
                data: selectedEmotions.map(e => emotionLabels[e]),
                icon: 'circle',
                textStyle: {
                    color: '#666'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: emotionData.map(day => day.date),
                axisLine: {
                    lineStyle: {
                        color: '#ddd'
                    }
                },
                axisLabel: {
                    color: '#666',
                    formatter: (value) => {
                        const date = new Date(value);
                        return `${date.getMonth() + 1}/${date.getDate()}`;
                    }
                }
            },
            yAxis: {
                type: 'value',
                name: '情绪指数',
                nameTextStyle: {
                    color: '#666'
                },
                min: 0,
                max: 100,
                interval: 20,
                axisLine: {
                    show: true,
                    lineStyle: {
                        color: '#ddd'
                    }
                },
                axisLabel: {
                    color: '#666'
                },
                splitLine: {
                    lineStyle: {
                        color: '#f5f5f5'
                    }
                }
            },
            series: series
        };
    };
    // 生成饼图配置
    const getPieChartOption = () => {
        // 根据当前选择的时间范围获取标题
        const timeRangeText = {
            '3days': '最近3天',
            '7days': '最近7天',
            '30days': '最近30天',
            'custom': '自定义时间'
        }[timeRange];
        return {
            title: {
                text: `${timeRangeText}情绪分布比例`,
                left: 'center',
                textStyle: {
                    color: '#333',
                    fontSize: 16,
                    fontWeight: 'normal'
                }
            },
            tooltip: {
                trigger: 'item',
                formatter: '{b}: {c}%'
            },
            legend: {
                orient: 'vertical',
                right: 10,
                top: 'center',
                textStyle: {
                    color: '#666'
                }
            },
            series: [
                {
                    type: 'pie',
                    radius: ['40%', '70%'],
                    avoidLabelOverlap: false,
                    itemStyle: {
                        borderRadius: 10,
                        borderColor: '#fff',
                        borderWidth: 2
                    },
                    label: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        label: {
                            show: true,
                            fontSize: '18',
                            fontWeight: 'bold'
                        }
                    },
                    data: distributionData.map(item => ({
                        value: item.value,
                        name: item.emotion,
                        itemStyle: {
                            color: item.color
                        }
                    })),
                    animationType: 'scale',
                    animationEasing: 'elasticOut',
                    animationDelay: function () {
                        return Math.random() * 200;
                    }
                }
            ]
        };
    };
    return (_jsxs(PageContainer, { children: [_jsx(Title, { children: "\u60C5\u7EEA\u56FE\u8868" }), _jsx(Description, { children: "\u53EF\u89C6\u5316\u5C55\u793A\u5B69\u5B50\u7684\u60C5\u7EEA\u53D8\u5316\u8D8B\u52BF\uFF0C\u5E2E\u52A9\u66F4\u597D\u5730\u4E86\u89E3\u5B69\u5B50\u7684\u5FC3\u7406\u5065\u5EB7" }), _jsxs(ChartContainer, { children: [_jsxs(FilterContainer, { children: [_jsxs(TimeRangeContainer, { children: [_jsx(TimeRangeLabel, { children: "\u65F6\u95F4\u8303\u56F4\uFF1A" }), _jsx(FilterButton, { "$isActive": timeRange === '3days', onClick: () => setTimeRange('3days'), children: "\u6700\u8FD13\u5929" }), _jsx(FilterButton, { "$isActive": timeRange === '7days', onClick: () => setTimeRange('7days'), children: "\u6700\u8FD17\u5929" }), _jsx(FilterButton, { "$isActive": timeRange === '30days', onClick: () => setTimeRange('30days'), children: "\u6700\u8FD130\u5929" }), _jsx(FilterButton, { "$isActive": timeRange === 'custom', onClick: () => setTimeRange('custom'), children: "\u81EA\u5B9A\u4E49\u65F6\u95F4" })] }), timeRange === 'custom' && (_jsxs(TimeRangeContainer, { children: [_jsx(TimeRangeLabel, { children: "\u9009\u62E9\u65E5\u671F\u8303\u56F4\uFF1A" }), _jsxs("div", { style: { display: 'flex', gap: '0.5rem', alignItems: 'center' }, children: [_jsx("input", { type: "date", style: {
                                                    padding: '0.5rem',
                                                    borderRadius: '8px',
                                                    border: '1px solid #ddd',
                                                    fontFamily: 'inherit'
                                                }, value: startDate, onChange: (e) => setStartDate(e.target.value) }), _jsx("span", { children: "\u81F3" }), _jsx("input", { type: "date", style: {
                                                    padding: '0.5rem',
                                                    borderRadius: '8px',
                                                    border: '1px solid #ddd',
                                                    fontFamily: 'inherit'
                                                }, value: endDate, onChange: (e) => setEndDate(e.target.value) }), _jsx(FilterButton, { "$isActive": true, onClick: handleCustomDateApply, style: { marginLeft: '0.5rem' }, children: "\u5E94\u7528" })] })] })), _jsxs(EmotionFilterContainer, { children: [_jsx(EmotionFilterLabel, { children: "\u60C5\u7EEA\u6807\u7B7E\uFF1A" }), Object.entries(emotionLabels).map(([key, label]) => (_jsx(EmotionTag, { "$isActive": selectedEmotions.includes(key), "$color": emotionColors[key], onClick: () => toggleEmotion(key), children: label }, key)))] })] }), isLoading ? (_jsxs(LoadingContainer, { initial: { opacity: 0 }, animate: { opacity: 1 }, exit: { opacity: 0 }, children: [_jsx(motion.div, { animate: {
                                    rotate: 360,
                                    borderRadius: ["20%", "50%", "20%"],
                                    backgroundColor: ["#6a5acd", "#9370db", "#6a5acd"]
                                }, transition: { duration: 2, repeat: Infinity, ease: "linear" }, style: { width: 60, height: 60 } }), _jsx(LoadingText, { children: "\u52A0\u8F7D\u60C5\u7EEA\u6570\u636E\u4E2D..." })] })) : (_jsx(ChartWrapper, { children: _jsx(ReactECharts, { option: getLineChartOption(), style: { height: '100%', width: '100%' }, 
                            // 添加生长感动画
                            onEvents: {
                                rendered: () => {
                                    const chart = document.querySelector('.echarts_for_react')?._echarts;
                                    if (chart) {
                                        chart.setOption({
                                            graphic: {
                                                elements: [{
                                                        type: 'text',
                                                        left: 'center',
                                                        top: 'middle',
                                                        style: {
                                                            text: '',
                                                            fontSize: 0,
                                                            fontWeight: 'bold',
                                                            lineDash: [0, 200],
                                                            lineDashOffset: 0,
                                                            fill: 'transparent',
                                                            stroke: 'transparent',
                                                            lineWidth: 0
                                                        },
                                                        keyframeAnimation: {
                                                            duration: 3000,
                                                            loop: false,
                                                            keyframes: []
                                                        }
                                                    }]
                                            }
                                        });
                                    }
                                }
                            } }) }))] }), _jsx(PieChartContainer, { children: _jsx(PieChartCard, { children: _jsx(ReactECharts, { option: getPieChartOption(), style: { height: 300, width: '100%' } }) }) })] }));
};
export default EmotionChartPage;
