import React from 'react';
import { Link } from 'react-router-dom';
import { FaStar, FaSearch } from 'react-icons/fa';
import './Navbar.css';

const Navbar = ({ onSearch }) => {
  return (
    <nav className="navbar">
      <div className="nav-left">
        <Link to="/" className="logo">
          <span className="logo-star"><FaStar /></span>
          <span>Review<span style={{ color: 'var(--primary-color)' }}>&RATE</span></span>
        </Link>
      </div>

      <div className="nav-center">
        <div className="search-container">
          <input 
            type="text" 
            placeholder="Search..." 
            className="search-input"
            onChange={(e) => onSearch && onSearch(e.target.value)}
          />
          <FaSearch className="search-icon" />
        </div>
      </div>

      <div className="nav-right">
        <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'default' }}>SignUp</button>
        <button className="nav-link" style={{ background: 'none', border: 'none', cursor: 'default' }}>Login</button>
      </div>
    </nav>
  );
};

export default Navbar;
