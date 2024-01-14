const mongoose = require('mongoose');
const messageSchema = new mongoose.Schema({


    sender: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
      receiver: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User', // Reference to the User model
        required: true,
      },
      content: String,
      timestamp: {
        type: Date,
        default: Date.now,
      },
});

const message = mongoose.model('message', messageSchema);

module.exports = message; 