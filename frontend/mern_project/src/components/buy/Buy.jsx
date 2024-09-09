import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './buy.css';

const Buy = () => {
  const location = useLocation();
  const { product } = location.state || {};
  const [paymentType, setPaymentType] = useState('cash');
  const navigate = useNavigate();

  const handleOrder = async () => {
    try {
      const response = await fetch('http://localhost:4000/saveorder', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authToken': localStorage.getItem('authToken'),
        },
        body: JSON.stringify({
          orderData: product,
          paymentType: paymentType,
        }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Server error: ${errorText}`);
      }

      const result = await response.json();
      console.log('Order saved successfully:', result);
      navigate('/Order');
    } catch (error) {
      console.error('Error saving order:', error);
    }
  };

  return (
    <>
      <h1>Checkout</h1>
      {product ? (
        <div className="buy-item">
          <img src={product.image} alt={product.name} />
          
          {/* Wrap product name and price in the same div for alignment */}
          <div className="product-details">
            <p>{product.name}</p>
            <p>${product.price}{product.new_price}</p>
          </div>

          <div className="payment-method">
            <label>
              <input
                type="radio"
                name="payType"
                value="cash"
                checked={paymentType === 'cash'}
                onChange={() => setPaymentType('cash')}
              /> 
              Cash
            </label>
            <label>
              <input
                type="radio"
                name="payType"
                value="online"
                checked={paymentType === 'online'}
                onChange={() => setPaymentType('online')}
              /> 
              Online
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
