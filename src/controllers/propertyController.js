const postController = require('./allPropertyControllers/postController');
const pinsController = require('./allPropertyControllers/postController');
const getall = require('./allPropertyControllers/getController');

class propertyController{

    get(req, res){
        getall(req, res);
    }

    postdata(req, res){
        postController(req, res);
    }

    postdata(req, res){
        pinsController(req, res);
    }
    
}
module.exports = new propertyController();