// controllers/postController.js

const Post = require('../models/Post');

// Controller methods for CRUD operations on posts
const postController = {
  // Create a new post
  createPost: async (req, res) => {
    try {
      const newPost = await Post.create(req.body);
      res.status(201).json(newPost);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },
  
  // Get all posts
  getAllPosts: async (req, res) => {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  // Get a single post by ID
  getPostById: async (req, res) => {
    try {
      const post = await Post.findById(req.params.postId);
      res.json(post);
    } catch (err) {
      res.status(404).json({ error: 'Post not found' });
    }
  },

  // Update a post by ID
  updatePost: async (req, res) => {
    try {
      const updatedPost = await Post.findByIdAndUpdate(req.params.postId, req.body, { new: true });
      res.json(updatedPost);
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  },

  // Delete a post by ID
  deletePost: async (req, res) => {
    try {
      await Post.findByIdAndDelete(req.params.postId);
      res.json({ message: 'Post deleted successfully' });
    } catch (err) {
      res.status(400).json({ error: err.message });
    }
  }
};

module.exports = postController;
