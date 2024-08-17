import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import ShopProvider from './components/shpocontext/ShopContext.jsx';
// import ShopProvider from '../shpocontext/ShopContext'; // Ensure the correct path to ShopContext

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ShopProvider>
      <App/>
    </ShopProvider>
  </React.StrictMode>
);
