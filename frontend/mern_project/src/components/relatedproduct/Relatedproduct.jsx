import React, { useEffect, useState } from 'react';
import Iteam from '../iteam-layout-design/Iteam';
import './relatedProduct.css';

const Relatedproduct = ({ category }) => {
  const [relatedProduct, setRelatedProduct] = useState([]);
  const defaultCategory = "men";
  const categoryToFetch = category || defaultCategory;

  useEffect(() => {
    fetch(`http://localhost:4000/relatedproduct?category=${categoryToFetch}`)
      .then((response) => response.json())
      .then((data) => setRelatedProduct(data))
      .catch((error) => console.error('Error fetching products:', error));
  }, [categoryToFetch]);  // Include category as a dependency

  return (
    <>
      <div className="relatedproduct-text">
        <h1>Related Products for {categoryToFetch}</h1>
      </div>
      <div className='related-container'>
        {relatedProduct.map((item, index) => (
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

export default Relatedproduct;
