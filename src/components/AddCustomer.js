import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddCustForm, addCustomer, postCustomer } from '../exportFiles';
export class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      contact: '',
      party_size: 0,
    };
  }

  //optimistic vs pessmistic
  handleSubmit = (event) => {
    event.preventDefault();
    let data = {
      customer: { name: this.state.name, contact: this.state.contact },
      wait_list: { party_szie: this.state.party_size },
    };
    this.props.addCustomer(this.state);
    this.props.postCustomer(data);
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

const mapDispatchToProps = (dispatch) => {
  return {
    addCustomer: (customer) => dispatch(addCustomer(customer)),
    postCustomer: (customer) => dispatch(postCustomer(customer)),
  };
};

export default connect(null, mapDispatchToProps)(AddCustomer);
