import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  WaitListRow,
  ReservationListRow,
  fetchWaitLists,
  postWaitList,
} from '../exportFiles';
export class WaitListContainer extends Component {
  componentDidMount() {
    this.props.fetchWaitLists();
  }

  handleLoading = () => {
    if (this.props.customers) {
      return <WaitListRow customers={this.props.customers} />;
    }
  };
  render() {
    console.log(this.props);
    return (
      <div>
        <table>
          <thead>
            <tr>
              {[
                'Name',
                'Party Size',
                'Check in Time',
                'Quotes',
                'Notification',
                'Actions',
              ].map((text, index) => (
                <th key={index}>{text}</th>
              ))}
            </tr>
          </thead>
          <tbody>{this.handleLoading()}</tbody>
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
    postWaitList: () => dispatch(postWaitList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitListContainer);
