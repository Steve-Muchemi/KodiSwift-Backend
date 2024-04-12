const handleNewMessageReceived = (io, socket, users, dbMessages, DBMessages, DBUsers, mongoose)=>{

    socket.on('A new Message recieved', async (newReceivedMessage)=>{
      
        try {
          await DBMessages.updateOne({messageid: newReceivedMessage.messageid}, {$set: {status: {received: true, read:false }}});
          
        }catch(error){console.log(error)}

        
          const senderUser = users.find((user) => user.userobj.userid === newReceivedMessage.sender);
       // console.log('senderuser', senderUser)
          
          const senderSocket = senderUser.socket
          
          senderSocket.emit('Your message was recieved', newReceivedMessage);
        
        })
        

};

module.exports = handleNewMessageReceived;