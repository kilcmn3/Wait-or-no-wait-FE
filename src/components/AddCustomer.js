import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddCustForm } from '../exportFiles';
import { addCustomer } from '../actions/index';

export class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      contact: '',
      partySize: 0,
    };
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.addCustomer(this.state);
  };

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    return (
      <div>
        AddCustomer compt
        <AddCustForm
          customer={this.state}
          handleChanges={this.handleChange}
          handleSubmit={this.handleSubmit}
        />
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    customers: state.customers,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addCustomer: (customer) => dispatch(addCustomer(customer)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCustomer);
