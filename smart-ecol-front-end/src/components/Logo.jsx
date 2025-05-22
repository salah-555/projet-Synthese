import React from 'react'
import { Link } from 'react-router-dom';
import './Logo.css'

const Logo = () => {
  return (
    <Link to="/" className="logo-link">
      <div className="logo-box">
        <span className="logo-letter">E</span>
      </div>
      <span className="logo-text">
        <span className="eco">Eco</span>
        <span className="smart">Smart</span>
      </span>
    </Link>
  );
};

export default Logo;