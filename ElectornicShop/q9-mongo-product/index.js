const express = require('express');
const mongoose = require('mongoose');
const Product = require('./models/product');

const app = express();
const PORT = 8000;


app.use(express.json());


mongoose.connect('mongodb://127.0.0.1:27017/shopDB')
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error:', err));


app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      count: products.length,
      data: products
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});


app.get('/products/:id', async (req, res) => {
  try {
    const { id } = req.params;

    
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    const product = await Product.findById(id);

    if (!product) {
      return res.status(404).json({
        success: false,
        message: 'Product not found'
      });
    }

    res.status(200).json({
      success: true,
      message: 'Product fetched successfully',
      data: product
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Server error',
      error: error.message
    });
  }
});


app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});