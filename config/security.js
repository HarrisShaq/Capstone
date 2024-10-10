// config/security.js
const cors = require('cors');
const helmet = require('helmet');

const corsOptions = {
    origin: 'http://localhost:3000', 
    optionsSuccessStatus: 200,
};

module.exports = {
    corsOptions,
    helmetOptions: helmet(),
};
