const passport = require('passport');

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
        res.json({ message: "Logged out successfully." });
    });
};

// Authenticate user with Google
const googleAuth = passport.authenticate("google", {
    scope: ['profile', 'email']
});

const googleCallback = (req, res) => {
    res.redirect('http://localhost:4200/profile');  // Correct usage
};

// Get user profile (protected route)
const getProfile = (req, res) => {
    if (req.isAuthenticated()) {
        res.json({ user: req.user });
    } else {
        res.status(401).json({ error: "Unauthorized" });
    }
};

module.exports = {
    login,
    logout,
    googleAuth,
    googleCallback,
    getProfile,
};
