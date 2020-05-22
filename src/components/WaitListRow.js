import React, { useState, useEffect, useRef, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import SmsIcon from '@material-ui/icons/Sms';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { patchCustWaitlist, updateCustomer } from '../exportFiles';

const moment = require('moment');
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const WaitListRow = (props) => {
  const classes = useStyles();
  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  let estTime;
  let targetID;
  let targetCustomer;
  const displayTableRows = () => {
    return customers.map((customer, index) => {
      const { name, contact, reservation } = customer;
      const {
        id,
        check_inTime,
        estimate_waitTime,
        is_waiting,
        party_size,
      } = customer.customerWaitlists[0];

      const timeZone = moment(new Date(check_inTime)).format('h:mm a');

      targetID = customer.customerWaitlists[0].id;
      estTime = estimate_waitTime - 1;

      if (is_waiting) {
        return false;
      } else {
        targetCustomer = customer;
        return (
          <Fragment key={index}>
            <TableRow>
              <TableCell>
                {reservation ? `${name}|| Reservation` : name}
                <br></br>
                contact: {contact}
              </TableCell>
              <TableCell align='right'>{party_size}</TableCell>
              <TableCell align='right'>{timeZone}</TableCell>
              <TableCell align='right'>{estimate_waitTime}mins</TableCell>
              <TableCell align='right'>
                <IconButton
                  id={id}
                  name='is_texted'
                  edge='start'
                  className={classes.menuButton}
                  color='inherit'
                  aria-label='open drawer'
                  onClick={handleClick}>
                  <SmsIcon>SMS</SmsIcon>
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
                  <SmsIcon>done</SmsIcon>
                </IconButton>
              </TableCell>
            </TableRow>
          </Fragment>
        );
      }
    });
  };

  const handleClick = (event, is_waiting) => {
    let target = event.currentTarget;
    let name = target.name;
    let copyCustomer = { ...targetCustomer };
    copyCustomer.customerWaitlists[0].is_waiting = true;

    if (name === 'is_waiting') {
      dispatch(updateCustomer(copyCustomer));
      dispatch(patchCustWaitlist(target.id, { [name]: true }));
    } else {
      console.log(name);
      dispatch(patchCustWaitlist(target.id, { [name]: true }));
    }
  };

  //TODO Weird bug, every time it decrease suddenly the list is gone
  useInterval(() => {
    dispatch(patchCustWaitlist(targetID, { estimate_waitTime: estTime }));
  }, 60000);

  return <Fragment>{displayTableRows()}</Fragment>;
};

const useInterval = (callback, addWaitTime) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  });

  useEffect(() => {
    const tick = () => {
      savedCallback.current();
    };

    let id = setInterval(tick, addWaitTime);
    return () => clearInterval(id);
  }, [addWaitTime]);
};

export default WaitListRow;
