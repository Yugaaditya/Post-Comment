const Post = require('../models/postModel');
const User = require('../models/userModel');


const getAllPosts = async (req, res) => {
    const { offset, limit} = req.query;
    try {
        const posts = await Post.find().populate('user').skip(parseInt(offset)).limit(parseInt(limit));

        res.json(posts);

    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

const insertPost = async (req, res) => {
    const { content } = req.body;
    const userId = req.userId;
    try {
        const newPost = new Post({
            content: content,
            user: userId
        });

        let savedPost = await newPost.save();
        let user = await User.findByIdAndUpdate(userId, { $push: { posts: savedPost._id } });
        savedPost = { ...savedPost.toObject(), user:user }
        res.status(201).json(savedPost);

    } catch (error) {
        console.error('Error inserting post:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
};


module.exports = {
    getAllPosts,
    insertPost
};