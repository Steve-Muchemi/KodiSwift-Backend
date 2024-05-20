const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config/config.json')

const loginController = async (req, res) => {
    try {
        const { phone, username, password } = req.body;

        // User can login with phone or username
        let user;
        if (phone) {
            user = await User.findOne({ phone });
        } else if (username) {
            user = await User.findOne({ username });
        }

        if (!user) {
            return res.status(401).json({ error: 'Unauthorized', message: 'Invalid credentials' });
        }

        // Check if passwords match
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ error: 'Unauthorized', message: 'Invalid credentials' });
        }

        // Creating an auth session for the user with jwt
        const payload = {
            user: {
                id: user.id,
                email: user.email
            },
        };
        const secret = config.secretKey;

        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        res.status(200).json({ 'token': token, 'coordinates': user.coordinates, 'username': user.username, 'userid': user._id, 'email': user.email, 'profilepic': user.profilepic });
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error');
    }
};

module.exports = loginController;
