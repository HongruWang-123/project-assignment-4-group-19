const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const passportSetup = require('./config/passport-setup'); 

dotenv.config();

const app = express();

app.set('view engine','ejs');

app.use(cors());
app.use(express.json());

// Example route
const exampleRoutes = require('./routes/exampleRoutes');
app.use('/api/example', exampleRoutes);

// Root route
app.get('/', (req, res) => {
    res.send('Welcome to the Backend Server!');
});

// Auth route
app.use('/auth',authRoutes)
app.get('/auth', (req, res) => {
    res.render('home');
});


module.exports = app;
