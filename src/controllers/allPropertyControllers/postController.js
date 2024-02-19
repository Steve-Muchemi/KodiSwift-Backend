
const  Property = require('../../models/basemodel');

// Controller function for posting a new property
const postProperty = async (req, res) => {
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
            imageUrls,
            pushpin
        } = req.body;

        const newProperty = new Property({
            owner,
            propertyType,
            price,
            description,
            propertyName,
            location,
            amenities,
            contactInfo,
            imageUrls,
            pushpin
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

module.exports = { postProperty, updateProperty, deleteProperty };
