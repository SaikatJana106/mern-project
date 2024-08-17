import React from 'react';


const Breadcrumps = ({ product }) => {
  if (!product) {
    return <div>No breadcrumbs data available</div>;
  }

  return (
    <div className="breadcrum">
      Home <img src="" alt="" /> Shop <img src="" alt="" /> {product.category} <img src="" alt="" /> {product.name}
    </div>
  );
};

export default Breadcrumps;
