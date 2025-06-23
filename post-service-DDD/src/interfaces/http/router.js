const express = require('express');
const CreatePost = require('../../usecases/CreatePost');
const GetAllPosts = require('../../usecases/GetAllPosts');
const PrismaPostRepository = require('../../infrastructure/repositories/PrismaPostRepository');
const PostController = require('./controllers/PostController');

const repo = new PrismaPostRepository();
const ucCreate = new CreatePost(repo);
const ucList = new GetAllPosts(repo);
const ctrl = new PostController(ucCreate, ucList);

const router = express.Router();
router.post('/posts', ctrl.createPost);
router.get('/posts', ctrl.listPosts);
router.get('/health', (_, res) => res.json({ status: 'healthy' }));

module.exports = router;
