// products.js
const express = require('express');
const router = express.Router();
const Product = require('./models/Product'); // Adjust the path to your Product model

router.get('/allproducts', async (req, res) => {
  try {
    const category = req.query.category;
    let products;

    if (category) {
      products = await Product.find({ category: category });
    } else {
      products = await Product.find({});
    }

    console.log("Products fetched");
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

module.exports = router;
