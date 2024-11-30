const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;


app.use(express.static(path.join(__dirname, '../frontend/src')));


app.get('/cart', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src/app', 'cart.html'));
});


app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/src', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

