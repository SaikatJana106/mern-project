import React, { createContext, useEffect, useState } from 'react';

// Create the context
export const ShopContext = createContext(null);

// Initialize the cart with default values
const getDefaultCart = () => {
  let cart = {};
  for (let i = 0; i < 300 + 1; i++) { // Ensure this range matches your product IDs
    cart[i] = 0;
  }
  return cart;
};

// Define the provider
const ShopProvider = ({ children }) => {
  const [cartItem, setCartItem] = useState(getDefaultCart());
  const [all_product, setAllProduct] = useState([]);

  // Fetch product data from the server
  useEffect(() => {
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => {
        console.log('Fetched Products:', data); // Debug: Log fetched products
        setAllProduct(data);
      })
      .catch((error) => console.error('Error fetching products:', error));

    if (localStorage.getItem("Login successful")) {
      fetch('http://localhost:4000/getcart', {
        method: 'post',
        headers: {
          Accept: 'application/json',
          'Login successful': `Bearer ${localStorage.getItem('Login successful')}`,
          'Content-Type': 'application/json',
        },
        body: "",
      })
        .then((response) => response.json())
        .then((data) => setCartItem(data))
        .catch((error) => console.error('Error fetching cart:', error)); // Handle cart fetch errors
    }
  }, []);


  // Add an item to the cart
  const addToCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
  };

  // Remove an item from the cart
  const removeFromCart = (itemId) => {
    setCartItem((prev) => ({ ...prev, [itemId]: Math.max(0, prev[itemId] - 1) }));
  };

  // Calculate the total amount of the cart
  const getTotalAmount = () => {
    let totalAmount = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        const itemInfo = all_product.find((product) => product.id === Number(item));
        if (itemInfo) {
          totalAmount += itemInfo.new_price * cartItem[item];
        }
      }
    }
    return totalAmount;
  };

  // Calculate the total number of items in the cart
  const getTotalCartItems = () => {
    let totalItems = 0;
    for (const item in cartItem) {
      if (cartItem[item] > 0) {
        totalItems += cartItem[item];
      }
    }
    return totalItems;
  };

  const contextValue = {
    getTotalCartItems,
    getTotalAmount,
    all_product,
    cartItem,
    addToCart,
    removeFromCart,
  };

  return <ShopContext.Provider value={contextValue}>{children}</ShopContext.Provider>;
};

export default ShopProvider;
