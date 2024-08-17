const express = require('express');
const router = express.Router();
app.get('/newcollection', async (req, res) => {
    try {
      const newproduct = await Product.find({});
      const newcollection = newproduct.slice(-20); // Get last 20 products
      res.send(newcollection);
    } catch (error) {
      console.error("Error fetching new collection:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  module.exports = router;
