import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ padding: '10px', backgroundColor: '#eee' }}>
      <Link to="/">Home</Link> |{' '}
      <Link to="/about">About</Link> |{' '}
      <Link to="/contact">Contact</Link> |{' '}
      <Link to="/user/virat">User (Virat)</Link>
    </nav>
  );
}

export default Navbar;
