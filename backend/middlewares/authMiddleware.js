
//Check if the user is logged in
const isAuthenticated = (req, res, next) => {
    
    if (!req.isAuthenticated || !req.user) {
        return res.status(401).send('Unauthorized: Please log in.');
    }
    next();
};

//Check if the user is an admin
const isAdmin = (req, res, next) => {
    
    if (req.user && req.user.role === 'admin') {
        return next();
    }
    res.status(403).json({ message: 'Forbidden' });
};


module.exports = {
    isAuthenticated,
    isAdmin,
};
