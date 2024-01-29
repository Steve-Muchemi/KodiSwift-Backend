// index.js

const { app, server } = require('./app');
const connectDB = require('./config/db');

const port = process.env.PORT || 3002;

// Connect to the database before running the app
connectDB().then(() => {
  try {
    server.listen(port, () => {
      console.log(`API is ready at http://localhost:${port}`);
    });
  } catch (error) {
    console.log("Error ==>", error);
    process.exit(1);
  }
});
