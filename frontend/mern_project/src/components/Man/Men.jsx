import React, { useEffect, useState } from 'react';
import Iteam from '../iteam-layout-design/Iteam';
import "./men.css";
import Image from 'react-bootstrap/Image';
import Relatedproduct from '../relatedproduct/Relatedproduct';
import kkImage from '../../../src/pic/banner_mens.png'; // Importing image directly

const Men = () => {
  const [menProducts, setMenProducts] = useState([]);

  useEffect(() => {
    // Fetch men's products directly from the server
    fetch('http://localhost:4000/filterproduct?category=men')
      .then((response) => response.json())
      .then((data) => setMenProducts(data))
      .catch((error) => console.error('Error fetching men\'s products:', error));
  }, []);

  return (
    <>
      {/* Displaying the image using the imported file */}
      <Image src={kkImage} className='posterimg' fluid />
      
      <div className="iteam"></div>
      <p className='iteam'>
        <span>Showing {menProducts.length} {">"} out of {menProducts.length} {">"} products</span>
      </p>

      <div className="all-collection">
        {menProducts.map((item, index) => (
          <Iteam
            key={index}
            id={item.id}
            name={item.name}
            image={item.image}
            price={item.new_price}
          />
        ))}
      </div>
      
      {/* Passing category prop to Relatedproduct */}
      <Relatedproduct category="men" />
    </>
  );
};

export default Men;
