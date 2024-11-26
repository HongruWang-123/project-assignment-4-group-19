const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const User = require("../models/userModel");
const dotenv = require('dotenv');
dotenv.config();

passport.use(
    new GoogleStrategy({
        clientID: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL: '/api/auth/google/callback'
    },(accessToken, refreshToken, profile, done)=>{
        console.log('passport callback function is fired');
         // check if user already exists in our db
        User.findOne({googleId: profile.id}).then((currentUser) => {
            if(currentUser){// if the user with us in the past
                done(null, currentUser);
            } 
            else {// create user if not
                if(profile.emails[0].value === 'duxyfdm@gmail.com'){// set admin account
                    new User({
                        googleId: profile.id,
                        familyName: profile.name.familyName,
                        givenName: profile.name.givenName,
                        email: profile.emails && profile.emails[0] ? profile.emails[0].value : "",
                        address: '',
                        paymentMethod:'',
                        role: 'admin'
                            
                    }).save().then((newUser) => {
                        done(null, newUser);
                    });
                }
                else{
                    new User({
                        googleId: profile.id,
                        familyName: profile.name.familyName,
                        givenName: profile.name.givenName,
                        email: profile.emails && profile.emails[0] ? profile.emails[0].value : "",
                        address: '',
                        paymentMethod:''

                    }).save().then((newUser) => {
                        done(null, newUser);
                    });
                }
            }
        });
    })
);

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser((id, done) => {
    User.findById(id).then((user) => {
        done(null, user);
    });
});