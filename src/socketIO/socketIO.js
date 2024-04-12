const socketIO = require('socket.io');
//import db and save messages 
const DBMessages = require('../models/messageModel')
const mongoose = require('mongoose');
const DBUsers = require('../models/userModel');

const initializeSocektIO = (server) => {
  
const io = socketIO(server, {
        cors: {
            origin: ['http://localhost','http://localhost:3000' ],
            methods: ['GET', 'POST']
        }
    });




let users = [];
let dbMessages = [];

//console.log('list of users', users)

io.on('connect', (socket) => {
 
    
    //recieving messages from all sockets
socket.on('message', (data) => {io.emit('message', data);});
  


  
  
    //when a user disconnects
socket.on('disconnect', () => {
      console.log('A user disconnected');
      users = users.filter(user => user.socket.id !== socket.id)
    });
    
    



    //if a user logs in or changes userid 
  socket.on('user login', (userobj) => {    
    
    console.log('login socket triggered, user obj', userobj)

    const objexists = users.some(user => user.userobj.userid === userobj.userid)
  //if a userobj does not exists in online users push it
      if(!objexists){
         users.push({ socket, userobj }); 
      } else{
        users = users.map(user=>{
          if (user.userobj.userid === userobj.userid ){user.socket = socket;}
          return user; })
      }
  
     io.emit('online users', users.map((user) => user.userobj));

      const senderid = userobj.userid;
      try{       

     DBMessages.find({$or: [{ receiver: senderid },{ sender: senderid }]})
  .then((messages) => {
    socket.emit('chatHistory', messages)
    
  
  //uses messages to check contacts a user has been messaging or recieved messages from and returns their ids
  const contactsHistoryFunction = (messages, user) => {
    let contacts = [];

  for (let a = 0; a < messages.length; a++) {
    if (messages[a].sender.toString() === user) {
      const added = contacts.some(contact => contact === messages[a].receiver.toString());
      if (!added) {
        contacts.push(messages[a].receiver.toString());
      }
    } else if (messages[a].receiver.toString() === user) {
      const added = contacts.some(contact => contact === messages[a].sender.toString());
      if (!added) {
        contacts.push(messages[a].sender.toString());
      }
    }
  }

  return contacts;
};


const contactsHistoryId = contactsHistoryFunction(messages, userobj.userid);

const fetchContactFromDB = (contactId) => {
   DBUsers.find({ _id: contactId }).then(contacts => {
    socket.emit('contactsHistory', contacts )
    console.log('Contacts history fetched:', contacts); 
    
  });
};

// Map each contact ID to a DB query and collect the promises
const contactsHistoryPromises = contactsHistoryId.map(contactId => fetchContactFromDB(contactId));

// Use Promise.all to wait for all promises to resolve
Promise.all(contactsHistoryPromises)
  .then(contactsHistory => {
  // for every message associated with current user. 
  })
  .catch(error => {
    console.error('Error fetching contacts history:', error);
  });
  })
  .catch((error) => {
    console.error('Error finding messages:', error);
  });   
} catch (error){
console.log(error)
}
     
});
   




socket.on('logout', (userid) => {
      
users = users.filter(user => user.userobj.userid !==userid)
      console.log('user logged out' , userid);
      console.log("All online users currently ", users)
    });





socket.on('search user', (usertosearch)=>{
      DBUsers.find({_id:usertosearch}).then(user => {
        console.log('users matching search', user)
        socket.emit('users matching search', user)})
      })

     



socket.on('private message', ({ reciever, content, sender, status, messageid}) => {
     const privatemessage = { reciever, content, sender, status, messageid}
     dbMessages.push(privatemessage);
     const senderid = new mongoose.Types.ObjectId(sender);
    const receiverid = new mongoose.Types.ObjectId(reciever);
     try {
        //spelling issues - reciever
        let newDBMessage = DBMessages ({ receiver: receiverid , content, sender:senderid, status, messageid})
        newDBMessage.save()
      }
      catch (error) {
        console.log('couldnt save. Error;', error)
      }
      
  
      //console.log("users who are online ", message, status)
      
      const recipientUser = users.find((user) => user.userobj.userid === reciever);
      users.map(user => console.log('user.userobj ',user.userobj.userid, sender))
  
      const senderUser = users.find((user) => user.userobj.userid === sender);
    //console.log(`recipientUser: ${recipientUser}, users: ${users} senderUser: ${senderUser}`)
      if (recipientUser) {
        const recipientSocket = recipientUser.socket;
        console.log('Sending a private message:', content, 'recipeintsocketid', recipientSocket.id );
      
       io.to(recipientSocket.id).emit('A private message', { sender, reciever, content, status, messageid}); // Send the message to the recipient
        
      } else {
        console.log(`Recipient user '${reciever}' not found.`);
      }
    
      if (senderUser) {
        const senderSocket = senderUser.socket;
        senderSocket.emit('A private message', { sender, reciever, content, status, messageid}); // Send a confirmation message to the sender
        console.log('Sent a confirmation message to sendersocket',  senderUser.userobj);
      } else {
        console.log(`Sender user '${sender}' not found.`);
      }
      
    });





  
 
socket.on('A new Message recieved', async (newReceivedMessage)=>{
  
  try {
    await DBMessages.updateOne({messageid: newReceivedMessage.messageid}, {$set: {status: {received: true, read:false }}});
    
  }catch(error){console.log(error)}
  
  dbMessages = dbMessages.map( message =>{
  if(message.messageid === newReceivedMessage.messageid){
    
    return {...message, status: {recieved: true, read:false } };
  }
  return message;
  })
  
    const senderUser = users.find((user) => user.userobj.userid === newReceivedMessage.sender);
    const senderSocket = senderUser.socket
    
    senderSocket.emit('Your message was recieved', newReceivedMessage);
  
  })
  




  // we get a notification that the user read a particular message
  socket.on('We read your message', async(readmessageobj)=>{
  //To do update the db that the message was read.
  /*
     newReceivedMessage = {
      sender,
      reciever,
      message,
      timestamp: new Date().toLocaleTimeString(),
      status ={
        recieved: true,
        read: true
      }
    };
  */

    try {
      await DBMessages.updateOne({messageid: readmessageobj.messageid}, {$set: {status: {received: true, read:true }}});
      
  
    //console.log('new updatedmessage', updateMessage)
  
    }catch(error){console.log(error)}

  dbMessages = dbMessages.map( message =>{
    if(message.messageid === readmessageobj.messageid){
     
      return {...message, status: {recieved: true, read:true } };
    }
    return message;
    })
  
    //console.log("dbMessages afeter we read your message", dbMessages)
  
  
  //letting the sender know their message was read, so they can implement double blue ticks
  
  
  const senderUser = users.find((user) => user.userobj.userid === readmessageobj.sender);
  const senderSocket = senderUser.socket;
  
  //sending this to the sender to notify them their message was read
  
  readmessageobj = {...readmessageobj, status : {recieved: true, read: true}}
  senderSocket.emit('Your message was read', readmessageobj);
  })
     

    
  });  


console.log('initializing socket IO...')
  
}

module.exports = initializeSocektIO;