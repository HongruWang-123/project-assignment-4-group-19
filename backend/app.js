const dotenv = require('dotenv');
dotenv.config({ path: '../.env' });

const express = require('express');
const cors = require('cors');
const connectDB = require('../database/connect');

const app = express();


app.use(cors());
app.use(express.json());
console.log('Express JSON parser loaded');


const exampleRoutes = require('./routes/exampleRoutes');
app.use('/api', exampleRoutes);

const cartRoutes = require('./routes/cartRoutes');
app.use('/api/cart', cartRoutes);

const checkoutRoutes = require('./routes/checkoutRoutes');
app.use('/api/checkout', checkoutRoutes);


app.get('/', (req, res) => {
  res.send('Welcome to the Backend Server!');
});

app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    console.log('Headers:', req.headers);
    console.log('Body:', req.body);
    next();
  });


  exports.createProducts = (req, res) => {
    console.log('Request body:', req.body);
    res.send('Received');
  };
  
const start = async () => {
  try {
    await connectDB(); 
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error('Error starting server:', error);
    process.exit(1);
  }
};

start();

module.exports = app;
