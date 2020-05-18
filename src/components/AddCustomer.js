import React, { Component } from 'react';
import { connect } from 'react-redux';
import { AddCustForm, addCustomer, postCustomer } from '../exportFiles';

const initState = {
  name: '',
  contact: '',
  party_size: 0,
  reservation: false,
};
export class AddCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = initState;
  }

  //optimistic vs pessmistic
  handleSubmit = (event) => {
    event.preventDefault();
    const { name, contact, reservation } = this.state;
    let data = {
      customer: { name, contact, reservation },
      wait_list: { party_size: this.state.party_size },
    };
    this.props.addCustomer(this.state);
    this.props.postCustomer(data);
    this.setState(initState);
  };

  handleChange = (event) => {
    const target = event.target;
    const value = target.name === 'reservation' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
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
