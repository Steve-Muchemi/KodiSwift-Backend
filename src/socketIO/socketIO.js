const socketIO = require('socket.io');



const initializeSocektIO = (server) => {
  
const io = socketIO(server, {
        cors: {
            origin: 'http://localhost:3000',
            methods: ['GET', 'POST']
        }
    });




let users = [];
let dbMessages = [];


io.on('connection', (socket) => {
    //console.log('A user connected', socket.id);
  
    //recieving messages from all sockets
    socket.on('message', (data) => {
      //console.log('Received message:', data);
      io.emit('message', data);
    });
  
    //when a user disconnects
    socket.on('disconnect', () => {
      console.log('A user disconnected');
  //will need to remove the disconnected user from our list of online users
  
      //console.log('current list of online users after disconnect', users)
    });
  
  
  
    //if a user logs in or changes userid 
    socket.on('user login', (userobj) => {    
    const objexists = users.some(user => user.userobj.userid === userobj.userid)
  //if a userobj does not exists in online users push it
      if(!objexists){
         users.push({ socket, userobj }); 
      } else{
        //remove the object then push it to ensure the socket info is updated
        //console.log('userlist before update', users, 'to update with socket', socket.id)
        users = users.map(user=>{
          if (user.userobj.userid === userobj.userid ){
              user.socket = socket;
              //console.log('user list updated', users)   
          }
      
        return user;
        
        })
      }
  
  
  
     io.emit('online users', users.map((user) => user.userobj));
     //console.log('current list of online users sent', users)
    });
   
  
   // console.log("All online users currently ", users)
    
  
  
    socket.on('private message', ({ reciever, message, sender, status, messageid}) => {
  
      //To do: save the message to db
     const privatemessage = { reciever, message, sender, status, messageid}
  
     dbMessages.push(privatemessage);
  
      //console.log("users who are online ", message, status)
      
      const recipientUser = users.find((user) => user.userobj.userid === reciever.userid);
      users.map(user => console.log('user.userobj ',user.userobj.userid, sender.senderId))
  
      const senderUser = users.find((user) => user.userobj.userid === sender.senderId);
    //console.log(`recipientUser: ${recipientUser}, users: ${users} senderUser: ${senderUser}`)
      if (recipientUser) {
        const recipientSocket = recipientUser.socket;
        console.log('Sending a private message:', message, 'recipeintsocketid', recipientSocket.id );
      
       io.to(recipientSocket.id).emit('A private message', { sender, reciever, message, status, messageid}); // Send the message to the recipient
        
      } else {
        console.log(`Recipient user '${reciever}' not found.`);
      }
    
      if (senderUser) {
        const senderSocket = senderUser.socket;
        senderSocket.emit('A private message', { sender, reciever, message, status, messageid}); // Send a confirmation message to the sender
        console.log('Sent a confirmation message to sendersocket',  senderUser.userobj);
      } else {
        console.log(`Sender user '${sender}' not found.`);
      }
      
    });
  
  // when the sent message is recieved we get a confirmation
  socket.on('A new Message recieved', (newReceivedMessage)=>{
  
    //update the status of newRecievedMessage and save it to db.
    /*
     newReceivedMessage = {
      sender,
      reciever,
      message,
      timestamp: new Date().toLocaleTimeString(),
      messageid,
      status : {
        recieved: true,
        read: false
      }
    };
    */
  // Update the recieved status to true
  
  
  dbMessages = dbMessages.map( message =>{
  if(message.messageid === newReceivedMessage.messageid){
    
    
    return {...message, status: {recieved: true, read:false } };
  }
  return message;
  })
  
  
    //notify the sender their message was recieved.
  
    const senderUser = users.find((user) => user.userobj.userid === newReceivedMessage.sender.senderId);
    const senderSocket = senderUser.socket
    
    senderSocket.emit('Your message was recieved', newReceivedMessage);
  
  })
  
  // we get a notification that the user read a particular message
  socket.on('We read your message', (readmessageobj)=>{
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
  dbMessages = dbMessages.map( message =>{
    if(message.messageid === readmessageobj.messageid){
     
      return {...message, status: {recieved: true, read:true } };
    }
    return message;
    })
  
    console.log("dbMessages", dbMessages)
  
  
  //letting the sender know their message was read, so they can implement double blue ticks
  
  
  const senderUser = users.find((user) => user.userobj.userid === readmessageobj.sender.senderId);
  const senderSocket = senderUser.socket;
  
  //sending this to the sender to notify them their message was read
  
  readmessageobj = {...readmessageobj, status : {recieved: true, read: true}}
  senderSocket.emit('Your message was read', readmessageobj);
  })
     
    
  });  
  console.log('initializing socket IO...')
  
}

module.exports = initializeSocektIO;