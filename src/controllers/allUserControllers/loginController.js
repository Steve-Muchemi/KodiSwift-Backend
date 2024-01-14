const User = require('../../models/userModel');
const jwt = require('jsonwebtoken');


const loginController = async(req, res)=>{

    /**
	 * Improvements needed:
	 * Sign up with either email or username. Not both but offer either of the two options
     * compare if stored password is same with the one in the db before creating a jwt token
     * 
	 */


    try {
      const { email, password } = req.body;
      let user = await User.findOne({ email });

      if (!user) {
        return res.status(400).json({ message: 'Invalid credentials' });
      }

           

    // Creating an auth session for the user with jwt
      const payload = { 
        user: {
          id: user.id,
          email: user.email
        },
      };
      const secret = 'secretkey';

      const token = jwt.sign(payload, secret, { expiresIn: '1h' });

      console.log('Generated token: ', token);

      res.status(200).json({ 'token': token, 'username': user.username });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  };

module.exports = loginController;