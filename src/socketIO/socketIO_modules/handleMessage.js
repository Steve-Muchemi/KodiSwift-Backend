const handleMessage = (socket, users, dbMessages, DBMessages, DBUsers, mongoose) =>{

    //recieving messages from all sockets
    socket.on('message', (data) => {io.emit('message', data);});

    
}

module.exports = handleMessage;