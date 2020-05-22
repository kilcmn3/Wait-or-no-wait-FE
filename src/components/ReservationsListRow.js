import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { patchCustWaitlist } from '../exportFiles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const moment = require('moment');

const ReservationsListRow = (props) => {
  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  const displayTableRows = () => {
    return customers.map((customer, index) => {
      const { id, name, contact } = customer;
      const { party_size, check_inTime } = customer.customerWaitlists[0];

      let timeZone = moment(new Date(check_inTime)).format('MM-DD h:mm a');
      return (
        <Fragment key={index}>
          <TableRow>
            <TableCell>
              {name}
              <br></br>
              contact: {contact}
            </TableCell>
            <TableCell align='right'>{party_size}</TableCell>
            <TableCell align='right'>{timeZone}</TableCell>
            <TableCell align='right'></TableCell>
            <TableCell align='right'>
              <button>SMS</button>
            </TableCell>
            <TableCell align='right'>
              <button
                name={id}
                onClick={(event, is_waiting) => handleClick(event, is_waiting)}>
                done
              </button>
            </TableCell>
          </TableRow>
        </Fragment>
      );
    });
  };

  const handleClick = (event, is_waiting) => {
    let id = event.target.name;
    return dispatch(patchCustWaitlist(id, is_waiting));
  };
  return <Fragment>{displayTableRows()}</Fragment>;
};

export default ReservationsListRow;
