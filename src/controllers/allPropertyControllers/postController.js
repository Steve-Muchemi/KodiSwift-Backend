const  basemodel = require('../../models/basemodel');

const postController = async (req, res)=>{
  
    const { owner, propertyType, price, description, propertyName, location, amenities, contactInfo, imageUrls, pushpin } = req.body;

    const newProperty = new basemodel(
        {
            owner,
            propertyType,
            price,
            amenities,
            contactInfo,
            imageUrls,
            description,
            propertyName,
            location,
            pushpin
        }
    )
    console.log(newProperty);
    
    await newProperty.save();
    res.json({message: 'saved Property:', newProperty})


    }

modules.exports = postController;
    