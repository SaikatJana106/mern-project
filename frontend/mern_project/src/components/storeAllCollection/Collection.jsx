import React, { useEffect, useState } from 'react';
import Iteam from '../iteam-layout-design/Iteam';
import './collection.css';

const Collection = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    // Fetch all products from the server
    fetch('http://localhost:4000/allproducts')
      .then((response) => response.json())
      .then((data) => setProducts(data))
      .catch((error) => console.error('Error fetching all products:', error));
  }, []);

  return (
    <>
      <p className='iteam'>
        <span>Showing {products.length} {">"}out of {products.length} {">"}products</span>
      </p>
      <div className="all-collection">
        {products.map((item, index) => (
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

export default Collection;
