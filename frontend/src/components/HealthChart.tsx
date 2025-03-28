import React, { useState } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import styled from 'styled-components';

// 注册ChartJS组件
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ButtonContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  padding: 0 20px;
`;

const MetricButton = styled.button<{ isActive: boolean }>`
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

const ChartContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 20px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const MealTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.th`
  background: var(--primary-color);
  color: white;
  padding: 12px;
  text-align: left;
  font-weight: 600;
  font-size: 14px;
`;

const TableCell = styled.td`
  padding: 12px;
  border-bottom: 1px solid #eee;
  color: #333;
  font-size: 14px;
`;

const TableRow = styled.tr`
  &:hover {
    background-color: #f8f9fa;
  }
  
  &:last-child td {
    border-bottom: none;
  }
`;

const MealTypeCell = styled(TableCell)`
  font-weight: 600;
  color: var(--primary-color);
  width: 80px;
`;

const AdviceButtonContainer = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 15px;
`;

const AdviceButton = styled.button<{ isActive: boolean }>`
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

const AdviceCard = styled.div`
  background: white;
  border-radius: 8px;
  padding: 15px;
  margin-top: 10px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
`;

const AdviceTitle = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: var(--primary-color);
  margin-bottom: 8px;
`;

const AdviceContent = styled.div`
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

// 模拟最近7天的数据
const mockData = {
  dates: generateDates(),
  meals: {
    breakfast: ['牛奶+面包+鸡蛋', '豆浆+油条+咸菜', '牛奶+三明治+水果', '粥+包子+咸鸭蛋', '牛奶+面包+鸡蛋', '豆浆+油条+咸菜', '牛奶+三明治+水果'],
    lunch: ['米饭+青菜+红烧肉', '面条+炒青菜+鸡翅', '米饭+鱼+青菜', '米饭+炒青菜+排骨', '米饭+青菜+红烧肉', '面条+炒青菜+鸡翅', '米饭+鱼+青菜'],
    dinner: ['米饭+青菜+鸡胸肉', '粥+炒青菜+鱼', '米饭+青菜+排骨', '米饭+炒青菜+鸡翅', '米饭+青菜+鸡胸肉', '粥+炒青菜+鱼', '米饭+青菜+排骨'],
  },
  sleep: [8.5, 9, 8, 9.5, 8.5, 9, 8.5],
  exercise: [45, 30, 60, 45, 30, 60, 45],
};

// 计算总体健康评分
const calculateOverallScore = (index: number) => {
  const dietScore = [5, 4, 6, 5, 4, 6, 5][index];
  const sleepScore = mockData.sleep[index] >= 8 ? 5 : mockData.sleep[index] >= 7 ? 4 : 3;
  const exerciseScore = mockData.exercise[index] >= 60 ? 5 : mockData.exercise[index] >= 30 ? 4 : 3;
  return Math.round((dietScore + sleepScore + exerciseScore) / 3);
};

// 生成健康建议
const generateHealthAdvice = (index: number) => {
  const dietScore = [5, 4, 6, 5, 4, 6, 5][index];
  const sleepScore = mockData.sleep[index] >= 8 ? 5 : mockData.sleep[index] >= 7 ? 4 : 3;
  const exerciseScore = mockData.exercise[index] >= 60 ? 5 : mockData.exercise[index] >= 30 ? 4 : 3;
  
  const advice = [];
  if (dietScore < 5) advice.push('建议增加蛋白质和蔬菜的摄入');
  if (sleepScore < 4) advice.push('建议保证充足的睡眠时间');
  if (exerciseScore < 4) advice.push('建议增加运动量');
  
  return advice.length > 0 ? advice.join('；') : '继续保持良好的生活习惯';
};

const HealthChart: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'diet' | 'sleep' | 'exercise'>('diet');
  const [showMealDetails, setShowMealDetails] = useState(false);
  const [adviceType, setAdviceType] = useState<'regular' | 'ai'>('regular');

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
        position: 'top' as const,
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
    if (!showMealDetails) return null;

    return (
      <div style={{ marginTop: '20px', padding: '15px', background: '#f8f9fa', borderRadius: '8px' }}>
        <h4 style={{ marginBottom: '10px', color: '#666', fontSize: '16px', fontWeight: '600' }}>
          最近七天的饮食详情
        </h4>
        <AdviceButtonContainer>
          <AdviceButton
            isActive={adviceType === 'regular'}
            onClick={() => setAdviceType('regular')}
          >
            常规建议
          </AdviceButton>
          <AdviceButton
            isActive={adviceType === 'ai'}
            onClick={() => setAdviceType('ai')}
          >
            AI建议
          </AdviceButton>
        </AdviceButtonContainer>
        <MealTable>
          <thead>
            <tr>
              <TableHeader style={{ width: '100px' }}>日期</TableHeader>
              <TableHeader>早餐</TableHeader>
              <TableHeader>午餐</TableHeader>
              <TableHeader>晚餐</TableHeader>
              <TableHeader style={{ width: '100px' }}>健康评分</TableHeader>
              <TableHeader>建议</TableHeader>
            </tr>
          </thead>
          <tbody>
            {mockData.dates.map((date, index) => (
              <TableRow key={date}>
                <TableCell style={{ fontWeight: '600' }}>{date}</TableCell>
                <TableCell>{mockData.meals.breakfast[index]}</TableCell>
                <TableCell>{mockData.meals.lunch[index]}</TableCell>
                <TableCell>{mockData.meals.dinner[index]}</TableCell>
                <TableCell>
                  <div style={{ 
                    display: 'inline-block',
                    padding: '4px 8px',
                    borderRadius: '12px',
                    backgroundColor: calculateOverallScore(index) >= 4 ? '#e6f4ea' : '#fce8e6',
                    color: calculateOverallScore(index) >= 4 ? '#1e7e34' : '#dc3545',
                    fontWeight: '600'
                  }}>
                    {calculateOverallScore(index)}分
                  </div>
                </TableCell>
                <TableCell>
                  <AdviceCard>
                    <AdviceTitle>
                      {adviceType === 'regular' ? '常规建议' : 'AI智能建议'}
                    </AdviceTitle>
                    <AdviceContent>
                      {adviceType === 'regular' ? generateHealthAdvice(index) : '正在生成AI建议...'}
                    </AdviceContent>
                  </AdviceCard>
                </TableCell>
              </TableRow>
            ))}
          </tbody>
        </MealTable>
      </div>
    );
  };

  return (
    <ChartContainer>
      <ButtonContainer>
        <MetricButton
          isActive={activeMetric === 'diet'}
          onClick={() => {
            setActiveMetric('diet');
            setShowMealDetails(true);
          }}
        >
          饮食
        </MetricButton>
        <MetricButton
          isActive={activeMetric === 'sleep'}
          onClick={() => {
            setActiveMetric('sleep');
            setShowMealDetails(false);
          }}
        >
          睡眠
        </MetricButton>
        <MetricButton
          isActive={activeMetric === 'exercise'}
          onClick={() => {
            setActiveMetric('exercise');
            setShowMealDetails(false);
          }}
        >
          运动
        </MetricButton>
      </ButtonContainer>
      
      <Line options={options} data={getChartData()} />
      {renderMealDetails()}
    </ChartContainer>
  );
};

export default HealthChart;