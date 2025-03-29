import { Request, Response } from 'express';
import axios from 'axios';
import { Configuration, OpenAIApi } from 'openai';

// 配置OpenAI API
console.log('环境变量加载情况:', {
  NODE_ENV: process.env.NODE_ENV,
  PWD: process.env.PWD,
  OPENAI_API_KEY: process.env.OPENAI_API_KEY ? '已设置' : 'undefined'
});
const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
  basePath: "https://api.302ai.cn/v1"  // 改回基础路径
});

// 设置全局代理
let axiosInstance;
if (process.env.HTTP_PROXY) {
  const SocksProxyAgent = require('socks-proxy-agent');
  const proxyUrl = `socks5://${process.env.PROXY_HOST}:${process.env.PROXY_PORT}`;
  const agent = new SocksProxyAgent(proxyUrl);
  axiosInstance = axios.create({
    httpAgent: agent,
    httpsAgent: agent,
    timeout: 60000
  });
  configuration.baseOptions = { httpAgent: axiosInstance.defaults.httpsAgent };
}
const openai = new OpenAIApi(configuration);

/**
 * 根据文本生成图片
 * @param req 请求对象，包含target(诉说对象)、message(想说的话)和style(图片风格)
 * @param res 响应对象
 */
// 修改图片生成请求
export const generateImage = async (req: Request, res: Response) => {
  try {
    const { target, message, style } = req.body;
    
    if (!target || !message || !style) {
      return res.status(400).json({
        status: 'error',
        message: '请提供诉说对象、想说的话和图片风格'
      });
    }

    // 构建提示词
    const prompt = `生成一张${style}风格的图片，描绘一个孩子正在对${target}说："${message}"。图片应该温馨、治愈，适合儿童。`;
    
    let imageUrl;
    
    try {
      // 尝试调用OpenAI API生成图片
      console.log('正在调用OpenAI API生成图片，提示词:', prompt);
      console.log('使用的API密钥:', process.env.OPENAI_API_KEY ? '已设置' : '未设置');
      
      // 添加重试机制
let retries = 3;
let response;
while (retries > 0) {
  try {
    response = await axios.post('https://api.302ai.cn/v1/images/generations', {
      prompt,
      n: 1,
      size: "1024x1024",
      model: "dall-e-3",
      quality: "standard",
      style: "natural"
    }, {
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    });
    break; // 如果成功，跳出循环
  } catch (error) {
    retries--;
    if (retries === 0) throw error; // 如果重试次数用完，抛出错误
    console.log(`API调用失败，剩余重试次数: ${retries}次`);
    await new Promise(resolve => setTimeout(resolve, 5000)); // 等待5秒后重试
  }
}
      
      console.log('OpenAI API调用成功，获取到响应数据:', JSON.stringify(response.data));
      // 检查响应数据结构
      if (response.data && response.data.data && Array.isArray(response.data.data) && response.data.data.length > 0 && response.data.data[0].url) {
        imageUrl = response.data.data[0].url;
        console.log('成功获取到图片URL:', imageUrl);
      } else {
        throw new Error('API响应数据格式不正确');
      }
    } catch (apiError) {
      console.error('OpenAI API调用失败，详细错误:', apiError);
      console.error('错误消息:', apiError.message);
      console.error('错误响应:', apiError.response?.data);
      // 使用备用图片URL（根据风格选择不同的图片）
      const fallbackImages = {
        'cartoon': 'https://images.unsplash.com/photo-1566140967404-b8b3932483f5?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&h=512&q=80',
        'handdrawn': 'https://images.unsplash.com/photo-1569172122301-bc5008bc09c5?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&h=512&q=80',
        '3d': 'https://images.unsplash.com/photo-1535572290543-960a8046f5af?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&h=512&q=80',
        'watercolor': 'https://images.unsplash.com/photo-1579783901586-d88db74b4fe4?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&h=512&q=80',
        'pixar': 'https://images.unsplash.com/photo-1611457194403-d3aca4cf9d11?ixlib=rb-1.2.1&auto=format&fit=crop&w=512&h=512&q=80'
      };
      
      imageUrl = fallbackImages[style as keyof typeof fallbackImages] || fallbackImages.cartoon;
    }
    
    res.status(200).json({
      status: 'success',
      data: {
        imageUrl,
        prompt
      }
    });
  } catch (error: any) {
    console.error('生成图片时出错:', error);
    res.status(500).json({
      status: 'error',
      message: '生成图片时出错',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};