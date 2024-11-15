// Import the mongoose library
const mongoose = require('mongoose');

// Define shopping cart schema, which has userId, items, and subtotal
const cartSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    
    items: [
      {
        productId: { type: mongoose.Schema.Types.ObjectId, ref: 'Product', required: true },
        quantity: { type: Number, required: true, min: 1 },
      },
    ],

    subtotal: { type: Number, required: true, default: 0 },

  });

// Export shopping cart model as 'Cart' 
  module.exports = mongoose.model('Cart', cartSchema);