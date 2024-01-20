const User = require('../../models/userModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../../config/config.json')



const RegisterController = async (req, res) => {

  /*
  * Allows users to signup with email, username and password
  * Users gets logged in instataniously after signing up. 
  */

 
   /**
	 * Improvements needed:
	 *  - Confirmaition code sent to their email or phone number (otp)
   *  
   * Other Improvements that might be needed
   *  Easier signup -> eg. Sign up with only phone number and username --- not yet thought through this but might be required
	 */

      try {
      const { username, password, email, UserType } = req.body;
      //confirm all the variables have been passed

      if (!username || !password || !email ){
     return res.status(400).json({ error: 'User registration failed', message: 'Please enter all your details' });
    //400 - bad request. issued when there is an issue with the clients request
    
      }


      //checking first if the user is registered.
      async function checkUserExists(mail){
        const user = await User.findOne({email: mail});
        

        if (user){

        throw new Error('User already exists, kindly login')
        
        }
      }

      try {
    await checkUserExists(email);
      } catch(error){
        return res.status(400).json({error: 'User regestration failed', message:'User already exists, Kindly login'})
      }
      
            
      
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

     

      res.status(201).json({ message: 'User registered successfully', token });


    } catch (error) {
      res.status(500).json({ error: 'User registration failed', message: 'Internal error' });
    }

   
  
};


module.exports = RegisterController;


