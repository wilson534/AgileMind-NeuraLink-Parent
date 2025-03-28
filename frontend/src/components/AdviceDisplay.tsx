import React from 'react';
import { Card, List, Tag } from 'antd';
import { 
  HeartOutlined, 
  ThunderboltOutlined, 
  MoonOutlined 
} from '@ant-design/icons';

interface Advice {
  type: string;
  title: string;
  content: string;
}

interface AdviceDisplayProps {
  advice: Advice[];
}

const AdviceDisplay: React.FC<AdviceDisplayProps> = ({ advice }) => {
  const getIcon = (type: string) => {
    switch (type) {
      case '饮食':
        return <HeartOutlined style={{ fontSize: '24px', color: '#ff4d4f' }} />;
      case '运动':
        return <ThunderboltOutlined style={{ fontSize: '24px', color: '#1890ff' }} />;
      case '睡眠':
        return <MoonOutlined style={{ fontSize: '24px', color: '#722ed1' }} />;
      default:
        return null;
    }
  };

  const getTagColor = (type: string) => {
    switch (type) {
      case '饮食':
        return 'red';
      case '运动':
        return 'blue';
      case '睡眠':
        return 'purple';
      default:
        return 'default';
    }
  };

  return (
    <Card title="个性化健康建议" style={{ maxWidth: 800, margin: '20px auto' }}>
      <List
        dataSource={advice}
        renderItem={(item) => (
          <List.Item>
            <List.Item.Meta
              avatar={getIcon(item.type)}
              title={
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <Tag color={getTagColor(item.type)}>{item.type}</Tag>
                  <span>{item.title}</span>
                </div>
              }
              description={item.content}
            />
          </List.Item>
        )}
      />
    </Card>
  );
};

export default AdviceDisplay; 