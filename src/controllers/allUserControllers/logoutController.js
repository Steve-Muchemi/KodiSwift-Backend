
const logoutController = async (req, res)=>{

    /**
     * Improvements needed
     * confirm the token is revoked and cannot be reused after login 
     */

    const {user} = req.body;
  
    const authtoken =  req.headers.authorization.replace('Bearer ', '');
     
    const blacklist = new Blacklist({
      user: user,
      token: authtoken,
    }
    )
  
    await blacklist.save();
  
    
    res.json({message: 'Logged out:', user: req.user});
  }
  
  module.exports = logoutController.js;
  