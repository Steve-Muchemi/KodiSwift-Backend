const Blacklist = require('../../models/blacklisted');


const logoutController = async (req, res)=>{

 try{

 
    /**
     * saves the token to a blacklist
     * 
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
  } catch(error){
  res.status(500).json({error:'Server Error'})
  }
  }
  
  module.exports = logoutController;
  