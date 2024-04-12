const express = require('express');
const router = express.Router();
const Post = require('../models/connectPostSchema');

class ConnectPost {
  // Create a new post
  // Create a new post
static async createPost(req, res) {
  try {
    const {
      postId,
      title,
      coordinates,
      amenities,
      additionalInfo,
      rewardsCoins,
      location,
      user,
      coins,
      budget,
    } = req.body;

    const missingFields = [];

    // Check each required field individually
    if (!postId) {
      missingFields.push('postId');
    }
    if (!title) {
      missingFields.push('title');
    }
    if (!coordinates) {
      missingFields.push('coordinates');
    }
    if (!amenities) {
      missingFields.push('amenities');
    }
    if (!additionalInfo) {
      missingFields.push('additionalInfo');
    }
    if (typeof rewardsCoins !== 'boolean') {
      missingFields.push('rewardsCoins');
    }
    if (!location) {
      missingFields.push('location');
    }
    if (!user) {
      missingFields.push('user');
    }
    if (!budget) {
      missingFields.push('budget');
    }

    // If any required fields are missing, return a helpful response
    if (missingFields.length > 0) {
      return res.status(400).json({ message: `Missing required fields: ${missingFields.join(', ')}` });
    }
console.log('coordinates', coordinates)
    const post = new Post({
      postId,
      title,
      coordinates,
      amenities,
      additionalInfo,
      rewardsCoins,
      location,
      user,
      coins,
      budget,
    });

    const savedPost = await post.save();
    res.json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
}







  // Get all posts
  static async getAllPosts(req, res) {
    try {
      const posts = await Post.find();
      res.json(posts);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  // Get a single post by ID
  static async getPostById(req, res) {
    try {
      const post = await Post.find({ postId: req.params.postId });
      if (!post) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(post);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }



  // Get a single post by ID
static async getPostById(req, res) {
  try {
    const postId = req.params.postId;
    if (!postId) {
      return res.status(400).json({ message: 'Post ID is missing from the request parameters' });
    }
console.log('postid', postId)
    const post = await Post.find({ postId: postId });
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }
    
    res.json(post);
  } catch (error) {
    console.error(error);

    // Handle CastError separately to provide a more specific message
    if (error.name === 'CastError') {
      return res.status(400).json({ message: 'Invalid Post ID format' });
    }

    res.status(500).json({ message: 'Server Error' });
  }
}

  // Update a post by ID
  static async updatePost(req, res) {
    try {
     
      const updatedPost = await Post.findOneAndUpdate({ postId: req.params.postId }, req.body, { new: true });

      if (!updatedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json(updatedPost);
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }

  // Delete a post by ID
  static async deletePost(req, res) {
    try {
    
      const deletedPost = await Post.findOneAndDelete({ postId: req.params.postId });


      if (!deletedPost) {
        return res.status(404).json({ message: 'Post not found' });
      }
      res.json({ message: 'Post deleted successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).json({ message: 'Server Error' });
    }
  }
}

// Define routes using the ConnectPost class methods


module.exports = ConnectPost;
