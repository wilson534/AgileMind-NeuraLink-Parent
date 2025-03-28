import { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

interface HealthScore {
  date: string;
  dietScore: number;
  exerciseScore: number;
  sleepScore: number;
}

/**
 * 获取最近一周的健康状态数据
 * @param req 请求对象
 * @param res 响应对象
 */
export const getWeeklyHealthStatus = async (req: Request, res: Response) => {
  try {
    const userId = req.user?.id; // 假设通过认证中间件获取用户ID
    
    // 获取最近7天的日期范围
    const endDate = new Date();
    const startDate = new Date();
    startDate.setDate(startDate.getDate() - 6);
    
    // 从数据库获取健康记录
    const healthRecords = await prisma.healthRecord.findMany({
      where: {
        userId,
        date: {
          gte: startDate,
          lte: endDate
        }
      },
      orderBy: {
        date: 'asc'
      }
    });
    
    // 计算每日健康评分
    const weeklyData: HealthScore[] = healthRecords.map(record => ({
      date: record.date.toISOString().split('T')[0],
      dietScore: calculateDietScore(record),
      exerciseScore: calculateExerciseScore(record),
      sleepScore: calculateSleepScore(record)
    }));
    
    // 补充缺失的日期数据
    const completeWeeklyData = fillMissingDates(weeklyData, startDate, endDate);
    
    res.status(200).json({
      status: 'success',
      data: completeWeeklyData
    });
  } catch (error: any) {
    console.error('获取周健康状态数据时出错:', error);
    res.status(500).json({
      status: 'error',
      message: '获取健康状态数据时出错',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * 计算饮食评分
 */
const calculateDietScore = (record: any): number => {
  let score = 0;
  
  // 检查三餐是否完整
  if (record.breakfastDescription) score += 1;
  if (record.lunchDescription) score += 1;
  if (record.dinnerDescription) score += 1;
  
  // 检查营养均衡性
  const hasProtein = /(鸡蛋|牛奶|肉|鱼|豆)/.test(record.breakfastDescription + record.lunchDescription + record.dinnerDescription);
  const hasVegetables = /(蔬菜|青菜|白菜|胡萝卜)/.test(record.breakfastDescription + record.lunchDescription + record.dinnerDescription);
  const hasGrains = /(米饭|面条|馒头|面包)/.test(record.breakfastDescription + record.lunchDescription + record.dinnerDescription);
  
  if (hasProtein) score += 1;
  if (hasVegetables) score += 1;
  if (hasGrains) score += 1;
  
  return Math.min(score, 6); // 最高6分
};

/**
 * 计算运动评分
 */
const calculateExerciseScore = (record: any): number => {
  let score = 0;
  
  if (!record.exerciseType || !record.exerciseDuration) return 0;
  
  const duration = parseInt(record.exerciseDuration);
  
  // 根据运动时长评分
  if (duration >= 60) score += 3;
  else if (duration >= 30) score += 2;
  else if (duration > 0) score += 1;
  
  // 根据运动强度评分
  const intensity = record.exerciseIntensity || 'medium';
  switch (intensity) {
    case 'high':
      score += 2;
      break;
    case 'medium':
      score += 1;
      break;
  }
  
  return Math.min(score, 5); // 最高5分
};

/**
 * 计算睡眠评分
 */
const calculateSleepScore = (record: any): number => {
  if (!record.sleepTotalHours) return 0;
  
  const hours = parseFloat(record.sleepTotalHours);
  
  // 根据睡眠时长评分
  if (hours >= 9) return 5;
  if (hours >= 8) return 4;
  if (hours >= 7) return 3;
  if (hours >= 6) return 2;
  return 1;
};

/**
 * 补充缺失的日期数据
 */
const fillMissingDates = (data: HealthScore[], startDate: Date, endDate: Date): HealthScore[] => {
  const result: HealthScore[] = [];
  const currentDate = new Date(startDate);
  
  while (currentDate <= endDate) {
    const dateStr = currentDate.toISOString().split('T')[0];
    const existingData = data.find(d => d.date === dateStr);
    
    if (existingData) {
      result.push(existingData);
    } else {
      result.push({
        date: dateStr,
        dietScore: 0,
        exerciseScore: 0,
        sleepScore: 0
      });
    }
    
    currentDate.setDate(currentDate.getDate() + 1);
  }
  
  return result;
}; 