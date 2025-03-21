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
    const breakfastImage = req.files?.breakfastImage;
    const lunchImage = req.files?.lunchImage;
    const dinnerImage = req.files?.dinnerImage;
    
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
    
    // 在实际应用中，这里应该调用AI健康专家API
    // 例如使用OpenAI或火山引擎的API进行分析
    
    // 模拟调用AI健康专家API
    let healthAdvice = '';
    
    // 分析饮食情况
    const mealAnalysis = analyzeMeals(analysisData.meals);
    
    // 分析运动情况
    const exerciseAnalysis = analyzeExercise(analysisData.exercise);
    
    // 分析睡眠情况
    const sleepAnalysis = analyzeSleep(analysisData.sleep);
    
    // 组合建议
    healthAdvice = `根据您提供的信息，我们的健康专家建议：\n${mealAnalysis}\n${exerciseAnalysis}\n${sleepAnalysis}`;
    
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
    advice += '1. 未提供早餐信息，建议早餐应包含<蛋白质>、碳水化合物和水果，为一天提供充足能量。\n';
  } else if (breakfast.description.includes('牛奶') || breakfast.description.includes('鸡蛋') || breakfast.description.includes('豆')) {
    advice += '1. 早餐中含有优质<蛋白质>，这对孩子的生长发育非常有益。\n';
  } else {
    advice += '1. 建议在早餐中增加<蛋白质>的摄入，如牛奶、鸡蛋或豆制品。\n';
  }
  
  // 分析午餐和晚餐
  if (lunch.description.includes('蔬菜') || dinner.description.includes('蔬菜')) {
    advice += '2. 您的孩子摄入了足够的<蔬菜>，这有助于获取必要的维生素和矿物质。\n';
  } else {
    advice += '2. 建议增加<蔬菜>的摄入量，确保获取足够的维生素和矿物质。\n';
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
    advice += '3. 未提供完整的运动信息，建议孩子每天至少进行30分钟的<中等强度运动>。\n';
  } else {
    const durationNum = parseInt(duration, 10) || 0;
    
    if (durationNum < 30) {
      advice += `3. 当前<运动时间>${duration}分钟略显不足，建议每天至少保持30分钟中等强度运动。\n`;
    } else if (durationNum >= 30 && durationNum < 60) {
      advice += `3. <运动时间>${duration}分钟达到了基本要求，可以适当增加运动强度或尝试不同类型的运动。\n`;
    } else {
      advice += `3. <运动时间>${duration}分钟非常充足，请确保运动强度适中，注意补充水分。\n`;
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
      advice += `4. <睡眠时长>${totalHours}小时明显不足，可能影响孩子的生长发育和学习能力，建议增加睡眠时间。\n`;
    } else if (hoursNum >= 8 && hoursNum < 9) {
      advice += `4. <睡眠时长>${totalHours}小时基本达标，但仍建议增加至9小时以上，可以通过改善<睡眠环境>来提高睡眠质量。\n`;
    } else {
      advice += `4. <睡眠时长>${totalHours}小时充足，有助于孩子的身心健康发展，建议保持规律的作息时间。\n`;
    }
  }
  
  return advice;
};