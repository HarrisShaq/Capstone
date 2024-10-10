const Clothing = require('../models/clothing');

exports.getAllClothing = async (req, res) => {
    try {
        const clothing = await Clothing.find();
        res.status(200).json(clothing);
    } catch (error) {
        console.error('Error fetching clothing data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getClothingById = async (req, res) => {
    try {
        const clothingItem = await Clothing.findById(req.params.id);
        if (clothingItem) {
            res.status(200).json(clothingItem);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        console.error('Error fetching clothing by ID:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createClothing = async (req, res) => {
    const { id, brand, item, price, imageUrl } = req.body;

    // Check if all required fields are present
    if (id === undefined || brand === undefined || item === undefined || price === undefined || imageUrl === undefined) {
        return res.status(400).json({ message: 'All fields are required' });
    }

    try {
        const newClothing = new Clothing({ id, brand, item, price, imageUrl });
        await newClothing.save();
        res.status(201).json({ message: 'Clothing created successfully', clothing: newClothing });
    } catch (error) {
        console.error('Error creating clothing item:', error);
        res.status(400).json({ message: 'Bad Request', error: error.message });
    }
};

exports.updateClothing = async (req, res) => {
    const { brand, item, price, imageUrl } = req.body;
    try {
        const updatedClothing = await Clothing.findByIdAndUpdate(
            req.params.id,
            { brand, item, price, imageUrl },
            { new: true, runValidators: true }
        );
        if (updatedClothing) {
            res.status(200).json({ message: 'Clothing updated successfully', clothing: updatedClothing });
        } else {
            res.status(404).json({ message: 'Clothing not found' });
        }
    } catch (error) {
        console.error('Error updating clothing item:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteClothing = async (req, res) => {
    try {
        const deletedClothing = await Clothing.findByIdAndDelete(req.params.id);
        if (deletedClothing) {
            res.status(200).json({ message: 'Clothing deleted successfully' });
        } else {
            res.status(404).json({ message: 'Clothing not found' });
        }
    } catch (error) {
        console.error('Error deleting clothing item:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.likeClothing = async (req, res) => {
    try {
        const clothingItem = await Clothing.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (clothingItem) {
            res.status(200).json({ message: 'Clothing liked successfully', clothing: clothingItem });
        } else {
            res.status(404).json({ message: 'Clothing not found' });
        }
    } catch (error) {
        console.error('Error liking clothing item:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.commentOnClothing = async (req, res) => {
    const { userId, text } = req.body;
    try {
        const clothingItem = await Clothing.findById(req.params.id);
        if (clothingItem) {
            clothingItem.comments.push({ userId, text });
            await clothingItem.save();
            res.status(200).json({ message: 'Comment added successfully', clothing: clothingItem });
        } else {
            res.status(404).json({ message: 'Clothing not found' });
        }
    } catch (error) {
        console.error('Error commenting on clothing item:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
