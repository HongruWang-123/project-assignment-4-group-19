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
router.get('/google/callback',passport.authenticate('google', { failureRedirect: '/' }), authController.googleCallback);


// Route to return the logged-in user's information
router.get('/user', authController.getProfile);


// router.get('/profile', authController.getProfile);

module.exports = router;