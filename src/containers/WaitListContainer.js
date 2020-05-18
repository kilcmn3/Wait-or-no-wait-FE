import React, { Component } from 'react';
import { connect } from 'react-redux';
import {
  WaitListRow,
  ReservationListRow,
  fetchWaitLists,
} from '../exportFiles';
export class WaitListContainer extends Component {
  componentDidMount() {
    this.props.fetchWaitLists();
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
  return {
    customers: state.customers,
    waitList: state.waitList,
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchWaitLists: () => dispatch(fetchWaitLists()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitListContainer);
