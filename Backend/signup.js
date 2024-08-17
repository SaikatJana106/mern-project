const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const cors = require('cors');
const bcrypt = require('bcrypt');
const router=express.Router()
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
      type: Object,
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
  
  // User registration route
  app.post('/signup', async (req, res) => {
    try {
      let check = await User.findOne({ email: req.body.email });
      if (check) {
        return res.status(400).send({ message: "Duplicate account" });
      }
  
      let cart = {};
      for (let i = 0; i < 300; i++) {
        cart[i] = 0;
      }
  
      const user = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        phone_number: req.body.phone_number,
        password: req.body.password,
        confirm_password: req.body.confirm_password,
        cartData: cart,
      });
  
      await user.save();
      console.log("User saved");
      
      const data = {
        user: {
          id: user.id
        }
      };
  
      const token = jwt.sign(data, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ success: true, token });
    } catch (error) {
      console.error("Error saving user:", error);
      res.status(500).send("Internal Server Error");
    }
  });
  module.exports = router;