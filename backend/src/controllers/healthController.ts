import { Request, Response } from 'express';
import axios from 'axios';

/**
 * 分析健康数据并生成建议
 * @param req 请求对象，包含饮食、运动和睡眠信息
 * @param res 响应对象
 */
export const analyzeHealthData = async (req: Request, res: Response) => {
  try {
    // 从请求中获取数据
    const {
      breakfastDescription,
      lunchDescription,
      dinnerDescription,
      exerciseType,
      exerciseDuration,
      exerciseDescription,
      sleepStartTime,
      sleepEndTime,
      sleepTotalHours
    } = req.body;
    
    // 获取上传的图片文件（如果有）
    const breakfastImage = req.files && 'breakfastImage' in req.files ? req.files.breakfastImage[0] : null;
    const lunchImage = req.files && 'lunchImage' in req.files ? req.files.lunchImage[0] : null;
    const dinnerImage = req.files && 'dinnerImage' in req.files ? req.files.dinnerImage[0] : null;
    
    // 构建分析数据
    const analysisData = {
      meals: {
        breakfast: {
          description: breakfastDescription || '',
          hasImage: !!breakfastImage
        },
        lunch: {
          description: lunchDescription || '',
          hasImage: !!lunchImage
        },
        dinner: {
          description: dinnerDescription || '',
          hasImage: !!dinnerImage
        }
      },
      exercise: {
        type: exerciseType || '',
        duration: exerciseDuration || '',
        description: exerciseDescription || ''
      },
      sleep: {
        startTime: sleepStartTime || '',
        endTime: sleepEndTime || '',
        totalHours: sleepTotalHours || ''
      }
    };
    
    // 分析饮食情况
    const mealAnalysis = analyzeMeals(analysisData.meals);
    
    // 分析运动情况
    const exerciseAnalysis = analyzeExercise(analysisData.exercise);
    
    // 分析睡眠情况
    const sleepAnalysis = analyzeSleep(analysisData.sleep);
    
    // 组合建议
    const healthAdvice = `根据您提供的信息，我们的健康专家建议：\n${mealAnalysis}\n${exerciseAnalysis}\n${sleepAnalysis}`;
    
    // 返回分析结果
    res.status(200).json({
      status: 'success',
      data: {
        advice: healthAdvice
      }
    });
  } catch (error: any) {
    console.error('分析健康数据时出错:', error);
    res.status(500).json({
      status: 'error',
      message: '分析健康数据时出错',
      error: process.env.NODE_ENV === 'development' ? error.message : undefined
    });
  }
};

/**
 * 分析饮食情况
 * @param meals 三餐信息
 * @returns 饮食建议
 */
const analyzeMeals = (meals: any) => {
  const { breakfast, lunch, dinner } = meals;
  let advice = '';
  
  // 分析早餐
  if (!breakfast.description && !breakfast.hasImage) {
    advice += '1. 未提供早餐信息。建议：\n';
    advice += '   - 早餐应包含蛋白质、碳水化合物和水果\n';
    advice += '   - 可以选择牛奶、鸡蛋、全麦面包等\n';
    advice += '   - 避免过于油腻的食物\n';
  } else {
    const breakfastContent = breakfast.description.toLowerCase();
    const hasProtein = /(牛奶|鸡蛋|豆|肉|鱼)/.test(breakfastContent);
    const hasCarbs = /(面包|粥|馒头|包子)/.test(breakfastContent);
    const hasFruit = /(水果|苹果|香蕉|橙子)/.test(breakfastContent);
    
    advice += '1. 早餐分析：\n';
    if (hasProtein) {
      advice += '   - 蛋白质摄入充足\n';
    } else {
      advice += '   - 建议增加蛋白质摄入\n';
    }
    if (hasCarbs) {
      advice += '   - 碳水化合物摄入充足\n';
    } else {
      advice += '   - 建议增加碳水化合物摄入\n';
    }
    if (hasFruit) {
      advice += '   - 水果摄入充足\n';
    } else {
      advice += '   - 建议增加水果摄入\n';
    }
  }
  
  // 分析午餐和晚餐
  const lunchContent = lunch.description.toLowerCase();
  const dinnerContent = dinner.description.toLowerCase();
  
  advice += '2. 午餐和晚餐分析：\n';
  
  const hasVegetables = /(蔬菜|青菜|白菜|胡萝卜)/.test(lunchContent + dinnerContent);
  const hasProtein = /(肉|鱼|蛋|豆)/.test(lunchContent + dinnerContent);
  const hasGrains = /(米饭|面条|馒头|面包)/.test(lunchContent + dinnerContent);
  
  if (hasVegetables) {
    advice += '   - 蔬菜摄入充足\n';
  } else {
    advice += '   - 建议增加蔬菜摄入\n';
  }
  if (hasProtein) {
    advice += '   - 蛋白质摄入充足\n';
  } else {
    advice += '   - 建议增加蛋白质摄入\n';
  }
  if (hasGrains) {
    advice += '   - 主食摄入充足\n';
  } else {
    advice += '   - 建议增加主食摄入\n';
  }
  
  return advice;
};

