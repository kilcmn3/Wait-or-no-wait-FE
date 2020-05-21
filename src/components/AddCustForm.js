import React, { Fragment } from 'react';

const moment = require('moment');

export const AddCustForm = (props) => {
  const { name, contact, party_size, reservation, time } = props.customer;

  return (
    <div className='add cust form'>
      <form onSubmit={props.handleSubmit}>
        <label>Name</label>
        <input
          type='text'
          onChange={props.handleChanges}
          name='name'
          value={name}
        />
        <label>Contact</label>
        <input
          type='text'
          onChange={props.handleChanges}
          name='contact'
          value={contact}
        />
        <label>Party size</label>
        <input
          type='number'
          onChange={props.handleChanges}
          name='party_size'
          value={party_size}
        />
        <label>Reservation</label>
        <input
          type='checkbox'
          onChange={props.handleChanges}
          name='reservation'
          checked={reservation}
        />
        {reservation ? (
          <Fragment>
            <label>Time</label>
            <input
              type='datetime-local'
              onChange={props.handleChanges}
              value={time}
              name='time'
              min={time}
              max={moment().add(1, 'year').format()}
              required
            />
          </Fragment>
        ) : (
          false
        )}
        <label>Submit</label>
        <input type='submit' />
      </form>
    </div>
  );
};

export default AddCustForm;
