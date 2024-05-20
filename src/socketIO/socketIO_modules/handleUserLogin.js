const contactsHistoryFunction = require('./socketio_utils/contactsHistoryFunction');

/**
 * This function handles the login event when a user connects to the socket.
 * It manages the user's presence in the online users list, emits online user updates,
 * and retrieves chat history and contact information for the logged-in user.
 * @param {object} io - The Socket.IO server object.
 * @param {object} socket - The socket object representing the connection.
 * @param {Array} users - An array containing information about online users.
 * @param {Array} dbMessages - An array containing message history from the database.
 * @param {object} DBMessages - The database model for messages.
 * @param {object} DBUsers - The database model for users.
 * @param {object} mongoose - The mongoose object for MongoDB operations.
 */
const handleUserLogin = (io, socket, users, dbMessages, DBMessages, DBUsers, mongoose, contactedUsers) => {
    socket.on('user login', async (userobj) => {




       // console.log('online users', users);

        io.emit('online users', users.map((user) => user.userobj));

        const senderid = userobj.userid;
        
        try {
            const messages = await DBMessages.find({ $or: [{ receiver: senderid }, { sender: senderid }] });
            
            socket.emit('chatHistory', messages);

            const contactsHistoryId = contactsHistoryFunction(messages, userobj.userid);

            const fetchContactInfo = async (contactId) => {
                const contacts = await DBUsers.find({ _id: contactId });
                return contacts[0]; // Assuming you want to emit only the first contact found
            };
            
            const emitContactHistory = async (contactsHistoryId) => {
                const promises = contactsHistoryId.map(contactId => fetchContactInfo(contactId));
                
                try {
                    const contacts = await Promise.all(promises);
                    
                    socket.emit('contactsHistory', contacts);
                    
                    contactedUsers.contacts = contacts;
                    //////////////////////////////////////////////////

                   // console.log('contacts', contacts)

                    const objexists = users.some(user => user.userobj.userid === userobj.userid);                           
        
                    if (!objexists) {
                                               
                        //console.log('users before pushing a new obj', users)
                        users.push({ socket, userobj, contacts });
                       // console.log('after new obj', users)
                    } else {
                      //  console.log('users before operation', users)
                        users = users.map(user => {
                            if (user.userobj.userid === userobj.userid) {
                                user.socket = socket;
                            }

                       // console.log('users after operation', users)
                            return user;
                        });
                    } 



                //console.log('this is what users is', users[0].contacts);
                } catch (error) {
                    console.error('Error fetching contact history:', error);
                }
            };
            
            // Call the function to emit contact history
            await emitContactHistory(contactsHistoryId);
            
           // console.log('cont', contactedUsers);
           console.log('online users', users)

        } catch (error) {
            console.error('Error finding messages:', error);
        }
    });

   // console.log('online users22', users);
  
};

module.exports = handleUserLogin;

