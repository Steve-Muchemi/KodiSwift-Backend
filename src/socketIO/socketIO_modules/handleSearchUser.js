
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const handleSearchUser = (socket, DBUsers) =>{
 
  socket.on('search user', (usertosearch) => {
      let query;
      // Check if usertosearch is a valid ObjectId
      if (ObjectId.isValid(usertosearch)) {
          // If valid ObjectId, search by _id
          query = { _id: usertosearch };
      } else {
          // If not valid ObjectId, search by username or email
          query = { $or: [{ username: usertosearch }, { email: usertosearch }] };
      }
  
      // Perform the search query
      DBUsers.find(query)
          .then(user => {
              console.log('Users matching search:', user);
              socket.emit('users matching search', user);
          })
          .catch(error => {
              console.error('Error searching for user:', error);
              socket.emit('search user error', 'An error occurred while searching for the user');
          });
  });
  
};

module.exports = handleSearchUser;