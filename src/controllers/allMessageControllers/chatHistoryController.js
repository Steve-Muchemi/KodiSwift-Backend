const Message = require('../../models/messageModel');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;


const chatHistoryController = async(req, res)=>{

// we need the sendersid which is the current userid. and the id of receiver.
//with that we will load all their messages 

const {senderID, receiverID} = req.body;
//console.log('sender and receiver', sender, receiver)
//console.log("herr is request ssssssssssssssss", req) 
//console.log(` first time senderID: ${senderID},  receiverID: ${receiverID} `)
//{sender: ObjectId('6536cc58d0f01b6d8c424ad6'), receiver: ObjectId('6536cc58d0f01b6d8c424ad6')}

try {
    // Convert sender and receiver to ObjectId
    //const senderObjectId = new ObjectId(sender);
    //const receiverObjectId = new ObjectId(receiver);

    //a simple way of switching users. eg. when checking messages for sender 7 and receiver 8 or for sender 8 and receiver 7
    let messages;
    messages = await Message.find({sender: new ObjectId(senderID), receiver: new ObjectId(receiverID)});
    
      const sender = new ObjectId(receiverID);
      const receiver = new ObjectId(senderID);
      //console.log(` second time senderID: ${sender},  receiverID: ${receiver} `)
      let messages2 = await Message.find({sender: sender , receiver: receiver});
    messages.push(...messages2)

    console.log('Messages:', messages);
    res.json({messages});
  } catch (error) {
    console.error('Error:', error);
  }


}

modules.exports = chatHistoryController.js