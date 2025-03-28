import React, { useState } from 'react';
import { Typography } from 'antd';
import HealthAdvice from '../components/HealthAdvice';
import AdviceDisplay from '../components/AdviceDisplay';

const { Title } = Typography;

const HealthPage: React.FC = () => {
  const [advice, setAdvice] = useState<any[]>([]);

  return (
    <div style={{ padding: '24px' }}>
      <Title level={2} style={{ textAlign: 'center', marginBottom: '32px' }}>
        健康数据分析
      </Title>
      
      <HealthAdvice onAdviceGenerated={setAdvice} />
      
      {advice.length > 0 && <AdviceDisplay advice={advice} />}
    </div>
  );
};

export default HealthPage; 