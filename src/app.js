const express = require('express');
const cors = require('cors'); 

//import { errorResponse, successResponse } from "./utils/libs/response.js";

//importing routes
const routes = require('./routes/non-auth_routes');

//import socketio
const initializeSocketIO = require('./socketIO/socketIO');

//creating an express app
const app = express();

const http = require('http');
const server = http.createServer(app); //creating a http sever


//initialize socketIO with the sever
initializeSocketIO(server);

//set up middlewares
app.use(express.json());
app.use(express.urlencoded({extended: true})); //parse form data
app.use(cors());
app.use("/api", routes);


//index route
app.get("/", (req, res) => {
    //console.log('welcome')
    res.status(200).json({'message':"Welcome to Kodip backend 🚀"})
})

//Error Handling
// handle 404 routes

// handle global errors



//connect to db then run our app

module.exports = app;