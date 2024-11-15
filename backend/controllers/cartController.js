const Cart = require('../models/cartModel');
const Product = require('../models/productModel');

// Add item to shopping cart
exports.addToCart = async (req, res) => {
    try {
      const { userId, productId, quantity } = req.body;
  
      let cart = await Cart.findOne({ userId });
  
      if (!cart) {
        cart = new Cart({ userId, items: [], subtotal: 0 });
      }
  
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: 'Product not found' });
      }
  
      const existingItem = cart.items.find((item) => item.productId.equals(productId));
  
      if (existingItem) {
        existingItem.quantity += quantity;
      } else {
        cart.items.push({ productId, quantity });
      }
  
      cart.subtotal = cart.items.reduce((acc, item) => {
        return acc + item.quantity * product.price;
      }, 0);
  
      await cart.save();
      res.status(200).json(cart);
    } catch (error) {
      res.status(500).json({ message: 'Error adding to cart', error });
    }
  };