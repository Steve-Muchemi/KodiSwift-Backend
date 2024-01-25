
const chatHistoryController = require('./allMessageControllers/chatHistoryController');
const saveMessage = require('./allMessageControllers/saveMessageController');


class messageController{

    saveMessage(req, res){
        saveMessage(req, res)
    }
    
    chatHistory(req, res){
   
    chatHistoryController(req, res);
    }
   
    
}
module.exports = new messageController();