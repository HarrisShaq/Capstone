// config/index.js
require('dotenv').config(); // Load environment variables

const mongoURI = process.env.MONGO_URI;
const port = process.env.PORT || 3000;
const jwtSecret = process.env.JWT_SECRET;

// Check if required environment variables are set
if (!mongoURI) {
    throw new Error('MONGO_URI is not defined in the environment variables');
}

if (!jwtSecret) {
    throw new Error('JWT_SECRET is not defined in the environment variables');
}

module.exports = {
    mongoURI,
    port,
    jwtSecret,
};
