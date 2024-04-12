// controllers/coinController.js

const User = require('../models/userModel');

const coinController = {
  // Add coins to user's balance
  addCoins: async (userId, amount) => {
    try {
      const user = await User.findById(userId);
      user.coins += amount;
      await user.save();
      return user;
    } catch (err) {
      throw new Error('Error adding coins to user balance');
    }
  },

  // Deduct coins from user's balance
  deductCoins: async (userId, amount) => {
    try {
      const user = await User.findById(userId);
      if (user.coins < amount) {
        throw new Error('Insufficient coins');
      }
      user.coins -= amount;
      await user.save();
      return user;
    } catch (err) {
      throw new Error('Error deducting coins from user balance');
    }
  }
};

module.exports = coinController;
