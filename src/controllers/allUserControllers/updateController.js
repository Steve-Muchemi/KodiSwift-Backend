const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');

const updateController = async (req, res) => {
  const { userId, email, password, username } = req.body;

  try {
    // Find the user in the database
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update email if provided
    if (email) {
      user.email = email;
    }

    // Update username if provided
    if (username) {
      user.username = username;
    }

    // Update password if provided
    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      user.password = hashedPassword;
    }

    // Save the updated user data to the database
    await user.save();

    return res.status(200).json({ message: 'User updated successfully', Userdetails: user });
  } catch (error) {
    console.error('Error updating user:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
};

module.exports = updateController;
