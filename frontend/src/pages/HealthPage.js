import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState } from 'react';
import { Typography } from 'antd';
import HealthAdvice from '../components/HealthAdvice';
import AdviceDisplay from '../components/AdviceDisplay';
const { Title } = Typography;
const HealthPage = () => {
    const [advice, setAdvice] = useState([]);
    return (_jsxs("div", { style: { padding: '24px' }, children: [_jsx(Title, { level: 2, style: { textAlign: 'center', marginBottom: '32px' }, children: "\u5065\u5EB7\u6570\u636E\u5206\u6790" }), _jsx(HealthAdvice, { onAdviceGenerated: setAdvice }), advice.length > 0 && _jsx(AdviceDisplay, { advice: advice })] }));
};
export default HealthPage;
