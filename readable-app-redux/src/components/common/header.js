import React from 'react';
import { Link } from 'react-router-dom';
import FontAwesome from 'react-fontawesome';

const Header = props => {
  return (
    <nav className="navbar navbar-default navbar-fixed-top">
      <div className="container-fluid">
        <Link to="/" className="navbar-brand">
          <FontAwesome name="book" /> Readable
        </Link>
        <p className="navbar-text">(by Naveen Pete)</p>
      </div>
    </nav>
  );
};

export default Header;
