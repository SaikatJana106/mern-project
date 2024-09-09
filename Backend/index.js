const port = 4000;
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");
const cors = require("cors");
const express = require("express");
const fs = require("fs");
const bcrypt = require("bcrypt"); // For hashing passwords
const { use } = require("bcrypt/promises");

const app = express();
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect("mongodb+srv://saikatjana123890:saikat2004@cluster0.qydjq.mongodb.net/e-comerce", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB");
}).catch((error) => {
  console.error("Error connecting to MongoDB:", error);
});

// Ensure upload directory exists
const uploadDir = path.join(__dirname, 'upload', 'images');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer setup for file storage
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'upload/images'); // Ensure 'upload/images' is the correct directory path
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
app.use('/images', express.static('upload/images'));

app.post('/upload', upload.single('image'), (req, res) => { // Ensure 'image' matches the name attribute in your client form
  if (!req.file) {
    return res.status(400).send('No file uploaded.');
  }
  console.log(req.file, req.body);
  res.json({
    success: 1,
    image_url: `http://localhost:${port}/images/${req.file.filename}`
  });
});



// Basic route
app.get("/", (req, res) => {
  res.send("Hi from home");
});

// Product schema definition
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
  populer: {
    type: Boolean,
    default: true,
  },
});

// Create a model
const Product = mongoose.model('Product', productSchema);


app.post('/addproduct', upload.single('image'), async (req, res) => {

  const product = new Product({
    id:req.body. id,
    image: req.file ? req.file.path : '', 
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
  })


}); 

// API for getting all products
app.get('/allproducts', async (req, res) => {
  try {
    let allproduct = await Product.find({});
    console.log("All products fetched");
    const products = await Product.aggregate([
      { $sample: {size:allproduct.length } }        // Randomly sample items
    ]);
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Assuming you have an 'category' field in your Product model
app.get('/filterproduct', async (req, res) => {
  try {
    const category = req.query.category;
    let query = {};
    if (category) {
      query.category = category; // Filter by category
    }
    let products = await Product.find(query);
    console.log("All products fetched");
    res.send(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).send("Internal Server Error");
  }
});


//related product field
app.get('/relatedproduct', async (req, res) => {
  try {
    const category = req.query.category;
    let query = {}; // Only fetch products where 'populer' is true

    // If a category is provided, include it in the query
    if (category) {
      query.category = category; 
    }

    // Fetch 4 random popular items from the database
    const populerItems = await Product.aggregate([
      { $match: query },                // Match documents where 'populer' is true and category (if provided)
      { $sample: { size: 4 } }          // Randomly sample 4 items
    ]);

    res.send(populerItems);
  } catch (error) {
    console.error("Error fetching popular items:", error);
    res.status(500).send({ error: "Error fetching popular items" });
  }
});


//for remove product
// app.post('/removeproduct', async (req, res) => {
//   try {
//     await Product.findOneAndDelete({ id: req.body.id });
//     console.log("Removed");
//     res.json({
//       success: true,
//       name: req.body.name
//     });
//   } catch (error) {
//     console.error("Error removing product:", error);
//     res.status(500).send("Internal Server Error");
//   }
// });


// User schema definition
const userSchema = new mongoose.Schema({
  first_name: {
    type: String,
    required: true,
  },
  last_name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  phone_number: {
    type: Number,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  confirm_password: {
    type: String,
    required: true,
    validate: {
      validator: function (value) {
        return value === this.password;
      },
      message: "Passwords do not match."
    },

  },
  cartData: {
    type: Array,
    default: [],
  },
  buyData: {
    type: Array,
    default: [],
  },
  paymentType: {
    type: String,
  },
  date: {
    type: Date,
    default: Date.now,
  }
});

// Hash the password before saving the user
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    this.password = await bcrypt.hash(this.password, 10);
    this.confirm_password = undefined; // Do not store confirm_password
    next();
  } catch (error) {
    return next(error);
  }
});

// Create a User model
const User = mongoose.model('User', userSchema);

// User signup 
app.post('/signup', async (req, res) => {
  let check = await User.findOne({ email: req.body.email });
  if (check) {
    return res.status(400).send({ message: "Duplicate account" });
  }

  let cart = {}, buy = {};
  for (let i = 0; i < 300; i++) {
    cart[i] = 0;
    buy[i] = 0;
  }

  const user = new User({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    phone_number: req.body.phone_number,
    password: req.body.password,
    confirm_password: req.body.confirm_password,
    cartData: cart,
    buyData: buy,
  });

  try {
    await user.save();
    const data = { user: { id: user._id } };
    const token = jwt.sign(data, 'secret_ecom', { expiresIn: '1h' });

    console.log("User saved");
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error saving user:", error);
    res.status(500).send("Internal Server Error");
  }
});

// user login
app.post('/login', async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(req.body.password, user.password);
    if (!isMatch) {
      return res.status(401).json({ success: false, message: "Invalid email or password" });
    }

    const data = {
      user: {
        id: user.id,
      },
    };

    const token = jwt.sign(data, 'secret_ecom');
    res.json({ success: true, token });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).send("Internal Server Error");
  }
})

//display populer item
app.get('/populer', async (req, res) => {
  try {
    const populerItems = await Product.aggregate([
      { $match: { populer: true } }, // Match documents with 'populer' set to true
      { $sample: { size: 4 } }        // Randomly sample 4 items
    ]);
    res.send(populerItems);
  } catch (error) {
    console.error("Error fetching popular items:", error);
    res.status(500).send({ error: "Error fetching popular items" });
  }
});



// Middleware to authenticate and fetch user
const fetchuser = (req, res, next) => {
  // Get the token from the request header
  const token = req.header('authToken');
  if (!token) {
    return res.status(401).json({ error: "Please authenticate with a valid token" });
  }
  try {
    // Verify the token using the secret key
    const data = jwt.verify(token, 'secret_ecom');
    req.user = data.user;
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token, authentication failed" });
  }
};



// Route to get user's cart
app.post('/getcart', fetchuser, async (req, res) => {
  console.log("Fetching cart data");
  try {
    let userdat = await User.findOne({ _id: req.user.id }); // Corrected model name to 'User'
    res.json(userdat.cartData);
  } catch (error) {
    console.error("Error fetching cart data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Add a route to update the user's cart
app.post('/updatecart', fetchuser, async (req, res) => {
  try {
    const { cartData } = req.body;
    await User.findByIdAndUpdate(req.user.id, { cartData });
    res.json({ success: true });
  } catch (error) {
    console.error("Error updating cart data:", error);
    res.status(500).send("Internal Server Error");
  }
});

// Add a route to save the user's order
// Save order to databse
app.post('/saveorder', fetchuser, async (req, res) => {
  try {
    const { orderData, paymentType } = req.body;

    // Fetch the current user's buyData
    const user = await User.findById(req.user.id);

    if (user) {
      // Append the new order to the existing buyData array
      const updatedBuyData = [...user.buyData, orderData];

      // Update the user's buyData and paymentType in the database
      await User.findByIdAndUpdate(req.user.id, { buyData: updatedBuyData, paymentType });

      res.json({ success: true });
    } else {
      res.status(404).send("User not found");
    }
  } catch (error) {
    console.error("Error saving order data:", error);
    res.status(500).send("Internal Server Error");
  }
});



// Add a route to fetch the user's order
app.get('/getorder', fetchuser, async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (user && user.buyData) {
      res.json(user.buyData); // Send back the array of orders
    } else {
      res.status(404).send("No orders found");
    }
  } catch (error) {
    console.error("Error fetching order data:", error);
    res.status(500).send("Internal Server Error");
  }
});


// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});



