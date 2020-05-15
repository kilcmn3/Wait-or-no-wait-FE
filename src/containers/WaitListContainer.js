import React, { Component } from 'react';
import { WaitListRow, ReservationListRow } from '../exportFiles';
export class WaitListContainer extends Component {
  render() {
    return (
      <div>
        WaitListContainer
        <WaitListRow />
        <ReservationListRow />
      </div>
    );
  }
}

export default WaitListContainer;
