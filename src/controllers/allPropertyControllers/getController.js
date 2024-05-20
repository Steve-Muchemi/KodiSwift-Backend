const  basemodel = require('../../models/basemodel');


const getall = async(req, res)=>{

    try{
        const users = await basemodel.find({ pushpin: { $exists: true }});
    
        console.log('users with pin', users)
      
        res.json(users);
        //console.log('users', users)
      
        }catch(error){
          //console.log('users', users)
          //console.log(error)
        } 
     



}



module.exports = { getall };