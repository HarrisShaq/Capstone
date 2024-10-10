const mongoose = require('mongoose');

const shoesSchema = new mongoose.Schema({
    id: { type: Number, required: true, unique: true },
    brand: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: Number, required: true },
    imageUrl: { type: String, required: true }
});

const Shoes = mongoose.model('Shoes', shoesSchema);



module.exports =  Shoes ;
