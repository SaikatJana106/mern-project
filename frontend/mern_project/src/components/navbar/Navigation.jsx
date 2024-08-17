import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { ShopContext } from '../shpocontext/ShopContext';
// import Populer from '../populer/Populer';

const Navigation = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/loginSignUp');
  };

  const [activeSection, setActiveSection] = useState('women');
  const { getTotalCartItems } = useContext(ShopContext);

  // Use getTotalCartItems to get the current cart item count
  const totalCartItems = getTotalCartItems();

  return (
    <div className="navbar">
      <div className="nav-logo">
        <img src="../../../src/pic/Ecommerce_Assets/Assets/Frontend_Assets/logo.png" alt="Logo" />
        <p>Shoppi</p>
      </div>
      <ul className="nav-menu">
        <li><Link to="/" onClick={() => setActiveSection('women')}>Shop</Link></li>
        <li><Link to="/men" onClick={() => setActiveSection('men')}>Men</Link></li>
        <li><Link to="/women" onClick={() => setActiveSection('women')}>Women</Link></li>
        <li><Link to="/kids" onClick={() => setActiveSection('kids')}>Kids</Link></li>
        <li><Link to="/order" onClick={() => setActiveSection('order')}>Orders</Link></li>
      </ul>
      <div className="navlogin-cart">
        {localStorage.getItem('authToken') ? (
          <button onClick={() => { localStorage.removeItem('authToken'); window.location.replace('/'); }}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
        <Link to="/cart">
          <img src="../../../src/pic/Ecommerce_Assets/Assets/Frontend_Assets/cart_icon.png" alt="Cart Icon" />
        </Link>
        <div className="nav-count">{totalCartItems}</div> {/* Display dynamic cart item count */}
      </div>
    </div>
  );
};

export default Navigation;
