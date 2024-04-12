
const handleLogout = (socket, users) =>{

    socket.on('logout', (userid) => {
          
        users = users.filter(user => user.userobj.userid !==userid)
              console.log('user logged out' , userid);
              console.log("All online users currently ", users)
            });
        
  
};

module.exports = handleLogout;