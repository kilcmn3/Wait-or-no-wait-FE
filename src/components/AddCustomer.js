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
  time: moment(new Date()).format(),
};
export class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  //optimistic vs pessmistic
  handleSubmit = (event) => {
    event.preventDefault();

    const { name, contact, reservation, time } = this.state;
    let data = {
      customer: { name, contact, reservation, time },
      wait_list: { party_size: this.state.party_size },
      isCheck: false,
    };
    this.props.addCustomer(this.state);
    this.props.postCustomer(data);
    this.setState(initState);
  };

  handleChange = (event) => {
    const target = event.target;
    const name = target.name;
    const value = target.name === 'reservation' ? target.checked : target.value;

    this.setState({
      [name]: value,
    });
  };

  render() {
    return (
      <div className='add-customer'>
        <AddCustForm
          customer={this.state}
          handleChanges={this.handleChange}
          handleSubmit={this.handleSubmit}
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
