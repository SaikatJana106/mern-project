const uploadDir = path.join(__dirname, 'upload', 'images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './upload/images');
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

// Serve static files from the upload directory
app.use('/images', express.static('upload/images'));

// File upload route
app.post("/upload", upload.single('product'), (req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  console.log(req.file, req.body);
  res.send("File uploaded successfully");
});

const productSchema = new mongoose.Schema({
    id: {
      type: Number,
      required: true,
    },
    name: {
      type: String,
      required: true,
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    new_price: {
      type: Number,
      required: true,
    },
    old_price: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    available: {
      type: Boolean,
      default: true,
    },
  });
  
  // Create a model
  const Product = mongoose.model('Product', productSchema);
  
  // Route to add a product
  app.post('/addproduct', async (req, res) => {
    try {
      let products = await Product.find({});
      let id = products.length > 0 ? products[products.length - 1].id + 1 : 1;
  
      const product = new Product({
        id: id,
        name: req.body.name,
        image: req.body.image,
        category: req.body.category,
        new_price: req.body.new_price,
        old_price: req.body.old_price,
      });
  
      await product.save();
      console.log("Product saved");
      res.json({
        success: true,
        name: req.body.name,
      });
    } catch (error) {
      console.error("Error saving product:", error);
      res.status(500).send("Internal Server Error");
    }
  });