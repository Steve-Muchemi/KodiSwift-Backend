const socketIO = require('socket.io');
//import db and save messages 
const DBMessages = require('../models/messageModel.js')
const mongoose = require('mongoose');
const DBUsers = require('../models/userModel.js');


const socketIOEventHandlers = require('./socketIOEventHandlers.js');

const initializeSocektIO = (server) => {
  
const io = socketIO(server, {
        cors: {
            origin: ['http://localhost','http://localhost:3000' ],
            methods: ['GET', 'POST']
        }
    });

    const DBMessages = require('../models/messageModel.js')


let users = [];
let dbMessages = [];


//we'll need to keep a list of all users and who they've messaged cached

let contactedUsers = {}



// Clear all messages from the MongoDB collection










socketIOEventHandlers(io, users, dbMessages, DBMessages, DBUsers, mongoose, contactedUsers);


}

module.exports = initializeSocektIO;