import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { patchCustWaitlist } from '../exportFiles';
import IconButton from '@material-ui/core/IconButton';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
import SmsIcon from '@material-ui/icons/Sms';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const moment = require('moment');

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const ReservationsListRow = (props) => {
  const classes = useStyles();
  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  const displayTableRows = () => {
    return customers.map((customer, index) => {
      const { id, name, contact, reservation } = customer;
      const { party_size, check_inTime } = customer.customerWaitlists[0];

      let timeZone = moment(new Date(check_inTime)).format('MM-DD h:mm a');
      if (customer.reservation) {
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
              <TableCell align='right'>
                <IconButton
                  id={id}
                  name='is_texted'
                  edge='start'
                  className={classes.menuButton}
                  color='inherit'
                  aria-label='open drawer'
                  onClick={handleClick}>
                  <SmsIcon></SmsIcon>
                </IconButton>
              </TableCell>
              <TableCell align='right'>
                <IconButton
                  id={id}
                  name='is_waiting'
                  edge='start'
                  className={classes.menuButton}
                  color='inherit'
                  aria-label='open drawer'
                  onClick={handleClick}>
                  <DoneOutlineIcon></DoneOutlineIcon>
                </IconButton>
              </TableCell>
            </TableRow>
          </Fragment>
        );
      } else {
        return false;
      }
    });
  };

  const handleClick = (event, is_waiting) => {
    let id = event.target.name;
    return dispatch(patchCustWaitlist(id, { is_waiting: !is_waiting }));
  };
  return <Fragment>{displayTableRows()}</Fragment>;
};

export default ReservationsListRow;
