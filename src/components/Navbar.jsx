import React from 'react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="navbar">
      <Link to="/dashboard" className="logo">TodoApp</Link>
      <Link to="/" className="btn">Logout</Link>
    </nav>
  );
};

export default Navbar;