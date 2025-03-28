import React, { useState, useEffect } from 'react';
import { Card, Form, message, List, DatePicker } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';

const { RangePicker } = DatePicker;

interface HealthAdviceProps {
  onAdviceGenerated?: (advice: any[]) => void;
}

interface Advice {
  type: string;
  title: string;
  content: string;
  date: string;
}

const HealthAdvice: React.FC<HealthAdviceProps> = ({ onAdviceGenerated }) => {
  const [form] = Form.useForm();
  const [advice, setAdvice] = useState<Advice[]>([]);
  const [dateRange, setDateRange] = useState<[dayjs.Dayjs, dayjs.Dayjs]>([
    dayjs().subtract(6, 'day'),
    dayjs()
  ]);

  const fetchAdvice = async (startDate: string, endDate: string) => {
    try {
      const response = await axios.get('/api/health/weekly-status', {
        params: {
          startDate,
          endDate
        }
      });

      if (response.data.status === 'success') {
        setAdvice(response.data.data);
        onAdviceGenerated?.(response.data.data);
      } else {
        message.error('获取健康建议失败，请重试');
      }
    } catch (error) {
      message.error('请求失败，请检查网络连接');
    }
  };

  useEffect(() => {
    if (dateRange[0] && dateRange[1]) {
      fetchAdvice(
        dateRange[0].format('YYYY-MM-DD'),
        dateRange[1].format('YYYY-MM-DD')
      );
    }
  }, [dateRange]);

  return (
    <div>
      <Card title="健康数据记录" style={{ maxWidth: 800, margin: '0 auto' }}>
        <Form
          form={form}
          layout="vertical"
        >
          <Form.Item
            label="选择日期范围"
            name="dateRange"
            initialValue={dateRange}
          >
            <RangePicker
              onChange={(dates) => {
                if (dates) {
                  setDateRange(dates as [dayjs.Dayjs, dayjs.Dayjs]);
                }
              }}
            />
          </Form.Item>
        </Form>
      </Card>

      {advice.length > 0 && (
        <Card title="健康建议" style={{ maxWidth: 800, margin: '20px auto' }}>
          <List
            dataSource={advice}
            renderItem={(item: Advice) => (
              <List.Item>
                <List.Item.Meta
                  title={`${item.date} - ${item.type} - ${item.title}`}
                  description={item.content}
                />
              </List.Item>
            )}
          />
        </Card>
      )}
    </div>
  );
};

export default HealthAdvice; 