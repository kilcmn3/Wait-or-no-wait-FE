import React, { Component } from 'react';
import { connect } from 'react-redux';
import { WaitListRow, ReservationListRow } from '../exportFiles';
import { fetchCustomers } from '../actions/fetchCustomers';
export class WaitListContainer extends Component {
  componentDidMount() {
    this.props.fetchCustomers();
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
    loading: state.loading,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    fetchCustomers: () => dispatch(fetchCustomers()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(WaitListContainer);
