app.post('/removeproduct', async (req, res) => {
    try {
      await Product.findOneAndDelete({ id: req.body.id });
      console.log("Removed");
      res.json({
        success: true,
        name: req.body.name
      });
    } catch (error) {
      console.error("Error removing product:", error);
      res.status(500).send("Internal Server Error");
    }
  });