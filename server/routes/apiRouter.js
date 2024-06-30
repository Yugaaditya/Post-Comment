const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController.js');
const commentController = require('../controllers/commentController.js');
const verifyToken = require('../middleware/verifyToken');

router.get('/post', postController.getAllPosts);
router.post('/post/add',verifyToken, postController.insertPost);
router.post('/comments',commentController.getCommentsOfPost)
router.post('/comments/add',verifyToken, commentController.insertCommentOfPost)

module.exports = router;