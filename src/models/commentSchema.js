const mongoose = require('mongoose');

// Comment Schema
const commentSchema = new mongoose.Schema({
    commentId:{
      type:String,
    }, 
   postId: {
      type:String, 
      required:true,
    },
  
    replyTo: {
      type: String,
    },
   
    text: {
      type: String,
      required: true
    },
    username: {
      type:String,
      required: true,
    },
    timestamp: {
      type: Date,
      default: Date.now
    },
  userId: {
      type:mongoose.Schema.Types.ObjectId,
      ref: 'User', // Reference to the User model
      required: true,
    },

    reactions: {
      likes: {
        type: Number,
        default: 0
      },
      superReact : {
        type: Number,
        default:0
      }
    },

    
    
    
    
  });

  const Comment = mongoose.model('Comment', commentSchema);

  module.exports = Comment