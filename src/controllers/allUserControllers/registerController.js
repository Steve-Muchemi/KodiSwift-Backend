const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json');
const { generateProfilePicture } = require('./generateProfilePicture');
const AWS = require('aws-sdk');
const { registerSchema } = require('../../Validators/register.Validator');

const handleErrors = ((error) => {
    const Error = {};

    if(error.errorResponse.code == 11000 && error.errorResponse.keyValue.email) {
        return Error.email = "That email is already registered"
    };

    if(error.errorResponse.code == 11000 && error.errorResponse.keyValue.phone){
        return Error.phone = "That phone number is already registered"
    };
    if(error.errorResponse.code == 11000 && error.errorResponse.keyValue.username){
        return Error.username = "That username is already registered"
    };
    
})

const RegisterController = async (req, res) => {
    try {
        const { name, username, password, email, phone } = req.body;

        // Validate the request body
        const  { error } = registerSchema.validate(req.body);

        if(error) {
            return res.status(202).json({
                "error": error.details[0].message
            });
        }

        try {
            // await checkUserExists(email);
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

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        const Error = handleErrors(error);

        return res.status(500).json({error: Error})
        // console.log(error.errorResponse.code);
        // res.status(500).json({ error: 'User registration failed', message: 'Internal error' });
    }
};






module.exports = RegisterController;
