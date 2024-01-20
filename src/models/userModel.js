const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({


    UserType: {
        type: String,
        required: false,
        default: 'general',
      },
      username: {
        type: String,
        required: true
      },
      password: {
        type: String,
        required: true
      },
      email: {
        type: String,
        required: true
      },
});

const user = mongoose.model('User', userSchema);

module.exports = user; 
