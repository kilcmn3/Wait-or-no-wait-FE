import React, { Component } from 'react';
import { CustomerListRow } from '../exportFiles';
import Searchbar from '../components/Searchbar';
export class CustomersContainer extends Component {
  render() {
    return (
      <div className='customers conatiner'>
        CustomersContainer
        <Searchbar />
        <CustomerListRow />
      </div>
    );
  }
}

export default CustomersContainer;
