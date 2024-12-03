const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.post('/add', cartController.addToCart);
router.delete('/remove/:productId', cartController.removeFromCart);
router.get('/', cartController.getCart);

module.exports = router;