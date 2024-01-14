
const chatHistoryController = require('./allUserControllers/chatHistoryController');


class messageController{
    chathistory(req, res){
    chatHistoryController(req, res);
    }
   
    
}
module.exports = new messageController();