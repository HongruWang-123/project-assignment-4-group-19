const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const db = require('../database/connect');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Example route
const exampleRoutes = require('./routes/exampleRoutes');
app.use('/api', exampleRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use('/api/cart', cartRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Backend Server!');
});

const start = async () => {
    try {
        await db(process.env.MONGO_URI)
    } catch (error) {
        console.log(error);
    }
}

start();

module.exports = app;