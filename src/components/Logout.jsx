import React, { Fragment } from 'react';
import { Redirect } from 'react-router-dom';

const Logout = (props) => {
  const ownerLogout = () => {
    window.localStorage.clear();
  };

  return (
    <Fragment>
      {ownerLogout()}
      <Redirect to='/login' />
    </Fragment>
  );
};

export default Logout;
