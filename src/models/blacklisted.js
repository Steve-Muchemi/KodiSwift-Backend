const mongoose = require('mongoose');
const blacklistSchema = new mongoose.Schema({

    
    token: {
        type: String,
        required: true
      },

});


const blacklist = mongoose.model('Blacklist', blacklistSchema);

module.exports = blacklist; 