import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
      <div>
        <ul className="topnav">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About Us</Link></li>
          <li><Link to="/inventory">Signs</Link></li>
          <li><Link to="/contact">Cart</Link></li>
          <li><Link to="/login">Login</Link></li>
        </ul>
      </div>
  );
};

export default Navbar;