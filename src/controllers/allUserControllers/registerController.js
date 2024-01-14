const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json')



const RegisterController = async (req, res) => {

  /*
  * Allows users to signup. users gets logged in instataniously after signing up. 
  */

 
   /**
	 * Improvements needed:
	 * - check if user is registered first before registering them
   *  - Confirmaition code sent to their email or phone number (otp)
   *  
   * Other Improvements that might be needed
   *  Easier signup -> eg. Sign up with only phone number and username --- not yet thought through this but might be required
	 */

    try {
      const { username, password, email, UserType } = req.body;
      // Hash the password before storing it
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create a new user document with the hashed password
      const newUser = new User({
        username,
        password: hashedPassword,
        email,
        UserType: UserType,
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

      console.log('Generated token: ', token);

      res.status(201).json({ message: 'User registered successfully', user: newUser, token });


    } catch (error) {
      res.status(500).json({ error: 'User registration failed', message: error.message });
    }

   
  
};


module.exports = RegisterController;


