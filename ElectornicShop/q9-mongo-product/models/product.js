const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  productName: {
    type: String,
    required: true
  },
  category: {
    type: String
  },
  price: {
    type: Number,
    required: true
  },
  stock: {
    type: Number
  }
});

module.exports = mongoose.model('Product', productSchema);  