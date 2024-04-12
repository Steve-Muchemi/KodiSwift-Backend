const User = require('../../models/userModel');



// Define the function to get a specific user by their _id
const getUserById = async (req, res) => {
  try {
    // Extract the userId from the request parameters
    const userId = req.params.id;

    // Use the User model to find the user by their _id
    const user = await User.findById(userId);
    
    // If user not found, return a 404 status code along with a message
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send the user as a JSON response
    res.json(user);
  } catch (error) {
    // If an error occurs, send a 500 status code along with an error message
    console.error(error);
    res.status(500).json({ message: 'Server Error' });
  }
};




/** 
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
  
  }*/

module.exports = getUserById;