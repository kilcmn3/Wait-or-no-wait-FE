import React, { Component } from 'react';
import { CustomersContainer, WaitListContainer } from '../exportFiles';

export class MainContainer extends Component {
  render() {
    return (
      <div>
        MainContainer
        <CustomersContainer />
        <WaitListContainer />
      </div>
    );
  }
}

export default MainContainer;
