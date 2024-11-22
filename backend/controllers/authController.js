// const passport = require('passport');
// const GoogleStrategy = require('passport-google-oauth20').Strategy;
// const redis = require('redis');
// const { client, createUser, getUser } = require('../models/userModel');


// const findUserByGoogleId = async (googleId) => {
//     try {
//         const keys = await client.keys('user:*'); // Get all user keys
//         for (const key of keys) {
//             const user = await client.hGetAll(key); // Fetch the hash data
//             if (user.googleId === googleId) {
//                 return {key, user}; // Return the matching user and their key
//             }
//         }
//         return null; // No match found
//     } catch (err) {
//         console.error('Error finding user by Google ID:', err);
//         throw err;
//     }
// };


// console.log('Google Strategy registered.');
// passport.use(
//     new GoogleStrategy({
//         clientID: process.env.GOOGLE_CLIENT_ID,
//         clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//         callbackURL: '/auth/google/callback'
//     },  async (accessToken, refreshToken, profile, done)=>{
//         try {
//             console.log('Profile:', profile);
//             const googleId = profile.id;
//             const username = profile.displayName;
//             const familyName = profile.name.familyName;
//             const givenName = profile.name.givenName;
//             const email = profile.emails && profile.emails[0].value;

//             const existingUser  = await findUserByGoogleId(googleId);
//             if (existingUser) {
//                 console.log('User already exists:', existingUser.user);
//                 return done(null, existingUser.user);
//             }

//             // Create a user and get the localId
//             const userData = await createUser(googleId, username, familyName, givenName, email);

//             // Serialize user
//             return done(null, userData);
//         } catch (err) {
//             console.error('Error during user creation:', err);
//             return done(err);
//         }
//     })

// );
// // Serialize and deserialize the user for session management
// passport.serializeUser((user, done) => done(null, user.localId));
// passport.deserializeUser((localId, done) => {
//     client.hGetAll(`user:${localId}`, (err, userData) =>{
//         if (err) {
//             console.error('Error during deserialization:', err);
//             return done(err);
//         }
//         if (Object.keys(userData).length === 0) {
//             console.error('No user found during deserialization.');
//             return done(null, false);
//         }
//         // Pass the user data to the session
//         console.log('deserialize');
//         console.log(userData);
//         done(null, userData);
//     })
// });
