import express from 'express';
import * as communityController from '../controllers/communityController';

const router = express.Router();

// 获取社区帖子列表
router.get('/posts', communityController.getPosts);

// 获取单个帖子详情
router.get('/posts/:id', communityController.getPostById);

// 创建新帖子
router.post('/create', communityController.createPost);

// 添加评论
router.post('/comment', communityController.addComment);

// 点赞帖子
router.post('/like', communityController.likePost);

// 获取热门话题
router.get('/trending', communityController.getTrendingTopics);

// 获取专家列表
router.get('/experts', communityController.getExperts);

export default router;