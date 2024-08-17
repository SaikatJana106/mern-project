import React from 'react';
import { useLocation } from 'react-router-dom';
import './order.css';

const Order = () => {
  const location = useLocation();
  const { product } = location.state || {}; // Retrieve product from state

  return (
    <div>
      <h1>Order Details</h1>
      {product ? (
        <div className="order-item">
          <img src={product.image} alt={product.name} />
          <p>{product.name}</p>
          <p>Price: ${product.price}</p>
        </div>
      ) : (
        <p>No product information available.</p>
      )}
    </div>
  );
};

export default Order;
