const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const path = require('path');
const connectDB = require('./config/db');
const usersRouter = require('./routes/userRoutes');
const clothingRouter = require('./routes/clothingRoutes');
const accessoriesRouter = require('./routes/accessoriesRoutes');
const shoeRouter = require('./routes/shoesRoutes');
const Clothing = require('./models/clothing'); 
const Shoe = require('./models/shoes'); 
const Accessory = require('./models/accessories'); 

dotenv.config();

const PORT = process.env.PORT || 3000; 
const app = express();

// CORS configuration
const allowedOrigins = [
    'http://localhost:5173', // Frontend
];

app.use(cors({
    origin: allowedOrigins,
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Middleware for parsing JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')); // Specify the views directory

// Connect to MongoDB
connectDB()
    .then(() => {
        console.log("MongoDB connected successfully");
    })
    .catch(err => {
        console.error("Database connection error:", err);
        process.exit(1);
    });

// API Routes
app.use('/api/users', usersRouter);
app.use('/api/clothing', clothingRouter);
app.use('/api/accessories', accessoriesRouter);
app.use('/api/shoes', shoeRouter);

// Route to render the Fashion EJS view
app.get('/fashion', async (req, res) => {
    try {
        const clothing = await Clothing.find(); // Fetch clothing items
        const shoes = await Shoe.find(); // Fetch shoes
        const accessories = await Accessory.find(); // Fetch accessories

        // Render the Fashion EJS view with the fetched data
        res.render('Fashion', { clothing, shoes, accessories });
    } catch (error) {
        console.error('Error fetching fashion data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is now running on port ${PORT}`);
});
