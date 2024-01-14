const User = require('../../models/userModel');


//getting users from db
const getUsers = async(req, res)=>{
    //sender reciever will have to be email addresses
    //console.log('entire req', req)
    const {sender, receiver} = req.body;
  //console.log('sender and reciever', sender, reciever)
    try{
  let senderid = await User.findOne({ email:sender });
  let receiverid = await User.findOne({ email: receiver });
  
    res.json({senderID : senderid._id, receiverID: receiverid._id});
    console.log(`senderID : ${senderid._id}, receiverID: ${receiverid._id}`)
  
    }catch(error){
      console.log(error)
    } 
  
  }

module.exports = getUsers;