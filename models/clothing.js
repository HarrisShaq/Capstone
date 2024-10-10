const mongoose = require('mongoose');

const clothingSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    brand: { type: String, required: true },
    item: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true }
});

const Clothing = mongoose.model('Clothing', clothingSchema); 

module.exports = Clothing; // Export only the model
