const handleMessage = require('./socketIO_modules/handleMessage');
const handleUserLogin = require('./socketIO_modules/handleUserLogin');
const handleLogout = require('./socketIO_modules/handleLogout');
const handleSearchUser = require('./socketIO_modules/handleSearchUser');
const handlePrivateMessage = require('./socketIO_modules/handlePrivateMessage');
const handleNewMessageReceived = require('./socketIO_modules/handleNewMessageReceived');
const handleReadMessage = require('./socketIO_modules/handleReadMessage');
const  newMessageNotifications = require('./socketIO_modules/newMessageNotifications')


const socketIOEventHandlers = (io, users, dbMessages, DBMessages, DBUsers, mongoose, contactedUsers) => {
console.log('these are the online users', users);

io.on('connection', (socket) => {

console.log(`Socket connected: ${socket.id}`);


 
        handleUserLogin( io, socket, users, dbMessages, DBMessages, DBUsers, mongoose, contactedUsers);
        
        handleMessage(socket, users, dbMessages, DBMessages, DBUsers, mongoose);
        
        handleLogout(socket, users);
        
        handleSearchUser(socket, DBUsers);
        
        handlePrivateMessage(io, socket, users, dbMessages, DBMessages, DBUsers, mongoose, contactedUsers);
        
        handleNewMessageReceived(io, socket, users, dbMessages, DBMessages, DBUsers, mongoose);
        
        handleReadMessage(io, socket, users, dbMessages, DBMessages, DBUsers, mongoose);

       // newMessageNotifications(io, socket, users, dbMessages, DBMessages, DBUsers, mongoose);
      
   //when a user disconnects
   socket.on('disconnect', () => {
    console.log('A user disconnected');
    users = users.filter(user => user.socket.id !== socket.id)
  });           
        

    });  
    
    
console.log('initializing socket IO...')



}

module.exports = socketIOEventHandlers;