import axios from 'axios';
// 创建axios实例，设置基础URL
const api = axios.create({
    baseURL: process.env.NODE_ENV === 'production'
        ? '/api' // 生产环境下的API路径
        : 'http://localhost:3001/api', // 开发环境下的API路径
    timeout: 10000, // 请求超时时间
    headers: {
        'Content-Type': 'application/json'
    }
});
// 请求拦截器
api.interceptors.request.use(config => {
    // 可以在这里添加认证信息等
    return config;
}, error => {
    return Promise.reject(error);
});
// 响应拦截器
api.interceptors.response.use(response => {
    return response;
}, error => {
    // 统一处理错误
    console.error('API请求错误:', error);
    return Promise.reject(error);
});
export default api;
