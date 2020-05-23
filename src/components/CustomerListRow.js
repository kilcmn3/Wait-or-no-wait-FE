import React, { Fragment } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const CustomerListRow = (props) => {
  const displayHistory = () => {
    if (props.customers) {
      return props.customers.map((customer, index) => {
        const { name, contact, reservation } = customer;
        return (
          <Fragment>
            <TableRow>
              <TableCell>{name}</TableCell>
              <TableCell align='right'>{contact}</TableCell>
              <TableCell align='right'>visit</TableCell>
              <TableCell align='right'>last visit</TableCell>
            </TableRow>
          </Fragment>
        );
      });
    } else {
      return false;
    }
  };
  return displayHistory();
};

export default CustomerListRow;
