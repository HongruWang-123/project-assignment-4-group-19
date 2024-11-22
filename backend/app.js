const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
require('./config/passportConfig');
const authRoutes = require('./routes/authRoutes');
const passport = require('passport');
const session = require('express-session');

dotenv.config();

const app = express();

// Configure session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false, // Avoid resaving unchanged sessions
        saveUninitialized: true, // Save uninitialized sessions
        cookie: { secure: false }, // Set `true` if using HTTPS
    })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

app.set('view engine','ejs');

//connect to user mongodb
USER_MONGODB_URI = process.env.USER_MONGODB_URI;
mongoose.connect(USER_MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});
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
app.use('/auth',authRoutes);
app.get('/auth', (req, res) => {
    res.render('home');
});


module.exports = app;
