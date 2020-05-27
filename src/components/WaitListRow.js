import React, { useState, useEffect, useRef, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useDispatch } from 'react-redux';
import { green } from '@material-ui/core/colors';
import Box from '@material-ui/core/Box';
import IconButton from '@material-ui/core/IconButton';
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import DoneOutlineIcon from '@material-ui/icons/DoneOutline';
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
  const dispatch = useDispatch();
  const { name, contact, reservation, customerWaitlists } = props.customer;
  const {
    id,
    check_inTime,
    estimate_waitTime,
    is_texted,
    is_waiting,
    party_size,
  } = customerWaitlists[0];
  const [timer, setTimer] = useState(false);

  const displayTexted = (text) => {
    if (text) {
      return (
        <Fragment>
          <Box fontSize={12} textAlign='left'>
            <DoneOutlineIcon style={{ fontSize: 15 }} />
            {'  '} Texted
          </Box>
        </Fragment>
      );
    } else {
      return false;
    }
  };

  const isReserved = (name, reservation) => {
    if (reservation) {
      return (
        <Fragment>
          <Box textAlign='left' fontWeight='fontWeightBold' m={1}>
            {name} | Reservation
          </Box>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <Box textAlign='left' fontWeight='fontWeightBold' m={1}>
            {name}{' '}
          </Box>
        </Fragment>
      );
    }
  };

  const displayTableRows = () => {
    const currentTime = moment(new Date()).format();
    const compareTime = moment(new Date(check_inTime)).format();
    const todayOnly = moment(currentTime).isSame(compareTime, 'day');
    const timeZone = moment(new Date(check_inTime)).format('h:mm a');

    if (is_waiting || !todayOnly) {
      return false;
    } else {
      return (
        <Fragment>
          <TableRow>
            <TableCell>
              {isReserved(name, reservation)}
              <Box fontWeight='fontWeightLight' m={1}>
                {contact}
              </Box>
            </TableCell>
            <TableCell align='right'>{party_size}</TableCell>
            <TableCell align='right'>{timeZone}</TableCell>
            <TableCell align='right'>
              {reservation ? 'reserved' : `${estimate_waitTime}mins`}
            </TableCell>
            <TableCell align='right'>
              <IconButton
                id={id}
                name='is_texted'
                edge='start'
                className={classes.menuButton}
                color='inherit'
                aria-label='open drawer'
                onClick={handleClick}>
                <SmsIcon style={{ fontSize: 30 }} />
              </IconButton>
              {displayTexted(is_texted)}
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
                <CheckCircleOutlineIcon
                  style={{
                    color: green[500],
                    fontSize: 35,
                  }}></CheckCircleOutlineIcon>
              </IconButton>
            </TableCell>
          </TableRow>
        </Fragment>
      );
    }
  };

  const handleClick = (event) => {
    let target = event.currentTarget;
    let name = target.name;
    let copyCustomer = { ...props.customer };
    copyCustomer.customerWaitlists[0].is_waiting = true;

    if (name === 'is_waiting') {
      dispatch(updateCustomer(copyCustomer));
    }
    return dispatch(patchCustWaitlist(id, { [name]: true }));
  };

  // TODO Weird bug, every time it decrease suddenly the list is gone
  useEffect(() => {
    let newTIme = estimate_waitTime - 1;
    const timer = window.setInterval(() => {
      fetch('http://localhost:3000' + '/customer_waitlists/' + id, {
        method: 'PATCH',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({ estimate_waitTime: newTIme }),
      })
        .then((response) => response.json())
        .then((data) => {
          dispatch({
            type: 'SHOW_ALL',
            customers: data.customers,
            waitList: data.waitlist_date,
          });
        })
        .then(() => setTimer((timer) => !timer));
    }, 20000);

    return () => {
      window.clearInterval(timer);
    };
  }, [timer]);

  return <Fragment>{displayTableRows()}</Fragment>;
};

export default WaitListRow;
