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
### 
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

Routes
router.post('/user/register', userController.register);
router.get('/user/sendcode', userController.sendCode);
router.post('/user/login', userController.login);
router.post('/user/update', userController.update);
router.post('/user/logout', userController.logout);
router.post('/user/delete', userController.deleteAccount);
router.get('/user/getuserbyid/:id', userController.getuserbyid);

router.get('/property/get/all', getController.getall);
router.post('/property/post', upload.any(), propertyController.postProperty);
router.put('/property/:propertyId', propertyController.updateProperty);
router.delete('/property/:propertyId', propertyController.deleteProperty);
router.get('/property/images', propertyController.propertyimages);

router.post('/connect/createpost', ConnectPost.createPost);
router.get('/connect/getallposts', ConnectPost.getAllPosts);
router.get('/connect/getpost/:postId', ConnectPost.getPostById);
router.put('/connect/updatepost/:postId', ConnectPost.updatePost);
router.delete('/connect/deletepost/:postId', ConnectPost.deletePost);

router.post('/connect/comment', CommentController.createComment);
router.get('/connect/getcomments/:postId', CommentController.getCommentsByPostId);
router.put('/connect/updatecomment/:commentId', CommentController.updateCommentById);
router.delete('/connect/deletecomment/:commentId', CommentController.deleteCommentById);


WebSocket Setup
The server runs a separate Socket.IO instance on a different port. Make sure to configure your frontend to connect to this port for real-time updates.

### 3.Contributing
We welcome contributions!

### 4.Contact
Please contact info@kodiswift.com for more information.

 ### 5.License
This project is licensed under the MIT License. See the LICENSE file for details.
