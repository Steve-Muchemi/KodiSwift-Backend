const express = require('express');
const cors = require('cors'); 
//import { errorResponse, successResponse } from "./utils/libs/response.js";


const app = express();


//Routes
app.use(cors)
app.use(express.json());
//app.use(express.urlencoded({extended: true}));


//set up middlewares


//index route
app.get("/", (req, res) => {
    //console.log('welcome')
    res.status(200).json({'message':"Welcome to Kodip backend 🚀"})
})

// handle 404 routes

// handle global errors

module.exports = app;