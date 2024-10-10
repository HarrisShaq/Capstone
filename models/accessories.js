const mongoose = require('mongoose');

const accessorySchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    brand: { type: String, required: true },
    item: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true }
});

const Accessory = mongoose.model('Accessory', accessorySchema);

module.exports = Accessory; // Export only the model
