const express = require('express');
const router = require('express').Router();
const passport = require('passport');
//auth login
router.get('/login',(req,res)=>{
    res.render('login');
})

//auth logout
router.get('/logout',(req,res)=>{
    //handle with passport
    res.send('logging out');
})

//auth with google
router.get('/google', passport.authenticate("google",{
    scope:['profile','email']
}));

//callback route for google, exchange code, access profile infomation
router.get('/google/callback',passport.authenticate("google"),(req,res)=>{
    res.send("you reached the callback URL");
})

module.exports = router;