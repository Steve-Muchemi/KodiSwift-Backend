const registerController = require('./allUserControllers/registerController');
const loginController = require('./allUserControllers/loginController');
const logoutController = require('./allUserControllers/logoutController');
const deleteController = require('./allUserControllers/deleteController');
const updateController = require('./allUserControllers/updateController');
const getUsersController = require('./allUserControllers/getusersController');

class UserController {
  
    register(req, res){
        registerController(req, res);
    }

    login(req, res) {
        loginController(req, res);
    }

    logout(req, res) {
        logoutController(req,res);
     }
    
     update(req, res) {
        updateController(req,res);
     }

    deleteAccount(req, res) {
      deleteController(req,res);
     }
   
    getUsers(req, res){
        getUsersController(req, res)
    }
}

module.exports = new UserController();
