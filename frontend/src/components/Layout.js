import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import BackgroundEffect from './BackgroundEffect';
const LayoutContainer = styled.div `
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;
const Header = styled.header `
  background-color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 1rem 2rem;
  position: sticky;
  top: 0;
  z-index: 100;
`;
const Nav = styled.nav `
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 1200px;
  margin: 0 auto;
`;
const Logo = styled.div `
  font-size: 1.5rem;
  font-weight: 700;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 0.5rem;
`;
const NavLinks = styled.div `
  display: flex;
  gap: 1.5rem;
`;
const NavLink = styled(Link) `
  text-decoration: none;
  color: ${props => props.$isActive ? 'var(--primary-color)' : 'var(--text-color)'};
  font-weight: ${props => props.$isActive ? '600' : '400'};
  padding: 0.5rem 0;
  position: relative;
  transition: color var(--transition-time);
  
  &:hover {
    color: var(--primary-color);
  }
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: ${props => props.$isActive ? '100%' : '0'};
    height: 2px;
    background-color: var(--primary-color);
    transition: width var(--transition-time);
  }
  
  &:hover::after {
    width: 100%;
  }
`;
const Main = styled.main `
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
`;
const Footer = styled.footer `
  background-color: white;
  padding: 1.5rem;
  text-align: center;
  color: var(--text-color);
  font-size: 0.875rem;
`;
const NeuraLinkIcon = () => (_jsxs("svg", { width: "24", height: "24", viewBox: "0 0 24 24", fill: "none", xmlns: "http://www.w3.org/2000/svg", children: [_jsx("path", { d: "M12 2C6.48 2 2 6.48 2 12C2 17.52 6.48 22 12 22C17.52 22 22 17.52 22 12C22 6.48 17.52 2 12 2ZM12 20C7.59 20 4 16.41 4 12C4 7.59 7.59 4 12 4C16.41 4 20 7.59 20 12C20 16.41 16.41 20 12 20Z", fill: "#6A5ACD" }), _jsx("path", { d: "M7 12C7 9.24 9.24 7 12 7C14.76 7 17 9.24 17 12", stroke: "#6A5ACD", "stroke-width": "1.5", "stroke-linecap": "round" }), _jsx("path", { d: "M9 12C9 10.34 10.34 9 12 9C13.66 9 15 10.34 15 12", stroke: "#6A5ACD", "stroke-width": "1.5", "stroke-linecap": "round" }), _jsx("path", { d: "M12 12V16", stroke: "#6A5ACD", "stroke-width": "1.5", "stroke-linecap": "round" }), _jsx("path", { d: "M10.5 17C10.5 17 9 16 9 15C9 14.4477 9.44772 14 10 14C10.5 14 10.8 14.3 11 14.5C11.2 14.3 11.5 14 12 14C12.5523 14 13 14.4477 13 15C13 16 11.5 17 11.5 17", fill: "#6A5ACD", stroke: "#6A5ACD", "stroke-width": "0.5", "stroke-linecap": "round", "stroke-linejoin": "round" })] }));
const Layout = ({ children }) => {
    const location = useLocation();
    const [theme, setTheme] = useState('default');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [emotionState, setEmotionState] = useState(null);
    const [enableParallax, setEnableParallax] = useState(true);
    const [enableCelebration, setEnableCelebration] = useState(false);
    const [enableAudio, setEnableAudio] = useState(false);
    // 根据当前路径设置主题
    useEffect(() => {
        // 获取当前月份，设置季节主题
        const getCurrentSeason = () => {
            const month = new Date().getMonth() + 1; // 月份从0开始，所以+1
            if (month >= 3 && month <= 5)
                return 'spring';
            if (month >= 6 && month <= 8)
                return 'summer';
            if (month >= 9 && month <= 11)
                return 'autumn';
            return 'winter';
        };
        if (location.pathname.includes('health')) {
            setTheme('health');
        }
        else if (location.pathname.includes('emotion')) {
            setTheme('emotion');
            // 在情绪图表页面，可以根据URL参数或其他逻辑设置情绪状态
            const urlParams = new URLSearchParams(location.search);
            const emotion = urlParams.get('emotion');
            if (emotion === 'happy' || emotion === 'sad' || emotion === 'angry' || emotion === 'anxious' || emotion === 'calm') {
                setEmotionState(emotion);
            }
        }
        else if (location.pathname.includes('voice')) {
            setTheme('voice');
        }
        else {
            // 默认使用季节主题
            setTheme(getCurrentSeason());
        }
        // 重置庆祝动画状态
        setEnableCelebration(false);
    }, [location]);
    const navItems = [
        { path: '/', label: '产品介绍' },
        { path: '/daily-report', label: '每日报告' },
        { path: '/emotion-chart', label: '情绪图表' },
        { path: '/health-manager', label: '身体小管家' },
        { path: '/parent-voice', label: '家长信箱' },
        { path: '/community', label: '社区交流' },
        { path: '/image-gen', label: '文生图' },
        { path: '/voice-clone', label: '声音克隆' },
    ];
    // 表单提交成功后触发庆祝动画
    const handleFormSuccess = () => {
        setEnableCelebration(true);
        // 3秒后关闭庆祝动画
        setTimeout(() => setEnableCelebration(false), 3000);
    };
    // 提供给子组件的上下文
    const contextValue = {
        theme,
        isDarkMode,
        emotionState,
        setEmotionState,
        handleFormSuccess
    };
    return (_jsxs(LayoutContainer, { children: [_jsx(BackgroundEffect, { isDarkMode: isDarkMode, theme: theme, particleCount: 50, emotionState: emotionState, enableParallax: enableParallax, enableCelebration: enableCelebration, enableAudio: enableAudio }), _jsx(Header, { children: _jsxs(Nav, { children: [_jsxs(Logo, { as: Link, to: "/", style: { textDecoration: 'none' }, children: [_jsx(NeuraLinkIcon, {}), _jsx("span", { children: "\u5FC3\u7075\u7EBD\u5E26NeuraLink" })] }), _jsx(NavLinks, { children: navItems.map((item) => (_jsx(NavLink, { to: item.path, "$isActive": location.pathname === item.path || (item.path === '/image-gen' && location.pathname === '/'), children: item.label }, item.path))) })] }) }), _jsx(Main, { children: _jsx(motion.div, { initial: { opacity: 0, y: 20 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -20 }, transition: { duration: 0.3 }, children: children }) }), _jsx(Footer, { children: _jsxs("p", { children: ["\u00A9 ", new Date().getFullYear(), " \u5FC3\u7075\u7EBD\u5E26NeuraLink. All rights reserved."] }) })] }));
};
export default Layout;
