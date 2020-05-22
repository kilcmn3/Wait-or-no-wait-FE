import React, { useState, useEffect, useRef, Fragment } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { useSelector, useDispatch } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import SmsIcon from '@material-ui/icons/Sms';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';
import { patchCustWaitlist } from '../exportFiles';

const moment = require('moment');
const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

const WaitListRow = (props) => {
  const classes = useStyles();
  const [count, setCount] = useState(0);

  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  let estTime;
  let custId;
  const displayTableRows = () => {
    return customers.map((customer, index) => {
      const { name, contact, id, reservation } = customer;
      const {
        check_inTime,
        estimate_waitTime,
        is_waiting,
        party_size,
      } = customer.customerWaitlists[0];

      let timeZone = moment(new Date(check_inTime)).format('h:mm a');
      estTime = estimate_waitTime;
      custId = id;

      if (is_waiting) {
        return false;
      } else {
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
              <TableCell align='right'>
                {estimate_waitTime + count}mins
              </TableCell>
              <TableCell align='right'>
                <IconButton
                  edge='start'
                  className={classes.menuButton}
                  color='inherit'
                  aria-label='open drawer'
                  onClick={props.handleSMS}>
                  <SmsIcon>SMS</SmsIcon>
                </IconButton>
              </TableCell>
              <TableCell align='right'>
                <SmsIcon
                  name={id}
                  onClick={(event, is_waiting) =>
                    handleClick(event, is_waiting)
                  }>
                  done
                </SmsIcon>
              </TableCell>
            </TableRow>
          </Fragment>
        );
      }
    });
  };

  const handleClick = (event, is_waiting) => {
    let id = event.target.name;
    return dispatch(patchCustWaitlist(id, { is_waiting: !is_waiting }));
  };

  //TODO Weird bug, every time it decrease suddenly the list is gone
  useInterval(() => {
    setCount((count) => count - 1);
    dispatch(patchCustWaitlist(custId, { estimate_waitTime: estTime + count }));
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
