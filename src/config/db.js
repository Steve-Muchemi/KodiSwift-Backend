const mongoose = require('mongoose');
const config = require('./config.json')
const mongoURI = config.mongoURI

const connectDB = async()=>{
try{
await mongoose.connect(mongoURI);
console.log('Connected to MongoDB');
} catch(error){
console.error('MongoDB connection error:', error);
process.exit(1); //exit the process if unable to connect to db
}

};

module.exports = connectDB;