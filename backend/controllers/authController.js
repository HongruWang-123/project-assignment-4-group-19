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
    dashboard,
    adminPage
};
