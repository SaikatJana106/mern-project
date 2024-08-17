import React, { useContext } from 'react';
import { useParams } from 'react-router-dom';
import Breadcrumps from '../breadcrumps/Breadcrumps';
import ProductDisplay from '../ProductDisplay/ProductDisplay';
import { ShopContext } from '../shpocontext/ShopContext'; // Ensure correct import path
import Relatedproduct from '../relatedproduct/Relatedproduct';

const Product = () => {
  const { all_product } = useContext(ShopContext);
  const { productId } = useParams();

  // Debug: Log the context value
  console.log('Context Value:', all_product);

  const product = all_product.find((e) => e.id.toString() === productId);

  if (!product) {
    return <div>Product not found</div>;
  }

  return (
    <div>
      <Breadcrumps product={product} />
      <ProductDisplay product={product} />
      <Relatedproduct/>
    </div>
  );
};

export default Product;
