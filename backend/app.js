const passport = require('passport');
const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
require('./config/passportConfig');
const authRoutes = require('./routes/authRoutes');

const session = require('express-session');


dotenv.config();

const app = express();

app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true
}));
app.use(express.json());

// Configure session middleware
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false, // Avoid resaving unchanged sessions
        saveUninitialized: false, // Save uninitialized sessions
        cookie: { secure: false, httpOnly: true },
    })
);

// Initialize Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Product route
const exampleRoutes = require('./routes/exampleRoutes');
app.use('/api', exampleRoutes);

// Auth route
app.use('/api/auth',authRoutes);
// cart route
const cartRoutes = require('./routes/cartRoutes');
app.use('/api/cart', cartRoutes);

const checkoutRoutes = require('./routes/checkoutRoutes');
app.use('/api/checkout', checkoutRoutes);


//connect to user mongodb
USER_MONGODB_URI = process.env.USER_MONGODB_URI;
mongoose.connect(USER_MONGODB_URI)
.then(() => {
    console.log('Connected to MongoDB');
})
.catch((error) => {
    console.error('Error connecting to MongoDB:', error);
});


module.exports = app;
