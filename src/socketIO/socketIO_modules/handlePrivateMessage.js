const user = require('../../models/userModel');
const contactsHistoryFunction = require('./socketio_utils/contactsHistoryFunction');

/**
 * Handles private messages between users.
 * 
 * This function listens for 'private message' events emitted by a socket.
 * When a private message is received, it performs the following actions:
 * 1. Saves the message to the database.
 * 2. Checks if the recipient user is online.
 * 3. Sends the message to the recipient if online.
 * 4. Sends a confirmation message to the sender.
 * 
 * @param {Object} io - The socket.io instance.
 * @param {Object} socket - The socket object representing the current client connection.
 * @param {Array} users - An array containing information about online users.
 * @param {Array} dbMessages - An array containing previously sent messages.
 * @param {Object} DBMessages - The Mongoose model for message documents in the database.
 * @param {Object} DBUsers - The Mongoose model for user documents in the database.
 * @param {Object} mongoose - The Mongoose object.
 */
const handlePrivateMessage = async (io, socket, users, dbMessages, DBMessages, DBUsers, mongoose, contactedUsers) => {
 
  socket.on('private message', async ({ receiver, content, sender, status, messageid}) => {
    //console.log('contacted user', contactedUsers)

    console.log('private message ', receiver, content, sender, status, messageid  )
    try{ 
      const senderId = new mongoose.Types.ObjectId(sender);
      const receiverId = new mongoose.Types.ObjectId(receiver);
      try {
          let newDBMessage = DBMessages({ receiver: receiverId, content, sender: senderId, status, messageid });
          newDBMessage.save();
      } catch (error) {
          console.log('Error saving message:', error);
      }







      //update contacts list incase a new contact has messages
      //check whether if reciever is online
     
      const userIdToCheck = receiver; // ID to check
      let userExists = false;
      
      for (let i = 0; i < users.length; i++) {
        console.log(users)
        console.log('checking this one', users[i].userobj.userid)
        
          if (users[i].userobj.userid === userIdToCheck) {
              userExists = true;
              break;
          }
      }
      
      console.log('User exists?', userExists);
      



      //if they exist update their list of contacts and send them the new sender who's contacting them
      if (userExists) {
        //finding the user to update their list of contacts.

        const userToUpdate = users.find(user => user.userobj.userid === receiver);
        console.log('usertoupdate', userToUpdate)

        //the sender will become a new contact for that particular online user who's recieving the text
        const newContact = users.find(user => user.userobj.userid === sender);
        //updating
        console.log('new contact', newContact.userobj,'usertoupdate conts', userToUpdate.contacts)

        userToUpdate.contacts.push(newContact.userobj);


        console.log('how do users look now?', users)

        

        






      
      
      //old code
      
      //look for the receiver if they are online first before sending message 
      const recipientUserFunct = async () => {
     
            return users.find((user) => user.userobj.userid === receiver);
        
    };
    
    const recipientUser = await recipientUserFunct();
   
     
      if (recipientUser.socket !== undefined) {
          const recipientSocket = recipientUser.socket;
          console.log('Sending a private message:', content, 'to recipient socket id:', recipientSocket.id);
          io.to(recipientSocket.id).emit('A private message', { sender, receiver, content, status, messageid });

          //forEach

          //I want for all the users to find the current reciever then find the recievers contacts then do a for each

          
            io.to(recipientSocket.id).emit('contactsHistory', userToUpdate.contacts)
        console.log('what did we send', userToUpdate.contacts)
          

          io.to(recipientSocket.id).emit('A private message', { sender, receiver, content, status, messageid });
      } else {console.log(`Recipient user '${receiver}' not online.`);}











      } else {
      console.log('User does not exist in the online user data.');
      // if the user is not online its fine if to just save the data to the database. they'll surely get the new contact when they log in
      }

/////////
      
/*
      try {
        //saving the new message to the db
        DBMessages.find({ $or: [{ receiver: receiver }, { sender: sender }] })
            .then((messages) => {
                // Emit the chat history to the socket of the logged-in user
                //socket.emit('chatHistory', messages);
                //console.log('messages for ', userobj.userid, messages);

                // Extract the IDs of contacts the reciver user has interacted with
                const contactsHistoryId = contactsHistoryFunction(messages, receiver);
                //console.log('contactsHistoryids', contactsHistoryId);

                // Define a function to fetch contact information from the database
                const fetchContactFromDB = (contactId) => {
                    DBUsers.find({ _id: contactId }).then(contacts => {

                      //use 'if' incase a message has a non existing user
                      if(contacts.length !== 0 ){
                        console.log('Contacts history fetched:', contacts);
                        socket.emit('contactsHistory', contacts); // Make sure this line is correct

                      }
                       
                    });
                };

                // Map each contact ID to a database query and fetch contact information
                contactsHistoryId.forEach(contactId => fetchContactFromDB(contactId));
            })
            .catch((error) => {
                console.error('Error finding messages:', error);
            });
    } catch (error) {
        console.log(error);
    }

    */








    }catch (error){
      console.log('error occured: ', error)
    } 
  });
};

module.exports = handlePrivateMessage;
