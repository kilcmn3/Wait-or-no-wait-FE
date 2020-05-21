import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { patchCustWaitlist } from '../exportFiles';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const moment = require('moment');

const WaitListRow = (props) => {
  const [count, setCount] = useState(0);

  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  const displayTableRows = () => {
    return customers.map((customer, index) => {
      const { name, contact, id } = customer;
      const {
        check_inTime,
        estimate_waitTime,
        is_waiting,
        party_size,
      } = customer.customerWaitlists[0];

      let timeZone = moment(check_inTime).format('h:mm a');

      if (is_waiting) {
        return false;
      } else {
        return (
          <Fragment key={index}>
            <TableRow>
              <TableCell align='right'>
                {name}
                <br></br>
                contact: {contact}
              </TableCell>
              <TableCell align='right'>{party_size}</TableCell>
              <TableCell align='right'>{timeZone}</TableCell>
              <TableCell align='right'>
                {estimate_waitTime + count}mins
              </TableCell>
              <TableCell align='right'>
                <button>SMS</button>
              </TableCell>
              <TableCell align='right'>
                <button
                  name={id}
                  onClick={(event, is_waiting) =>
                    handleClick(event, is_waiting)
                  }>
                  done
                </button>
              </TableCell>
            </TableRow>
          </Fragment>
        );
      }
    });
  };

  const handleClick = (event, is_waiting) => {
    let id = event.target.name;
    return dispatch(patchCustWaitlist(id, is_waiting));
  };

  useInterval(() => {
    setCount((count) => count + 1);
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
