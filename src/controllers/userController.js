const registerController = require('./allUserControllers/registerController');
const loginController = require('./allUserControllers/loginController');
const logoutController = require('./allUserControllers/logoutController');
const deleteController = require('./allUserControllers/deleteController');
const updateController = require('./allUserControllers/updateController');
const getUsersController = require('./allUserControllers/getusersController');
const codeGenerator = require('./allUserControllers/codeGenerator');

class UserController {
    
  
    register(req, res){
        registerController(req, res);
    }

   sendCode(req, res){ 
    codeGenerator(req, res);
  };

    login(req, res) {
        loginController(req, res);
    }

    logout(req, res) {
        logoutController(req,res);
     }
    
     update(req, res) {
        console.log('called update')
        updateController(req, res);
     }
     


    deleteAccount(req, res) {
      deleteController(req,res);
     }
   
     getuserbyid(req, res){
        getUsersController(req, res)

    }

   
/*
     getCoinBalance = async (req, res) => {
          try {
            const user = await User.findById(req.user._id);
            res.json({ coins: user.coins });
          } catch (err) {
            res.status(500).json({ error: 'Error fetching user coin balance' });
          }
  */  
}

module.exports = new UserController();
