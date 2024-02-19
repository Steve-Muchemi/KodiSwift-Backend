const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const config = require('../../config/config.json')


const loginController = async(req, res)=>{

    /**
	 * logins a user with their email or username and password
	 * 
   *
   * 
	 */


    try {
      const { email, username, password } = req.body;

      //user can login with username or email
      let user = await User.findOne({ email }) || await User.findOne({ username})

      

      if (!user) {
        return res.status(401).json({ error: 'Unauthorized', message: 'Invalid credentials' });

      } else{

        //check if passwords match
        const isMatch = await bcrypt.compare(password, user.password)
        if(!isMatch){
          return res.status(401).json({ error: 'Unauthorized', message: 'Invalid credentials' });

        }
      }

         

    // Creating an auth session for the user with jwt
      const payload = { 
        user: {
          id: user.id,
          email: user.email 
        },
      };
      const secret = config.secretKey;;

      const token = jwt.sign(payload, secret, { expiresIn: '1h' });

      res.status(200).json({ 'token': token, 'username': user.username, 'userid': user._id, 'email' : user.email, 'profilepic': user.profilepic});
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };

module.exports = loginController;