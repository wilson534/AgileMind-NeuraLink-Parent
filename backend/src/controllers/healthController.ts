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
    
    // 生成三条个性化建议
    const personalizedAdvice = generatePersonalizedAdvice(analysisData);
    
    // 返回分析结果
    res.status(200).json({
      status: 'success',
      data: {
        advice: personalizedAdvice
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

const generatePersonalizedAdvice = (data: any) => {
  const adviceList = [];
  
  // 1. 饮食建议
  const mealAdvice = generateMealAdvice(data.meals);
  if (mealAdvice) adviceList.push(mealAdvice);
  
  // 2. 运动建议
  const exerciseAdvice = generateExerciseAdvice(data.exercise);
  if (exerciseAdvice) adviceList.push(exerciseAdvice);
  
  // 3. 睡眠建议
  const sleepAdvice = generateSleepAdvice(data.sleep);
  if (sleepAdvice) adviceList.push(sleepAdvice);
  
  return adviceList;
};

const generateMealAdvice = (meals: any) => {
  const { breakfast, lunch, dinner } = meals;
  const allMeals = [breakfast, lunch, dinner];
  
  // 检查是否所有餐次都有描述
  const hasAllMeals = allMeals.every(meal => meal.description);
  
  if (!hasAllMeals) {
    return {
      type: '饮食',
      title: '完善饮食记录',
      content: '建议您记录每一餐的饮食内容，这样我们可以更好地为您提供饮食建议。'
    };
  }
  
  // 分析营养均衡
  const allContent = allMeals.map(meal => meal.description.toLowerCase()).join(' ');
  const hasProtein = /(肉|鱼|蛋|豆|牛奶)/.test(allContent);
  const hasVegetables = /(蔬菜|青菜|白菜|胡萝卜|西兰花)/.test(allContent);
  const hasGrains = /(米饭|面条|馒头|面包|粥)/.test(allContent);
  
  if (!hasProtein || !hasVegetables || !hasGrains) {
    return {
      type: '饮食',
      title: '营养均衡建议',
      content: '您的饮食结构需要调整：' + 
        (!hasProtein ? '建议增加蛋白质摄入，如瘦肉、鱼类、蛋类等；' : '') +
        (!hasVegetables ? '建议增加蔬菜摄入，保证营养均衡；' : '') +
        (!hasGrains ? '建议适当增加主食摄入。' : '')
    };
  }
  
  return null;
};

const generateExerciseAdvice = (exercise: any) => {
  const { type, duration } = exercise;
  
  if (!type || !duration) {
    return {
      type: '运动',
      title: '运动建议',
      content: '建议您每天进行30分钟以上的中等强度运动，可以选择步行、游泳、骑自行车等运动方式。'
    };
  }
  
  const durationNum = parseInt(duration, 10) || 0;
  
  if (durationNum < 30) {
    return {
      type: '运动',
      title: '增加运动时间',
      content: `您当前的运动时间为${duration}分钟，建议增加到30分钟以上，可以分多次进行。`
    };
  }
  
  return null;
};

const generateSleepAdvice = (sleep: any) => {
  const { totalHours } = sleep;
  
  if (!totalHours) {
    return {
      type: '睡眠',
      title: '睡眠记录建议',
      content: '建议您记录每天的睡眠时间，保持规律的作息习惯。'
    };
  }
  
  const hoursNum = parseFloat(totalHours) || 0;
  
  if (hoursNum < 8) {
    return {
      type: '睡眠',
      title: '改善睡眠质量',
      content: `您当前的睡眠时间为${totalHours}小时，建议增加到8小时以上，保持规律的作息时间。`
    };
  }
  
  return null;
};