import React, { Fragment } from 'react';

const WaitListRow = (props) => {
  const customerList = () => {
    return props.customers.map((customer, index) => {
      console.log(props.customers);
      const { id, name, contact, created_at } = customer;
      return (
        <Fragment key={index}>
          <tr>
            <td>{name}</td>
            <td>{contact}</td>
            <td>{created_at}</td>
          </tr>
        </Fragment>
      );
    });
  };
  return <>{customerList()}</>;
};

export default WaitListRow;
