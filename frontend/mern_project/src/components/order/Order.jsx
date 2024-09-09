import React, { useEffect, useState } from 'react';
import './order.css';

const Order = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch the user's order data from the server
    const fetchOrders = async () => {
      try {
        const response = await fetch('http://localhost:4000/getorder', {
          headers: {
            'authToken': localStorage.getItem('authToken'),
          },
        });
        const data = await response.json();
        console.log("Fetched Orders:", data); // Verify data here
        setOrders(data); // Save the orders in state
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <>
    <h1>Order Details</h1>
     <div className='orders'>
      
      {orders.length > 0 ? (
        orders.map((order, index) => (
          <div key={index} className="order-item">
            <img src={order.image} alt={order.name} />
            <p>Name: {order.name || 'Name not available'}</p>
            <p>New Price: {order.new_price !== undefined ? order.old_price : 'New price not available'}</p>
          </div>
        ))
      ) : (
        <p>No order information available.</p>
      )}
    </div></>
   
  );
};

export default Order;
