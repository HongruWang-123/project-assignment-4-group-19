const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Example route
const exampleRoutes = require('./routes/exampleRoutes');
app.use('/api', exampleRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Backend Server!');
});


module.exports = app;
