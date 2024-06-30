const Comment = require('../models/commentModel');
const Post = require('../models/postModel');
const User = require('../models/userModel');

const getCommentsOfPost = async (req, res) => {
    const { postId } = req.body;

    try {
        const comments = await Comment.find({ post: postId }).populate('user');

        res.json(comments);

    } catch (error) {
        console.error('Error fetching comments:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const insertCommentOfPost = async (req, res) => {
    const { postId, text } = req.body;
    const  userId  = req.userId;

    try {
        const newComment = new Comment({
            text: text,
            post: postId,
            user: userId 
        });

        let savedComment = await newComment.save();

        // Add the comment to the post's comments array
        await Post.findByIdAndUpdate(postId, { $push: { comments: savedComment._id } });
        let user=await User.findByIdAndUpdate(userId, { $push: { comments: savedComment._id } });
        savedComment={...savedComment.toObject(),user}
        res.status(201).json(savedComment);

    } catch (error) {
        console.error('Error inserting comment:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
    getCommentsOfPost,
    insertCommentOfPost
};
