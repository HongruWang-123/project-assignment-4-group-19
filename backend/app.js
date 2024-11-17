const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes')
const redis = require('redis');
const passport = require('passport');
const session = require('express-session');
require('./controllers/authController');

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
