import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';
import { ShopContext } from '../shpocontext/ShopContext';

const Navigation = () => {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/loginSignUp');
  };

  const [activeSection, setActiveSection] = useState('women');
  const { getTotalCartItems } = useContext(ShopContext);
  const [mobileMenuActive, setMobileMenuActive] = useState(false);

  const totalCartItems = getTotalCartItems();

  const toggleMobileMenu = () => {
    setMobileMenuActive(!mobileMenuActive);
  };

  return (
    
    <div className="navbar">
      
      <div className="nav-logo">
        <img src="../../../src/pic/Ecommerce_Assets/Assets/Frontend_Assets/logo.png" alt="Logo" />
        <p>Shoppi</p>
      </div>
      <div className="hamburger-menu" onClick={toggleMobileMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <ul className={`nav-menu ${mobileMenuActive ? 'active' : ''}`}>
        <li className={activeSection === 'shop' ? 'active' : ''}>
          <Link to="/" onClick={() => setActiveSection('shop')}>Shop</Link>
        </li>
        <li className={activeSection === 'men' ? 'active' : ''}>
          <Link to="/men" onClick={() => setActiveSection('men')}>Men</Link>
        </li>
        <li className={activeSection === 'women' ? 'active' : ''}>
          <Link to="/women" onClick={() => setActiveSection('women')}>Women</Link>
        </li>
        <li className={activeSection === 'kids' ? 'active' : ''}>
          <Link to="/kids" onClick={() => setActiveSection('kids')}>Kids</Link>
        </li>
        <li className={activeSection === 'order' ? 'active' : ''}>
          <Link to="/order" >Orders</Link>
        </li>
      </ul>
      
      
      
      <div className={`mobile-menu ${mobileMenuActive ? 'active' : ''}`}>
        {localStorage.getItem('authToken') ? (
          <button onClick={() => { localStorage.removeItem('authToken'); window.location.replace('/'); }}>Logout</button>
        ) : (
          <button onClick={handleLogin}>Login</button>
        )}
        <Link to="/cart">
          <img src="../../../src/pic/Ecommerce_Assets/Assets/Frontend_Assets/cart_icon.png" alt="Cart Icon" />
          <div className="nav-count">{totalCartItems}</div> {/* Display dynamic cart item count */}
        </Link>
      </div>
      
    </div>
  );
};

export default Navigation;
