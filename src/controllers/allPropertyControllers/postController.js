
const  Property = require('../../models/basemodel');
const path = require('path');
const fs = require('fs');
const { Readable } = require('stream');

const AWS = require('aws-sdk');


// Controller function for posting a new property
const postProperty = async (req, res) => {
    //todo: ensure all files meet size requirements, naming convections,
    try {
        
        const {
            owner,
            propertyType,
            price,
            description,
            propertyName,
            location,
            amenities,
            contactInfo,
            pushpin
        } = req.body;

console.log('what does pushpin look like', pushpin)

for(let i= 0; i < pushpin.length; i++){
   // console.log(pushpin[i])
}
        // Ensure req.files is an array
        if (!Array.isArray(req.files)) {
            return res.status(400).json({ message: 'Invalid files array' });
        }

        const s3 = new AWS.S3();

        // Configure AWS credentials
<<<<<<< HEAD
<<<<<<< HEAD
=======
>>>>>>> 339728b (added property controllers)
        AWS.config.update({
            accessKeyId: '',
            secretAccessKey: ''
        });
<<<<<<< HEAD
=======
        
>>>>>>> d2208a7 (overall major improvements on socketio, property & connect modules)
=======

>>>>>>> 339728b (added property controllers)


    const uploadFilesWithRetry = async (bucket, key, imageBuffer, contentType,) =>{
        // todo: recheck this code again to ensure it retries due to network failures 
        const maxretries = 3;
        let retryCount = 0;

        while(retryCount < maxretries){
            try{

                const params = {
                    Bucket: bucket,
                    Key: key,
                    Body: imageBuffer,
                    ACL: 'public-read',
                    ContentType: contentType
    
                }
                return s3.upload(params).promise();
            } catch(error ){
                console.error('error uploading file:', error)
                retryCount++;

                if(retryCount < maxretries){
                    console.log(`Retrying upload for the (attempt ${retryCount} of ${maxretries})`);
                    await new Promise(resolve, reject => setTimeout(resolve, 1000 * retryCount))
                } else {
                    throw error;
                }


            }

        }
            
        }
        // Upload all files asynchronously
        const uploadPromises = req.files.map(async (file) => {
            const contentType = file.mimetype === 'image/jpeg' ? 'image/jpeg' : 'image/png';

            const result = await uploadFilesWithRetry(`kodiswift/All/${owner}/propertyimages`, file.originalname, file.buffer, contentType);
            return `https://kodiswift.s3.amazonaws.com/${result.Key}`;
        });

        // Wait for all uploads to complete
        const imageUrls = await Promise.all(uploadPromises);
        console.log('Image URLs:', imageUrls);

        const newProperty = new Property({
            owner,
            propertyType,
            price,
            description,
            propertyName,
            location,
            amenities,
            contactInfo,
            images:imageUrls,
            pushpin: {
                location : [-1.1212871920545808, 36.88368422705076],
                infoboxOption: {
                  title: 'Kilimani Bedsitters',
                  propertyType: 'Bedsitter',
                },
                
              }
        });

        await newProperty.save();

        res.json({ message: 'Property saved', property: newProperty });
    } catch (error) {
        console.error('Error posting property:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};


// Controller function for updating a property
const updateProperty = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;
        const updateData = req.body; // Updated property data

        const updatedProperty = await Property.findByIdAndUpdate(propertyId, updateData, { new: true });

        if (!updatedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.json({ message: 'Property updated', property: updatedProperty });
    } catch (error) {
        console.error('Error updating property:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Controller function for deleting a property
const deleteProperty = async (req, res) => {
    try {
        const propertyId = req.params.propertyId;

        const deletedProperty = await Property.findByIdAndDelete(propertyId);

        if (!deletedProperty) {
            return res.status(404).json({ message: 'Property not found' });
        }

        res.json({ message: 'Property deleted', property: deletedProperty });
    } catch (error) {
        console.error('Error deleting property:', error);
        res.status(500).json({ message: 'Internal server error' });
    }



};

const propertyimages = async (req, res) => {
    try {
        const imagebuff = await Property.findById('6612221454c780a031388c9b');
        
        // Convert ArrayBuffer to Buffer
        const buffer = Buffer.from(imagebuff.images[0].imageBuffer.buffer);

        // Set content type header
        res.set('Content-Type', 'image/png');

        // Create a readable stream from the buffer
        const stream = new Readable();
        stream.push(buffer);
        stream.push(null); // Mark the end of the stream
        console.log('Data being piped to response:', buffer)
        // Pipe the stream to the response
        stream.pipe(res);
    } catch(error) {
        console.log(error);
    }
}


module.exports = { postProperty, updateProperty, deleteProperty, propertyimages };
