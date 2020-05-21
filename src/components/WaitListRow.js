import React, { useState, useEffect, useRef, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { patchCustWaitlist } from '../exportFiles';

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
            <tr>
              <td>
                {name}
                <br></br>
                contact: {contact}
              </td>
              <td>{party_size}</td>
              <td>{timeZone}</td>
              <td>{estimate_waitTime + count}mins</td>
              <td>
                <button>SMS</button>
              </td>
              <td>
                <button
                  name={id}
                  onClick={(event, is_waiting) =>
                    handleClick(event, is_waiting)
                  }>
                  done
                </button>
              </td>
            </tr>
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
