const express = require('express');
const router = require('express').Router();
const passport = require('passport');
const authController = require('../controllers/authController');
//auth login
router.get('/login', authController.login);

//auth logout
router.get('/logout', authController.logout);

//auth with google
router.get('/google', authController.googleAuth);

//callback route for google
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }), (req, res) => {
    res.redirect('http://localhost:4200/profile');  // Redirect to frontend profile page
});


router.get('/profile', authController.getProfile);

module.exports = router;