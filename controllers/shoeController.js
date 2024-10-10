const Shoe = require('../models/shoes');

exports.getAllShoes = async (req, res) => {
    try {
        const shoes = await Shoe.find();
        res.status(200).json(shoes);
    } catch (error) {
        console.error('Error fetching shoe data:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.getShoeById = async (req, res) => {
    try {
        const shoeItem = await Shoe.findById(req.params.id);
        if (shoeItem) {
            res.status(200).json(shoeItem);
        } else {
            res.status(404).json({ message: 'Item not found' });
        }
    } catch (error) {
        console.error('Error fetching shoe by ID:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.createShoe = async (req, res) => {
    const { brand, name, size, imageUrl } = req.body;
    try {
        const newShoe = new Shoe({ brand, name, size, imageUrl });
        await newShoe.save();
        res.status(201).json({ message: 'Shoe created successfully', shoe: newShoe });
    } catch (error) {
        console.error('Error creating shoe item:', error);
        res.status(400).json({ message: 'Bad Request', error: error.message });
    }
};

exports.updateShoe = async (req, res) => {
    const { brand, name, size, imageUrl } = req.body;
    try {
        const updatedShoe = await Shoe.findByIdAndUpdate(
            req.params.id,
            { brand, name, size, imageUrl },
            { new: true, runValidators: true }
        );
        if (updatedShoe) {
            res.status(200).json({ message: 'Shoe updated successfully', shoe: updatedShoe });
        } else {
            res.status(404).json({ message: 'Shoe not found' });
        }
    } catch (error) {
        console.error('Error updating shoe item:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.deleteShoe = async (req, res) => {
    try {
        const deletedShoe = await Shoe.findByIdAndDelete(req.params.id);
        if (deletedShoe) {
            res.status(200).json({ message: 'Shoe deleted successfully' });
        } else {
            res.status(404).json({ message: 'Shoe not found' });
        }
    } catch (error) {
        console.error('Error deleting shoe item:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.likeShoe = async (req, res) => {
    try {
        const shoeItem = await Shoe.findByIdAndUpdate(
            req.params.id,
            { $inc: { likes: 1 } },
            { new: true }
        );
        if (shoeItem) {
            res.status(200).json({ message: 'Shoe liked successfully', shoe: shoeItem });
        } else {
            res.status(404).json({ message: 'Shoe not found' });
        }
    } catch (error) {
        console.error('Error liking shoe item:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

exports.commentOnShoe = async (req, res) => {
    const { userId, text } = req.body;
    try {
        const shoeItem = await Shoe.findById(req.params.id);
        if (shoeItem) {
            shoeItem.comments.push({ userId, text });
            await shoeItem.save();
            res.status(200).json({ message: 'Comment added successfully', shoe: shoeItem });
        } else {
            res.status(404).json({ message: 'Shoe not found' });
        }
    } catch (error) {
        console.error('Error commenting on shoe item:', error);
        if (error.kind === 'ObjectId') {
            return res.status(400).json({ message: 'Invalid ID format' });
        }
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