/**
 * 分析运动情况
 * @param exercise 运动信息
 * @returns 运动建议
 */
const analyzeExercise = (exercise: any) => {
  const { type, duration, description } = exercise;
  let advice = '';
  
  if (!type || !duration) {
    advice += '3. 未提供完整的运动信息，建议：\n';
    advice += '   - 每天至少进行30分钟中等强度运动\n';
    advice += '   - 选择适合孩子年龄的运动项目\n';
    advice += '   - 注意运动安全\n';
  } else {
    const durationNum = parseInt(duration, 10) || 0;
    
    if (durationNum < 30) {
      advice += `3. <运动时间>${duration}分钟略显不足。建议：\n`;
      advice += '   - 增加运动时间至30分钟以上\n';
      advice += '   - 可以分多次进行，每次15-20分钟\n';
      advice += '   - 选择孩子感兴趣的运动项目\n';
    } else if (durationNum >= 30 && durationNum < 60) {
      advice += `3. <运动时间>${duration}分钟达到了基本要求。建议：\n`;
      advice += '   - 可以适当增加运动强度\n';
      advice += '   - 尝试不同类型的运动\n';
      advice += '   - 注意运动后的休息和补充水分\n';
    } else {
      advice += `3. <运动时间>${duration}分钟非常充足。建议：\n`;
      advice += '   - 注意运动强度要适中\n';
      advice += '   - 确保充分的休息时间\n';
      advice += '   - 及时补充水分和营养\n';
    }
  }
  
  return advice;
};

/**
 * 分析睡眠情况
 * @param sleep 睡眠信息
 * @returns 睡眠建议
 */
const analyzeSleep = (sleep: any) => {
  const { totalHours } = sleep;
  let advice = '';
  
  if (!totalHours) {
    advice += '4. 未提供睡眠时长信息，6-12岁的孩子建议每天睡眠9-12小时。\n';
  } else {
    const hoursNum = parseFloat(totalHours) || 0;
    
    if (hoursNum < 8) {
      advice += `4. <睡眠时长>${totalHours}小时明显不足，可能影响孩子的生长发育和学习能力。建议：\n`;
      advice += '   - 提前30分钟上床准备睡觉\n';
      advice += '   - 避免睡前使用电子设备\n';
      advice += '   - 保持规律的作息时间\n';
      advice += '   - 创造安静、舒适的睡眠环境\n';
    } else if (hoursNum >= 8 && hoursNum < 9) {
      advice += `4. <睡眠时长>${totalHours}小时基本达标，但仍有提升空间。建议：\n`;
      advice += '   - 尝试增加30分钟睡眠时间\n';
      advice += '   - 保持规律的作息时间\n';
      advice += '   - 确保睡眠质量\n';
    } else if (hoursNum >= 9 && hoursNum <= 12) {
      advice += `4. <睡眠时长>${totalHours}小时充足，有助于孩子的身心健康发展。建议：\n`;
      advice += '   - 继续保持规律的作息时间\n';
      advice += '   - 注意观察孩子的精神状态\n';
    } else {
      advice += `4. <睡眠时长>${totalHours}小时过长，可能影响日间活动。建议：\n`;
      advice += '   - 适当减少睡眠时间\n';
      advice += '   - 增加日间活动量\n';
      advice += '   - 保持规律的作息时间\n';
    }
  }
  
  return advice;
};