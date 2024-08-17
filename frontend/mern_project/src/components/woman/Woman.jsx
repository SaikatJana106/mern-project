import React, { useEffect, useState } from 'react';
import Iteam from '../iteam-layout-design/Iteam';
import Image from 'react-bootstrap/Image';
import './woman.css';

const Woman = () => {
  const [womenProducts, setWomenProducts] = useState([]);

  useEffect(() => {
    // Fetch women's products directly from the server
    fetch('http://localhost:4000/allproducts?category=women')
      .then((response) => response.json())
      .then((data) => setWomenProducts(data))
      .catch((error) => console.error("Error fetching women's products:", error));
  }, []);

  return (
    <>
      <Image src="../../../src/pic/kk.png" className='posterimg' fluid />
      <div className="iteam"></div>
      <p className='iteam'>
        <span>Showing {womenProducts.length} out of {womenProducts.length} products</span>
      </p>
      <div className="all-collection">
        {womenProducts.map((item, index) => (
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

export default Woman;
