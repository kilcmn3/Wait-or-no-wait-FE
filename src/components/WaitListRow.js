import React, { useEffect, useRef, Fragment } from 'react';
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
import Typography from '@material-ui/core/Typography';
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

  let estTime;
  let targetID;
  let targetCustomer;

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
    return props.customers.map((customer, index) => {
      const { name, contact, reservation } = customer;
      const {
        id,
        check_inTime,
        estimate_waitTime,
        is_texted,
        is_waiting,
        party_size,
      } = customer.customerWaitlists[0];
      // const currentDate = moment(new Date(check_inTime))
      //   .format()
      //   .isSame(new Date(), 'day');
      const currentTime = moment(new Date()).format();
      const compareTime = moment(new Date(check_inTime)).format();
      const todayOnly = moment(currentTime).isSame(compareTime, 'day');
      const timeZone = moment(new Date(check_inTime)).format('h:mm a');

      targetID = customer.customerWaitlists[0].id;
      estTime = estimate_waitTime - 1;

      if (is_waiting || !todayOnly) {
        return false;
      } else {
        targetCustomer = customer;
        return (
          <Fragment key={index}>
            <TableRow>
              <TableCell>
                {isReserved(name, reservation)}
                <Box fontWeight='fontWeightLight' m={1}>
                  {contact}
                </Box>
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
    });
  };

  const handleClick = (event) => {
    let target = event.currentTarget;
    let name = target.name;
    let copyCustomer = { ...targetCustomer };
    copyCustomer.customerWaitlists[0].is_waiting = true;

    if (name === 'is_waiting') dispatch(updateCustomer(copyCustomer));

    dispatch(patchCustWaitlist(target.id, { [name]: true }));
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
