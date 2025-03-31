import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Card, Form, message, List, DatePicker } from 'antd';
import axios from 'axios';
import dayjs from 'dayjs';
const { RangePicker } = DatePicker;
const HealthAdvice = ({ onAdviceGenerated }) => {
    const [form] = Form.useForm();
    const [advice, setAdvice] = useState([]);
    const [dateRange, setDateRange] = useState([
        dayjs().subtract(6, 'day'),
        dayjs()
    ]);
    const fetchAdvice = async (startDate, endDate) => {
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
            }
            else {
                message.error('获取健康建议失败，请重试');
            }
        }
        catch (error) {
            message.error('请求失败，请检查网络连接');
        }
    };
    useEffect(() => {
        if (dateRange[0] && dateRange[1]) {
            fetchAdvice(dateRange[0].format('YYYY-MM-DD'), dateRange[1].format('YYYY-MM-DD'));
        }
    }, [dateRange]);
    return (_jsxs("div", { children: [_jsx(Card, { title: "\u5065\u5EB7\u6570\u636E\u8BB0\u5F55", style: { maxWidth: 800, margin: '0 auto' }, children: _jsx(Form, { form: form, layout: "vertical", children: _jsx(Form.Item, { label: "\u9009\u62E9\u65E5\u671F\u8303\u56F4", name: "dateRange", initialValue: dateRange, children: _jsx(RangePicker, { onChange: (dates) => {
                                if (dates) {
                                    setDateRange(dates);
                                }
                            } }) }) }) }), advice.length > 0 && (_jsx(Card, { title: "\u5065\u5EB7\u5EFA\u8BAE", style: { maxWidth: 800, margin: '20px auto' }, children: _jsx(List, { dataSource: advice, renderItem: (item) => (_jsx(List.Item, { children: _jsx(List.Item.Meta, { title: `${item.date} - ${item.type} - ${item.title}`, description: item.content }) })) }) }))] }));
};
export default HealthAdvice;
