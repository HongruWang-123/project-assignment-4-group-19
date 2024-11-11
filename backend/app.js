const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

// Example route
const exampleRoutes = require('./routes/exampleRoutes');
app.use('/api/example', exampleRoutes);

module.exports = app;
