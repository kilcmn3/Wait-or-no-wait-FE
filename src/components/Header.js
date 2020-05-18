import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export class Header extends Component {
  render() {
    return (
      <header>
        <h1>Header</h1>
        <Link to='/add-customer'>
          <button type='button'>Add Cust</button>
        </Link>
      </header>
    );
  }
}

export default Header;
