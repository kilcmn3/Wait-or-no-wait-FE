import React, { Fragment, Component } from 'react';
const moment = require('moment');

export class WaitListRow extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addTime: 0,
    };
  }

  addTimer = (count) => {
    let addTime = parseInt(count) + 1;

    // this.setState({ addTime });
    return this.state.addTime;
  };

  customerList = () => {
    return this.props.customers.map((customer, index) => {
      const { name, contact, created_at } = customer;
      const {
        actual_waitTime,
        estimate_waitTime,
        is_texted,
        is_waiting,
        party_size,
      } = customer.customerWaitlists[0];
      const timeZone = moment(created_at).format('h:mm a');

      return (
        <Fragment key={index}>
          <tr>
            <td>{name}</td>
            <td>{party_size}</td>
            <td>{timeZone}</td>
            <td>{setInterval(this.addTimer(estimate_waitTime), 1000)}mins</td>
            <td>
              <button>SMS</button>
            </td>
            <td>
              <button>done</button>
            </td>
          </tr>
        </Fragment>
      );
    });
  };
  render() {
    return <>{this.customerList()}</>;
  }
}

export default WaitListRow;
