const mongoose = require('mongoose');
const { Schema } = mongoose;

const productSchema = new Schema({
  model: {
    type: String,
    required: [true, 'Please provide model name'],
    maxlength: 50,
  },
  category: {
    type: String,
    required: [true, 'Please provide computer category'],
    maxlength: 50,
  },
  specification: {
    type: String,
    default: 'No specification',
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: [true, 'Please provide image URL'],
  },
  review: {
    type: String,
  },
  rate: {
    type: Number,
    set: (v) => Math.round(v),
    min: 0,
    max: 5,
  },
});

module.exports = mongoose.model('Product', productSchema);
