// controllers/commentController.js
const Comment = require('../models/commentSchema');
const Post = require('../models/connectPostSchema');
const coinController = require('./CoinController');
const DBUsers = require('../models/userModel');
const { v4: uuidv4 } = require('uuid');

const commentController = {
  createComment: async (req, res) => {
    const {
      postId,
      text,
      userId,
      reactions,
      replyTo,
      username,
    } = req.body;
  
    // Validate whether the user's location is within the post's allowed location
    const postSetLocation = async () => {
      try {
        const post = await Post.find({ postId: postId })
        
        if (!post) {
          return res.status(404).json({ message: 'Post not found' });
        }
  
        return post[0].coordinates; // Assuming post has a location field
      } catch (error) {
        console.log(error);
        return null;
      }
    };
  
    
    const usersSetLocation = async () => {
      try {
        const user = await DBUsers.findById(userId);
        
        if (!user) {
          return res.status(404).json({ message: 'User not found' });
        }
  
        if (!user.coordinates) {
          return res.status(400).json({ message: 'User not allowed to comment. Location not set' });
        }
  
        return user.coordinates;
      } catch (err) {
        console.log(err);
        return null;
      }
    };
  
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
      // Calculate distance between two coordinates (Haversine formula)
      const R = 6371; // Radius of the Earth in km
      const dLat = (lat2 - lat1) * (Math.PI / 180);
      const dLon = (lon2 - lon1) * (Math.PI / 180);
      const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
                Math.cos(lat1 * (Math.PI / 180)) * Math.cos(lat2 * (Math.PI / 180)) *
                Math.sin(dLon / 2) * Math.sin(dLon / 2);
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = R * c;
  
      return distance; // Distance in km
    };
  
    const postLocation = await postSetLocation(); // get location of the post.
    const userLocation = await usersSetLocation(); // get the location of user commenting
    console.log(postLocation, 'postlocation')
    if (!postLocation || !userLocation) {
      return res.status(400).json({ message: 'Failed to retrieve location data' });
    } else{
      console.log('postLocation', postLocation, 'userlocation', userLocation)
    }
  
    const distance = calculateDistance(
      postLocation[0], postLocation[1],
      userLocation[0], userLocation[1]
    );
  
    console.log('distance is', distance, 'km')
    // Check if user is within the allowed range (e.g., 5 km)
    if (distance > 105) { // Adjust the range as needed
      return res.status(400).json({ message: 'User is not within the allowed location range' });
    } else{
    console.log('distance check passed')
    }
  
    // Create and save the comment
    try {
      const newComment = await Comment.create({
        commentId: uuidv4(),
        postId: postId,
        text: text,
        replyTo: replyTo,
        username: username,
        userId: userId,
      });
  
      // Reward user with coins for commenting
      await coinController.addCoins(userId, 5); // Reward 5 coins for commenting
  
      // Reward user with coins based on the reaction
      const rewardCoinsBasedOnReaction = async (reactions) => {
        let coinsToAdd = 0;
  
        if (reactions && reactions.like > 0) {
          coinsToAdd += reactions.like * 3; // Reward 3 coins for each like
        }
  
        if (reactions && reactions.superReact > 0) {
          coinsToAdd += reactions.superReact * 7; // Reward 7 coins for each superReact
        }
  
        // Deduct 2 coins for each angry reaction
        if (reactions && reactions.angry > 0) {
          coinsToAdd -= reactions.angry * 2;
        }
  
        return coinsToAdd;
      };
  
      const rewardCoins = await rewardCoinsBasedOnReaction(reactions);
      
      // Reward user with coins
      if (rewardCoins > 0) {
        await coinController.addCoins(userId, rewardCoins);
      } else if (rewardCoins < 0) {
        await coinController.deductCoins(userId, Math.abs(rewardCoins)); // Deduct negative coins
      }
  
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
  },
  


  updateCommentById: async (req, res) => {
    try {
      const { commentId } = req.params;
      const { text } = req.body;
  
      const updatedComment = await Comment.findByIdAndUpdate(
        commentId,
        { text: text },
        { new: true }
      );
  
      if (!updatedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      res.json(updatedComment);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },



  deleteCommentById: async (req, res) => {
    try {
      const { commentId } = req.params;
  
      const deletedComment = await Comment.findByIdAndDelete(commentId);
  
      if (!deletedComment) {
        return res.status(404).json({ message: 'Comment not found' });
      }
  
      res.json({ message: 'Comment deleted successfully', deletedComment });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  }
  


  
};

module.exports = commentController;

