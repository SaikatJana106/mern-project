import React, { useContext } from 'react';
import { ShopContext } from '../shpocontext/ShopContext';
import axios from 'axios';
import "./cartItam.css";

const CartItems = () => {
  const { getTotalAmount, all_product, cartItem, removeFromCart } = useContext(ShopContext);

  const handleBuy = async () => {
    try {
      await axios.post('/updatecart', { cartData: cartItem }, {
        headers: { 'authToken': localStorage.getItem('token') }
      });
      // Navigate to checkout or order page
    } catch (error) {
      console.error("Error updating cart:", error);
    }
  };

  return (
    <div className="cart-items">
      <div className="cart-format-main">
        <p>Products</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr />
      {all_product.map((product) => {
        if (cartItem[product.id] > 0) {
          return (
            <div key={product.id} className="cart-items-format">
              <img src={product.image} alt={product.name} />
              <p>{product.name}</p>
              <p>${product.new_price}</p>
              <p>{cartItem[product.id]}</p>
              <p>${cartItem[product.id] * product.new_price}</p>
              <img
                src="../../../src/pic/Ecommerce_Assets/Assets/Frontend_Assets/remove_icon.png"
                alt="Remove"
                onClick={() => removeFromCart(product.id)}
                className="remove-icon"
              />
              <hr />
            </div>
          );
        }
        return null;
      })}
      <div className="cartitems-down">
        <div className="cartitems-total">
          <h1>Cart Totals</h1>
          <div>
            <div className="cartitems-total-iteam">
              <p>Subtotal</p>
              <p>${getTotalAmount}</p>
            </div>
            <hr />
            <div className="cartitems-total-iteam">
              <p>Shipping Fee</p>
              <p>Free</p>
            </div>
            <hr />
            <div className="cartitems-total-iteam">
              <h3>Total</h3>
              <h3>${getTotalAmount}</h3>
            </div>
          </div>
          <button onClick={handleBuy}>Buy</button>
        </div>
      </div>
    </div>
  );
};

export default CartItems;
