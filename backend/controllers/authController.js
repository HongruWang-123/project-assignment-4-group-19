const passport = require('passport');
const User = require('../models/userModel');

// Render login page or send a message
const login = (req, res) => {
    res.json({ message: "Please log in using Google." });
};

// Logout the user and clear session
const logout = (req, res, next) => {
    req.logout((err) => {
        if (err) {
            return next(err);
        }
        req.session.destroy((err) => {
            if (err) {
                console.error('Failed to destroy session:', err);
                return next(err);
            }

            // Clear the cookie
            res.clearCookie('connect.sid', {
                path: '/',
                httpOnly: true,
                secure: true
            });

            // Send response
            res.status(200).json({ message: 'Logged out successfully.' });
        });
    });
};


// Authenticate user with Google
const googleAuth = passport.authenticate("google", {
    scope: ['profile', 'email']
});


const admins = ['duxyfdm@gmail.com'];
const googleCallback = (req, res) => {
    const userEmail = req.user.email;
    if (userEmail && admins.includes(userEmail)) { //if is admin
        res.redirect('http://localhost:4200/adminPage');
    } 
    else {// if is not admin
        res.redirect('http://localhost:4200/dashboard');
    }
};

// User dashboard handler
const dashboard = (req, res) => {
    res.send('Welcome to the user dashboard!');
};

// Admin dashboard handler
const adminPage = (req, res) => {
    res.send('Welcome to the admin dashboard!');
};

// Get user profile (protected route)
const getProfile = (req,res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
};


const updateProfile = async (req,res) =>{
    try {
        const userId = req.user.id;
        // const {} = req.body;
        console.log(userId);
        const { familyName, givenName, address, paymentMethod } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { familyName, givenName, address, paymentMethod },
            { new: true, runValidators: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(updatedUser);
        } catch (error) {
            res.status(500).json({ message: error.message });
        }
};

module.exports = {
    login,
    logout,
    googleAuth,
    googleCallback,
    getProfile,
    updateProfile,
    dashboard,
    adminPage,
};
