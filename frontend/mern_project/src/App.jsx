import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/navbar/Navigation';
import Shop from './components/shop/Shop';
import Woman from './components/woman/Woman';
import Kids from './components/kids/Kids';
import Product from './components/product/Product';
import Carts from './components/cart/Carts';
import Footerr from './components/footer/Footerr';
import Men from './components/Man/Men';
import LoginSignup from './components/loginAndSignup/LoginSignup';
import Buy from './components/buy/Buy';
import Order from './components/order/Order';
// import Login from './components/login/Login';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Shop />} />
          <Route path="/men" element={<Men />} />
          <Route path="/women" element={<Woman />} />
          <Route path="/kids" element={<Kids />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Carts />} />
          <Route path="/loginSignUp" element={<LoginSignup />} />
          <Route path="/order" element={<Order />} />
          <Route path="/buy" element={<Buy />} />
        </Routes>
        <Footerr />
      </BrowserRouter>
    </>
  );
}

export default App;
