import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
// 导入页面组件
import ImageGenPage from './pages/ImageGenPage';
import HealthManagerPage from './pages/HealthManagerPage';
import DailyReportPage from './pages/DailyReportPage';
import EmotionChartPage from './pages/EmotionChartPage';
import VoiceClonePage from './pages/VoiceClonePage';
import ParentVoicePage from './pages/ParentVoicePage';
import CommunityPage from './pages/CommunityPage';
import PostDetailPage from './pages/PostDetailPage';
import ProductIntroPage from './pages/ProductIntroPage';
import Layout from './components/Layout';
const App = () => {
    return (_jsx(Layout, { children: _jsx(AnimatePresence, { mode: "wait", children: _jsxs(Routes, { children: [_jsx(Route, { path: "/", element: _jsx(ProductIntroPage, {}) }), _jsx(Route, { path: "/image-gen", element: _jsx(ImageGenPage, {}) }), _jsx(Route, { path: "/health-manager", element: _jsx(HealthManagerPage, {}) }), _jsx(Route, { path: "/daily-report", element: _jsx(DailyReportPage, {}) }), _jsx(Route, { path: "/emotion-chart", element: _jsx(EmotionChartPage, {}) }), _jsx(Route, { path: "/voice-clone", element: _jsx(VoiceClonePage, {}) }), _jsx(Route, { path: "/parent-voice", element: _jsx(ParentVoicePage, {}) }), _jsx(Route, { path: "/community", element: _jsx(CommunityPage, {}) }), _jsx(Route, { path: "/post/:id", element: _jsx(PostDetailPage, {}) })] }) }) }));
};
export default App;
