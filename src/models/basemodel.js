// Our database Schema
const mongoose = require('mongoose');
const baseModelSchema = new mongoose.Schema({


  owner:{
  type:mongoose.Schema.Types.ObjectId,
  ref: 'User', // Reference to the User model
  required: true,
  }
  ,
  propertyType: {
    type: String,
    required: true
  },
  price: {
    type: Number,
    required: true
  },
  description: String,
  propertyName: String,
  location: String,
  amenities: [{
    type: String
  }],
  contactInfo: [{
    type: String
  }],
  images:[{type: String}],
  
  pushpin: {
    
    location: [Number, Number], // Latitude and longitude
    infoboxOption: {
      title: String,      
      propertyType: String,
    },

  },

});

module.exports = mongoose.model('baseModel', baseModelSchema);