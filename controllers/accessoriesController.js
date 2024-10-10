const Accessory = require('../models/accessories');

exports.getAllAccessories = async (req, res) => {
    try {
        const accessories = await Accessory.find();
        res.status(200).json(accessories);
    } catch (error) {
        console.error('Error fetching accessory data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getAccessoryById = async (req, res) => {
    try {
        const accessoryItem = await Accessory.findById(req.params.id);
        if (accessoryItem) {
            res.status(200).json(accessoryItem);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        console.error('Error fetching accessory by ID:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createAccessory = async (req, res) => {
    const { name, type, price, imageUrl } = req.body;
    try {
        const newAccessory = new Accessory({ name, type, price, imageUrl });
        await newAccessory.save();
        res.status(201).json({ message: 'Accessory created successfully', accessory: newAccessory });
    } catch (error) {
        console.error('Error creating accessory item:', error);
        res.status(400).json({ message: 'Bad Request', error: error.message });
    }
};

exports.updateAccessory = async (req, res) => {
    const { name, type, price, imageUrl } = req.body;
    try {
        const updatedAccessory = await Accessory.findByIdAndUpdate(
            req.params.id,
            { name, type, price, imageUrl },
            { new: true, runValidators: true }
        );
        if (updatedAccessory) {
            res.status(200).json({ message: 'Accessory updated successfully', accessory: updatedAccessory });
        } else {
            res.status(404).json({ message: 'Accessory not found' });
        }
    } catch (error) {
        console.error('Error updating accessory item:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteAccessory = async (req, res) => {
    try {
        const deletedAccessory = await Accessory.findByIdAndDelete(req.params.id);
        if (deletedAccessory) {
            res.status(200).json({ message: 'Accessory deleted successfully' });
        } else {
            res.status(404).json({ message: 'Accessory not found' });
        }
    } catch (error) {
        console.error('Error deleting accessory item:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.likeAccessory = async (req, res) => {
    try {
        const accessoryItem = await Accessory.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (accessoryItem) {
            res.status(200).json({ message: 'Accessory liked successfully', accessory: accessoryItem });
        } else {
            res.status(404).json({ message: 'Accessory not found' });
        }
    } catch (error) {
        console.error('Error liking accessory item:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.commentOnAccessory = async (req, res) => {
    const { userId, text } = req.body;
    try {
        const accessoryItem = await Accessory.findById(req.params.id);
        if (accessoryItem) {
            accessoryItem.comments.push({ userId, text });
            await accessoryItem.save();
            res.status(200).json({ message: 'Comment added successfully', accessory: accessoryItem });
        } else {
            res.status(404).json({ message: 'Accessory not found' });
        }
    } catch (error) {
        console.error('Error commenting on accessory item:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
