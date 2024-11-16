const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config();

passport.use(
    new GoogleStrategy({
        //options for the google strat
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },(accessToken, refreshToken, profile, done)=>{
        //passport callback function
        console.log('passport callback function fired')
        console.log(profile)
    })
);
