// Vercel无服务器函数入口
const app = require('../backend/dist/app').default;

module.exports = app;