import React, { Fragment } from 'react';
const moment = require('moment');

const WaitListRow = (props) => {
  const customerList = () => {
    return props.customers.map((customer, index) => {
      const { name, contact, created_at } = customer;
      let timeZone = moment(created_at).format('h:mm a');

      return (
        <Fragment key={index}>
          <tr>
            <td>{name}</td>
            <td>{contact}</td>
            <td>{timeZone}</td>
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
  return <>{customerList()}</>;
};

export default WaitListRow;
