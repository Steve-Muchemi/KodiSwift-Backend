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
### 2. Install dependencies
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
TWILIO_ACCOUNT_SID=your_twilio_account_sid
TWILIO_AUTH_TOKEN=your_twilio_auth_token
TWILIO_WHATSAPP_FROM=whatsapp:+1234567890
Start the server

bash
Copy code
npm start
API Endpoints
User Routes
POST /user/register - Register a new user
POST /user/login - Login a user
POST /user/logout - Logout a user
POST /user/update - Update user information
POST /user/delete - Delete a user account
GET /user/:userId - Get user by ID
Listing Routes
GET /listing - Get all listings
POST /listing - Create a new listing
GET /listing/:id - Get a listing by ID
PUT /listing/:id - Update a listing
DELETE /listing/:id - Delete a listing
Real-Time Communication Routes
GET /socket/connect - Connect to Socket.IO for real-time communication
POST /socket/message - Send a message via Socket.IO
WhatsApp Integration Routes
POST /whatsapp/send - Send a message via WhatsApp
WebSocket Setup
The server runs a separate Socket.IO instance on a different port. Make sure to configure your frontend to connect to this port for real-time updates.

Contributing
We welcome contributions! Please read our Contributing Guidelines for more information.

License
This project is licensed under the MIT License. See the LICENSE file for details.
