const admins = ['duxyfdm@gmail.com']; 

//Check if the user is logged in
const isAuthenticated = (req, res, next) => {
    if (!req.isAuthenticated || !req.user) {
        return res.status(401).send('Unauthorized: Please log in.');
    }
    next();
};

//Check if the user is an admin
const isAdmin = (req, res, next) => {
    const userEmail = req.user?.email;
    if (userEmail && admins.includes(userEmail)) {
        return next();
    }
    res.status(403).send('Forbidden: You do not have access to this page.');
};

module.exports = {
    isAuthenticated,
    isAdmin,
};
