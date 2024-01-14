const postController = require('./allPropertyControllers/postController');
const pinsController = require('./allPropertyControllers/postController');

class propertyController{
    postdata(req, res){
        postController(req, res)
    }

    postdata(req, res){
        pinsController(req, res)
    }
    
}
module.exports = new propertyController();