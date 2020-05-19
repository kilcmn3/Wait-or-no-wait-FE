import React, { useState, useEffect, useRef, Fragment } from 'react';
const moment = require('moment');

const WaitListRow = (props) => {
  const [count, setCount] = useState(0);

  useInterval(() => {
    setCount(count + 1);
  }, 60000);
  const customerList = () => {
    return props.customers.map((customer, index) => {
      const { name, contact, created_at } = customer;
      const {
        actual_waitTime,
        estimate_waitTime,
        is_texted,
        is_waiting,
        party_size,
      } = customer.customerWaitlists[0];
      let timeZone = moment(created_at).format('h:mm a');

      return (
        <Fragment key={index}>
          <tr>
            <td>{name}</td>
            <td>{party_size}</td>
            <td>{timeZone}</td>
            <td>{estimate_waitTime + count}mins</td>
            <td>
              <button>SMS</button>
            </td>
            <td>
              <button>done</button>
            </td>
          </tr>
        </Fragment>
      );
    });
  };
  return <>{customerList()}</>;
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
