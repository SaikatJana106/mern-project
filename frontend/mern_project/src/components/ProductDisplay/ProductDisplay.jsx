import React, { useContext } from 'react';
import { ShopContext } from '../shpocontext/ShopContext';
import { useNavigate } from 'react-router-dom';
import './Productdisplay.css';

const ProductDisplay = ({ product }) => {
  if (!product) {
    return <div>No product information available</div>;
  }

  const { addToCart } = useContext(ShopContext);
  const navigate = useNavigate();

  const handleBuy = () => {
    navigate('/buy', { state: { product } });
  };

  return (
    <>
      <div className="ProductDisplay">
        <div className="ProductDisplayimageLeft">
          <div className="productDiplayList">
            {[...Array(4)].map((_, i) => (
              <img key={i} src={product.image} alt={`Product view ${i + 1}`} />
            ))}
          </div>
        </div>
        <div className="ProductDisplayimageRight">
          <img className="productDisplayMainImage" src={product.image} alt="Main product view" />
        </div>
        <div className="productDisplayright">
          <h1>{product.name}</h1>
          <div className="product-star">
            <img src="../../../src/pic/Ecommerce_Assets/Assets/Frontend_Assets/star_icon.png" alt="" />
            <img src="../../../../src/pic/Ecommerce_Assets/Assets/Frontend_Assets/star_icon.png" alt="" />
            <img src="../../../../src/pic/Ecommerce_Assets/Assets/Frontend_Assets/star_icon.png" alt="" />
            <img src="../../../../src/pic/Ecommerce_Assets/Assets/Frontend_Assets/star_icon.png" alt="" />
            <img src="../../../src/pic/Ecommerce_Assets/Assets/Frontend_Assets/star_dull_icon.png" alt="" />
            <span>(122)</span>
          </div>
          <div className="product-diplay-right-prices">
            <div className="oldprice">${product.old_price}</div>
            <div className="newprice">${product.new_price}</div>
          </div>
          <div className="description">
            hi it is a good product
          </div>
          <div className="size">
            <h1>Select Size</h1>
            <div className="product-sizes">
              <span>S</span>
              <span>M</span>
              <span>L</span>
              <span>XL</span>
              <span>XXL</span>
            </div>
          </div>
          <button onClick={() => addToCart(product.id)}>ADD TO CART</button>
          <button onClick={handleBuy}>BUY</button>
        </div>
      </div>
    </>
  );
};

export default ProductDisplay;
