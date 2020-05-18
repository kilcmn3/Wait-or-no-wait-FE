import React from 'react';

export const AddCustForm = (props) => {
  const { name, contact, partySize } = props.customer;
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
          name='partySize'
          value={partySize}
        />
        <label>Submit</label>
        <input type='submit' />
      </form>
    </div>
  );
};

export default AddCustForm;
