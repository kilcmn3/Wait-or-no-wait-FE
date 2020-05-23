import React, { Fragment } from 'react';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const moment = require('moment');

const CustomerListRow = (props) => {
  const displayHistory = () => {
    if (props.customers) {
      return props.customers.map((customer, index) => {
        const { name, contact, customerWaitlists } = customer;
        const checkTime =
          customerWaitlists[customerWaitlists.length - 1].check_inTime;
        const lastVist = moment(checkTime).format('MM-DD');

        return (
          <Fragment key={index}>
            <TableRow>
              <TableCell>{name}</TableCell>
              <TableCell align='right'>{contact}</TableCell>
              <TableCell align='right'>{customerWaitlists.length}</TableCell>
              <TableCell align='right'>{lastVist}</TableCell>
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
