// controllers/commentController.js

const Comment = require('../models/Comment');
const coinController = require('./coinController');

const commentController = {
  // Create a new comment for a post and reward user with coins
  createComment: async (req, res) => {
    try {
      const newComment = await Comment.create({
        text: req.body.text,
        user: req.user._id,
        post: req.params.postId
      });

      // Reward user with coins for commenting
      await coinController.addCoins(req.user._id, 5); // Example: Reward 5 coins for commenting on a post

      res.status(201).json(newComment);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  getCommentsByPostId: async (req, res) => {
    try {
      const comments = await Comment.find({ postId: req.params.postId });
      res.json(comments);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  // Other CRUD operations for comments...
};

module.exports = commentController;
