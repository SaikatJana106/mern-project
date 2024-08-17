import React, { useEffect, useState } from 'react';
import Iteam from '../iteam-layout-design/Iteam';
import Image from 'react-bootstrap/Image';
import './kids.css';

const Kids = () => {
  const [kidsProducts, setKidsProducts] = useState([]);

  useEffect(() => {
    // Fetch kids' products directly from the server
    fetch('http://localhost:4000/allproducts?category=kid')
      .then((response) => response.json())
      .then((data) => setKidsProducts(data))
      .catch((error) => console.error("Error fetching kids' products:", error));
  }, []);

  return (
    <>
      <Image src="../../../src/pic/kk.png" className='posterimg' fluid />
      <div className="iteam"></div>
      <p className='iteam'>
        <span>Showing {kidsProducts.length} out of {kidsProducts.length} products</span>
      </p>
      <div className="all-collection">
        {kidsProducts.map((item, index) => (
          <Iteam
            key={index}
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.new_price}
          />
        ))}
      </div>
      <div className="seeMoreBtn">
        <button>See more</button>
      </div>
    </>
  );
}

export default Kids;
