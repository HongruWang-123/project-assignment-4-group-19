const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const redis = require('redis');
const { createUser, getUser } = require('../models/userModel');


console.log('Google Strategy registered.');
passport.use(
    new GoogleStrategy({
        //options for the google strat
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/auth/google/callback'
    },  (accessToken, refreshToken, profile, done)=>{
        console.log('Profile:', profile);
        const googleId = profile.id;
        const username = profile.displayName;
        const familyName = profile.name.familyName;
        const givenName = profile.name.givenName;
        const email = profile.emails && profile.emails[0].value;
        createUser(googleId, username, familyName, givenName, email);
        return done(null, { googleId, username, familyName, givenName});
    })

);
// Serialize and deserialize the user for session management
passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((obj, done) => done(null, obj));
