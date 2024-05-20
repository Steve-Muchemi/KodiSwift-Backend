# KodiSwift Backend

## Overview
KodiSwift is a robust backend project designed to support the KodiSwift frontend application, a rental and communications platform.
This backend API provides comprehensive CRUD operations, authentication features, real-time communication via Socket.IO, and integration with WhatsApp for enhanced user interactions.

## Features
- **User Authentication**: Secure registration, login, and token-based authentication.
- **CRUD Operations**: Full support for create, read, update, and delete operations for listings.
- **Real-Time Communication**: Real-time updates and notifications using Socket.IO.
- **WhatsApp Integration**: Seamless integration with WhatsApp for messaging and notifications.

## Technologies Used
- Node.js
- Express.js
- MongoDB
- Mongoose
- Socket.IO
- Multer
- WhatsApp API

## Installation

### Prerequisites
- Node.js (v18 or later)
- MongoDB
- Meta developers account for WhatsApp API

### Setup
1. Clone the repository
   ```bash
   git clone https://github.com/yourusername/kodiswift-backend.git
   cd kodiswift-backend

markdown
Copy code

2. Install dependencies
   ```bash
   npm install
Set up environment variables
Create a .env file in the root directory and add the following:

   env
   Copy code
   PORT=3000
   MONGODB_URI=mongodb://localhost:27017/kodiswift
   JWT_SECRET=your_jwt_secret
   SOCKET_PORT=3001
   Start the server

     Copy code
      ```bash 
         npm start


Set up environment variables
Create a .env file in the root directory and add the following:

      env
      Copy code
      ```bash
         PORT=3000
         MONGODB_URI=mongodb://localhost:27017/kodiswift
         JWT_SECRET=your_jwt_secret
         SOCKET_PORT=3001

Start the server

      ```bash
         Copy code
         npm start

### API Endpoints

### User Routes
- POST /user/register - Register a new user
- POST /user/login - Login a user
- POST /user/logout - Logout a user
- POST /user/update - Update user information
- POST /user/delete - Delete a user account
- GET /user/:userId - Get user by ID
- GET /user/sendcode - Send a code to the user

### Listing Routes
- GET /property/get/all - Get all properties
- POST /property/post - Create a new property (with file upload)
- PUT /property/:propertyId - Update a property
- DELETE /property/:propertyId - Delete a property
- GET /property/images - Get property images

### Connect Routes
- POST /connect/createpost - Create a new post
- GET /connect/getallposts - Get all posts
- GET /connect/getpost/:postId - Get a post by ID
- PUT /connect/updatepost/:postId - Update a post
- DELETE /connect/deletepost/:postId - Delete a post
- POST /connect/comment - Create a new comment
- GET /connect/getcomments/:postId - Get comments by post ID
- PUT /connect/updatecomment/:commentId - Update a comment
- DELETE /connect/deletecomment/:commentId - Delete a comment



### Contributing
We welcome contributions!

### Contact
Please contact info@kodiswift.com for more information.

 ### License
This project is licensed under the MIT License. See the LICENSE file for details.
