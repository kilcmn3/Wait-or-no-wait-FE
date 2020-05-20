import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  WaitListRow,
  fetchWaitLists,
  ReservationListRow,
} from '../exportFiles';
export class WaitListContainer extends Component {
  componentDidMount() {
    this.props.fetchWaitLists();
  }

  //TODO Maybe don't need  msp?
  currentUrl = () => {
    let path = window.location.pathname.split('/')[1];
    if (path === 'reservations') {
      return <ReservationListRow />;
    } else if (this.props.customers.length > 0) {
      return <WaitListRow />;
    } else {
      return false;
    }
  };

  displayWaitList = () => {
    return [
      'PARTY',
      'SIZE',
      'QUOTED',
      'WAIT',
      'NOTIFY',
      'ACTIONS',
    ].map((text, index) => <th key={index}>{text}</th>);
  };

  render() {
    return (
      <div>
        <table>
          <thead>
            <tr>{this.displayWaitList()}</tr>
          </thead>
          <tbody>{this.currentUrl()}</tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    customers: state.customers,
    waitList: state.waitList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWaitLists: () => dispatch(fetchWaitLists()),
  };
};

//TODO Maybe don't need  msp?
export default connect(mapStateToProps, mapDispatchToProps)(WaitListContainer);
