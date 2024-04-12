const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');
const { generateProfilePicture } = require('./generateProfilePicture');
const AWS = require('aws-sdk');

const RegisterController = async (req, res) => {
    try {
        const { name, username, password, email, phone } = req.body;
        console.log(name, username, password, email, phone, 'data being passed')

        // Confirm all the variables have been passed
        if (!name || !password || !username || !phone) {
            return res.status(400).json({ error: 'User registration failed', message: 'Please enter all your details' });
        }

        // Checking first if the user is registered
        async function checkUserExists(mail) {
            const user = await User.findOne({ email: mail });

            if (user) {
                throw new Error('User already exists, kindly login');
            }
        }

        try {
            await checkUserExists(email);
        } catch (error) {
            return res.status(400).json({ error: 'User registration failed', message: 'User already exists, Kindly login' });
        }

        /*

        // Generate a default profile picture using the first letter of the username
        const profilePictureBuffer = await generateProfilePicture(username);

        // Upload the default profile picture to Amazon S3
        const s3 = new AWS.S3();
        const params = {
            Bucket: 'kodiswift/All/',
            Key: 'profile.png', // Customize the filename
            Body: profilePictureBuffer,
            ACL: 'public-read',
            ContentType: 'image/png',
        };
        const s3Response = await s3.upload(params).promise();
 */
        // Hash the password before storing it
        const hashedPassword = await bcrypt.hash(password, 10);
       
        // Create a new user document with the hashed password
        const newUser = new User({
            name,
            username,
            password: hashedPassword,
            email,
            phone,
           // profilePictureUrl: s3Response.Location, // Store the profile picture URL in the database
        });

        // Save the new user to the database
        await newUser.save();

        // Creating an auth session for the user with jwt immediately after registration
        const payload = {
            user: {
                id: newUser.id,
                email: newUser.email,
            },
        };
        const secret = config.secretKey;

        const token = jwt.sign(payload, secret, { expiresIn: '1h' });

        const user = {
            token,
            id: newUser.id,
            email: newUser.email,
        }

        res.status(201).json({ message: 'User registered successfully', user });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: 'User registration failed', message: 'Internal error' });
    }
};






module.exports = RegisterController;
