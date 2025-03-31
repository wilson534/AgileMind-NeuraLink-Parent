import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Card, List, Tag } from 'antd';
import { HeartOutlined, ThunderboltOutlined, MoonOutlined } from '@ant-design/icons';
const AdviceDisplay = ({ advice }) => {
    const getIcon = (type) => {
        switch (type) {
            case '饮食':
                return _jsx(HeartOutlined, { style: { fontSize: '24px', color: '#ff4d4f' } });
            case '运动':
                return _jsx(ThunderboltOutlined, { style: { fontSize: '24px', color: '#1890ff' } });
            case '睡眠':
                return _jsx(MoonOutlined, { style: { fontSize: '24px', color: '#722ed1' } });
            default:
                return null;
        }
    };
    const getTagColor = (type) => {
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
    return (_jsx(Card, { title: "\u4E2A\u6027\u5316\u5065\u5EB7\u5EFA\u8BAE", style: { maxWidth: 800, margin: '20px auto' }, children: _jsx(List, { dataSource: advice, renderItem: (item) => (_jsx(List.Item, { children: _jsx(List.Item.Meta, { avatar: getIcon(item.type), title: _jsxs("div", { style: { display: 'flex', alignItems: 'center', gap: '8px' }, children: [_jsx(Tag, { color: getTagColor(item.type), children: item.type }), _jsx("span", { children: item.title })] }), description: item.content }) })) }) }));
};
export default AdviceDisplay;
