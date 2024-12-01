const passport = require('passport');
const User = require('../models/userModel');



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


// Direct to frontend
const googleCallback = (req, res) => {
    res.redirect('http://localhost:4200/callback');
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

// Update profile infomation
const updateProfile = async (req,res) =>{
    try {
        const userId = req.user.id;
        const { familyName, givenName, address, paymentMethod,role } = req.body;
        const updatedUser = await User.findByIdAndUpdate(
            userId,
            { familyName, givenName, address, paymentMethod, role },
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

// return all user infomation for admin
const getUserList = async (req, res) => {
    try {
        const users = await User.find();
        res.json(users);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

//update user role (admin only)
const updateRole = async (req, res) => {
    const { googleId } = req.params;
    const { role } = req.body;

    try {
        const user = await User.findOneAndUpdate({googleId},{ role },{ new: true });

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'Role updated successfully', user });
    } catch (error) {
        res.status(500).json({ message: 'Error updating role', error });
    }
}

//delete user (admin only)
const deleteUser = async (req, res) => {
    const { googleId } = req.params;

    if (!googleId) {
      return res.status(400).json({ error: 'googleId query parameter is required' });
    }
  
    try {
      const result = await User.findOneAndDelete({ googleId });
      if (!result) {
        return res.status(404).json({ error: 'User not found' });
      }
  
      res.status(200).json({ message: 'User deleted successfully', user: result });
    } catch (error) {
      console.error('Error deleting user:', error);
      res.status(500).json({ error: 'Internal server error' });
    }
}
module.exports = {
    logout,
    googleAuth,
    googleCallback,
    getProfile,
    updateProfile,
    dashboard,
    adminPage,
    getUserList,
    updateRole,
    deleteUser
};
