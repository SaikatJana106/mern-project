import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './buy.css';

const Buy = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const [paymentType, setPaymentType] = useState('cash');
  const navigate = useNavigate();

  const handleOrder = async () => {
    try {
      await axios.post('/saveorder', {
        orderData: { product },
        paymentType
      }, {
        headers: { 'authToken': localStorage.getItem('token') }
      });
      // Navigate to order confirmation or other page
    } catch (error) {
      console.error("Error saving order:", error);
    }
  };

  return (
    <>
      <h1>Checkout</h1>
      {product ? (
        <div className="buy-item">
          <img src={product.image} alt={product.name} />
          <p>{product.name}</p>
          <p>${product.price}</p>
          <div className="payment-method">
            <label>
              <input
                type='radio'
                name='payType'
                value="cash"
                checked={paymentType === 'cash'}
                onChange={() => setPaymentType('cash')}
              /> Cash
            </label>
            <label>
              <input
                type="radio"
                name='payType'
                value="online"
                checked={paymentType === 'online'}
                onChange={() => setPaymentType('online')}
              /> Online
            </label>
          </div>
          <div className="orderplacebtn">
            <button onClick={handleOrder}>Order</button>
          </div>
        </div>
      ) : (
        <p>No product selected. Please go back and select a product to buy.</p>
      )}
    </>
  );
};

export default Buy;
