const Cart = require('../models/cartModel');
const Product = require('../models/products');

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;

    let cart = await Cart.findOne();

    if (!cart) {
      cart = new Cart({ items: [], subtotal: 0 });
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

    cart.subtotal = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        cart.subtotal += item.quantity * product.price;
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error adding to cart', error });
  }
};


exports.removeFromCart = async (req, res) => {
  try {
    const { productId } = req.body;

    const cart = await Cart.findOne();
    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    cart.items = cart.items.filter((item) => !item.productId.equals(productId));

    cart.subtotal = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (product) {
        cart.subtotal += item.quantity * product.price;
      }
    }

    await cart.save();
    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error removing item from cart', error });
  }
};

exports.getCart = async (req, res) => {
  try {
    const cart = await Cart.findOne().populate({
      path: 'items.productId',
      select: 'model category specification price Image review stock rate'
    });

    if (!cart) {
      return res.status(404).json({ message: 'Cart not found' });
    }

    res.status(200).json(cart);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching cart details', error });
  }
};