const mongoose = require('mongoose');

// Post Schema
const postSchema = new mongoose.Schema({
  postId:{
    type:String,
    required:true,
  },
  title:{
    type:String,
    required:true,
  },
  
  coordinates: {
    type: [Number], 
    required: true,
  },

  amenities:{
    type:String,
    required:true,
  },
  additionalInfo:{
    type:String,
    required:true,
  },
coins: {
  type:Number,
  required:false,
},
rewardsCoins:{
type: Boolean,
required: true
},
location:{
  type:String,
  required:true,
},
user: {
  type: mongoose.Schema.Types.ObjectId,
  ref: 'User'
},
budget:{
  type:String,
  required:true,
},

});


const Post = mongoose.model('Post', postSchema);


module.exports = Post;
