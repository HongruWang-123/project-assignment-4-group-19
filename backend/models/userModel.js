const redis = require('redis');
const dotenv = require('dotenv');
dotenv.config();

const client = redis.createClient({
    url: process.env.REDIS_URI,
});

// Connect to Redis
client.on('connect', () => {
    console.log('Connected to Redis Cloud database');
});

client.on('error', (err) => {
    console.error('Redis connection error:', err);
});

// Initialize Redis connection
(async () => {
    await client.connect();
})();

const createUser = (googleId, username, familyName, givenName, email) => {
    const userKey = `user:${googleId}`;
    const userData = {
        googleId: googleId,
        username: username,
        familyName: familyName,
        givenName: givenName,
        email: email
    };

    client.hSet(userKey, userData, (err, reply) => {
        if (err) {
            console.error('Error creating user:', err);
            return;
        }
        console.log('User created:', reply);
    });
};

// Retrieving 
const getUser = (googleId) => {
    const userKey = `user:${googleId}`;
    client.hGetAll(userKey, (err, userData) => {
        if (err) {
            return callback(err, null);
        }
        if (Object.keys(userData).length === 0) {
            // If no data is found, it is a new user
            return callback(null, null);
        }
        callback(null, userData); // User found
    });
};

module.exports = {
    createUser,
    getUser,
};