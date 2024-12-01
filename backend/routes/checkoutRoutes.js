const express = require('express');
const checkoutController = require('../controllers/checkoutController');
const router = express.Router();

router.get('/', (req, res) => {
    res.send('Checkout route is working!');
  });

router.post('/', checkoutController.createOrder);

module.exports = router;