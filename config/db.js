const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const mongoURI = process.env.MONGODB_URI;

        await mongoose.connect(mongoURI);
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('MongoDB connection error:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
