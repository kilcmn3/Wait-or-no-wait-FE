import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddCustForm, addCustomer, postCustomer } from '../exportFiles';

const moment = require('moment');

const initState = {
  name: '',
  contact: '',
  party_size: null,
  reservation: false,
  estimate_waitTime: 0,
  checkIn: moment(new Date()).format(),
};
export class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  //optimistic vs pessmistic
  handleSubmit = (event) => {
    event.preventDefault();

    const {
      name,
      contact,
      reservation,
      checkIn,
      estimate_waitTime,
    } = this.state;

    let data = {
      customer: { name, contact, reservation },
      wait_list: { party_size: this.state.party_size },
      cust_waitlist: { estimate_waitTime, checkIn },
    };
    this.props.postCustomer(data);
    this.setState(initState);
  };

  handleTime = (time) => {
    console.log(time);
    this.setState({
      checkIn: time.format(),
      reservation: true,
    });
  };

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value,
    });
  };

  handleEstimateTime = (event) => {
    let value;
    if (event.currentTarget.name === 'time-reduce') {
      value = Math.max(this.state.estimate_waitTime - 5, 0);
    } else {
      value = this.state.estimate_waitTime + 5;
    }

    this.setState({
      estimate_waitTime: value,
    });
  };
  render() {
    return (
      <div className='add-customer'>
        <AddCustForm
          customer={this.state}
          handleChanges={this.handleChange}
          handleSubmit={this.handleSubmit}
          handleEstimateTime={this.handleEstimateTime}
          handleTime={this.handleTime}
          handleClose={this.props.handleClose}
        />
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    addCustomer: (customer) => dispatch(addCustomer(customer)),
    postCustomer: (customer) => dispatch(postCustomer(customer)),
  };
};

export default connect(null, mapDispatchToProps)(AddCustomer);
