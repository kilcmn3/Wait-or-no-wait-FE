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
    if (!this.props.fetchWaitLists()) {
      return this.props.postWaitList();
    } else {
      return this.props.fetchWaitLists();
    }
  }

  handleLoading = () => {
    if (this.props.loading) {
      return console.log('loading.....');
    } else if (this.props.customers.length > 0) {
      return <WaitListRow customers={this.props.customers} />;
    }
  };
  render() {
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
  console.log(state);
  return {
    customers: state.customers,
    waitList: state.waitList,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWaitLists: () => dispatch(fetchWaitLists()),
    postWaitList: () => dispatch(postWaitList()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitListContainer);
