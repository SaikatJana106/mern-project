import React from 'react'
import data from '../../pic/Ecommerce_Assets/Assets/Frontend_Assets/data';
import Iteam from '../iteam-layout-design/Iteam';
import'./relatedProduct.css'
const Relatedproduct = () => {
  return (
    <>
      <div className="relatedproduct-text">
        <h1>Related Products</h1>
      </div>
      <div className='related-container '>

        {data.map((item, index) => (
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
  )
}

export default Relatedproduct
