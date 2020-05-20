import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { patchCustWaitlist } from '../exportFiles';

const ReservationsListRow = (props) => {
  const customers = useSelector((state) => state.customers);
  const dispatch = useDispatch();

  const displayTableRows = () => {
    return customers.map((customer, index) => {
      const { name, contact, created_at, id, reservation } = customer;
      const { party_size } = customer.customerWaitlists[0];

      return (
        <Fragment key={index}>
          <tr>
            <td>
              {name}
              <br></br>
              contact: {contact}
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td>
              <button>SMS</button>
            </td>
            <td>
              <button
                name={id}
                onClick={(event, is_waiting) => handleClick(event, is_waiting)}>
                done
              </button>
            </td>
          </tr>
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
