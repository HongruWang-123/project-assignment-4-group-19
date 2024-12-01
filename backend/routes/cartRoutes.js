const express = require('express');
const cartController = require('../controllers/cartController');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Cart route is working!');
});

router.post('/add', cartController.addToCart);
router.delete('/remove/:productId', cartController.removeFromCart);
router.get('/:userId', cartController.getCart);

module.exports = router;