import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
export class Navbar extends Component {
  render() {
    return (
      <div>
        Navbar
        <NavLink to='/profile'>Profile</NavLink>
        <NavLink to='/reservations'>Reservations</NavLink>
        <NavLink to='/customers'>Customers</NavLink>
        <NavLink to='/logout'>Log out</NavLink>
      </div>
    );
  }
}

export default Navbar;
