import React, { Component } from 'react';
import { WaitListRow, ReservationListRow } from '../exportFiles';
export class WaitListContainer extends Component {
  render() {
    return (
      <div>
        WaitListContainer Hello?
        <table>
          <tr>
            <th>Name</th>
            <th>Party Size</th>
            <th>Check in Time</th>
            <th>Quoted</th>
            <th>Notification</th>
            <th>Actions</th>
          </tr>
          <tr>
            <WaitListRow />
          </tr>
        </table>
      </div>
    );
  }
}

export default WaitListContainer;
