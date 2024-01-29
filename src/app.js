// app.js

const express = require('express');
const cors = require('cors');
const http = require('http');

// Importing routes
const routes = require('./routes/non-auth_routes');

// Import Socket.IO setup function
const initializeSocketIO = require('./socketIO/socketIO');

// Creating an express app
const app = express();

// Creating an HTTP server using the express app
const server = http.createServer(app);

// Initialize Socket.IO with the server
initializeSocketIO(server);

// Set up middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true })); // Parse form data
app.use(cors());
app.use("/api", routes);

// Index route
app.get("/", (req, res) => {
  res.status(200).json({ 'message': "Welcome to Kodip backend 🚀" });
});

// Error Handling
// Handle 404 routes

// Handle global errors

module.exports = { app, server };
