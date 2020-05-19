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

  currentUrl = () => {
    let path = window.location.pathname.split('/')[1];
    if (path === 'reservations') {
      let customer = this.props.customers.filter(
        (target) => target.reservation
      );
      return <ReservationListRow customer={customer} />;
    } else if (this.props.customers.length > 0) {
      return <WaitListRow customers={this.props.customers} />;
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

export default connect(mapStateToProps, mapDispatchToProps)(WaitListContainer);
