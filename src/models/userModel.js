const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({


  UserType: {
    type: String,
    required: false,
    default: 'general',
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  phone: {
    type: Number,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: false,
    unique: true
  },
  profilepic: {
    type: String,
    required: false,
    default: 'https://picsum.photos/200/200'
  }
  ,

  coins: {
    type: Number,
    default: 0, // Initial coin balance
    required: false,
  },

  coordinates: {
    type: [Number],
    required: false,
  },
});

const user = mongoose.model('User', userSchema);

module.exports = user; 
