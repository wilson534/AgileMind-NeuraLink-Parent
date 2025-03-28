import React, { useState, useEffect } from 'react';
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

// 模拟最近7天的数据
const mockData = {
  dates: ['2025-03-20', '2025-03-21', '2025-03-22', '2025-03-23', '2025-03-24', '2025-03-25', '2025-03-26'],
  meals: {
    breakfast: ['牛奶+面包+鸡蛋', '豆浆+油条+咸菜', '牛奶+三明治+水果', '粥+包子+咸鸭蛋', '牛奶+面包+鸡蛋', '豆浆+油条+咸菜', '牛奶+三明治+水果'],
    lunch: ['米饭+青菜+红烧肉', '面条+炒青菜+鸡翅', '米饭+鱼+青菜', '米饭+炒青菜+排骨', '米饭+青菜+红烧肉', '面条+炒青菜+鸡翅', '米饭+鱼+青菜'],
    dinner: ['米饭+青菜+鸡胸肉', '粥+炒青菜+鱼', '米饭+青菜+排骨', '米饭+炒青菜+鸡翅', '米饭+青菜+鸡胸肉', '粥+炒青菜+鱼', '米饭+青菜+排骨'],
  },
  sleep: [8.5, 9, 8, 9.5, 8.5, 9, 8.5],
  exercise: [45, 30, 60, 45, 30, 60, 45],
};

const HealthChart: React.FC = () => {
  const [activeMetric, setActiveMetric] = useState<'diet' | 'sleep' | 'exercise'>('diet');
  const [showMealDetails, setShowMealDetails] = useState(false);

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
        <h4 style={{ marginBottom: '10px', color: '#666' }}>最近七天的饮食详情：</h4>
        {mockData.dates.map((date, index) => (
          <div key={date} style={{ marginBottom: '10px' }}>
            <strong>{date}：</strong>
            <div style={{ marginLeft: '20px' }}>
              <div>早餐：{mockData.meals.breakfast[index]}</div>
              <div>午餐：{mockData.meals.lunch[index]}</div>
              <div>晚餐：{mockData.meals.dinner[index]}</div>
            </div>
          </div>
        ))}
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