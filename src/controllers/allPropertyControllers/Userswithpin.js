const  basemodel = require('../../models/basemodel');

//get all properties with pin from db
const userswithpin = async (req, res)=>{
    //console.log('triggererd');
    //sender reciever will have to be email addresses
    //console.log('entire req', req)
    //const {sender, receiver} = req.body;
  //console.log('sender and reciever', sender, reciever)
    try{
    const users = await basemodel.find({ pushpin: { $exists: true }});

    console.log('users with pin', users)
  
    res.json({users: users});
    //console.log('users', users)
  
    }catch(error){
      //console.log('users', users)
      //console.log(error)
    } 
  
  }

  module.exports = userswithpin;