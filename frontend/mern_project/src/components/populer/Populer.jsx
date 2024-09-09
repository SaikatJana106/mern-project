import React, { useState, useEffect } from 'react';
import Iteam from '../iteam-layout-design/Iteam';
import './populer.css';

const Populer = ({ activeSection }) => {
  const [populerProducts, setPopulerProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Use activeSection instead of category
        const response = await fetch(`http://localhost:4000/populer?category=${activeSection}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        if (!Array.isArray(data)) {
          throw new Error('Data is not an array');
        }
        setPopulerProducts(data);
      } catch (error) {
        console.error('Error fetching popular products:', error);
        setPopulerProducts([]); // Optional: Set to empty array or handle as needed
      }
    };

    fetchData();
  }, [activeSection]);

 

  return (
    <>
      <div className="populer-eoman-text">
        <p>Populer items</p>
      </div>
      <div className="populer-container">
        {populerProducts.map((item, index) => (
          <Iteam
            key={index}
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.new_price}
          />
        ))}
      </div>
    </>
  );
};

export default Populer;
