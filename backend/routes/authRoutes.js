const express = require('express');
const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/authController');
const authMiddleware = require('../middlewares/authMiddleware');
//auth login
router.post('/login',  authController.login);

//auth logout
router.post('/logout', authController.logout);

//auth with google
router.get('/google', authController.googleAuth);

//callback route for google
router.get('/google/callback',passport.authenticate('google', { failureRedirect: '/' }), authController.googleCallback);


// Route to return the logged-in user's information
router.get('/user', authController.getProfile);

router.put('/user', authMiddleware.isAuthenticated, authController.updateProfile);

router.get('/userlist', authController.getUserList);

//protected route
router.get('/dashboard', authMiddleware.isAuthenticated, authController.dashboard);
router.get('/adminPage', authMiddleware.isAuthenticated, authMiddleware.isAdmin, authController.adminPage);

module.exports = router;