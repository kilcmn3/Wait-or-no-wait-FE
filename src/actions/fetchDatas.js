const moment = require('moment');
moment().format();

const URL = 'http://localhost:3000';

export const fetchCustomers = () => {
  return (dispatch) => {
    dispatch({ type: 'START_ADDING_CUSTOMER_REQUEST' });
    fetch(URL + '/customers')
      .then((response) => response.json())
      .then((customers) => {
        dispatch({ type: 'ADD_CUSTOMERS', customers });
      })
      .catch((error) => console.log('Error customer', error));
  };
};

export const fetchWaitLists = () => {
  return (dispatch) => {
    fetch(URL + '/waitlists')
      .then((response) => response.json())
      .then((data) => {
        return dispatch({
          type: 'SHOW_ALL',
          customers: data.customers,
          waitList: data.waitlist_date,
        });
      })
      .catch((error) => console.log('Error waitList', error));
  };
};

export const postCustomer = (data) => {
  return (dispath) => {
    fetch(URL + '/customers', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((respJSON) => console.log(respJSON));
  };
};

export const postWaitList = () => {
  let waitlist_date = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');

  return (dispatch) => {
    fetch(URL + '/waitlists', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ waitlist_date: waitlist_date, owner_id: 3 }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return dispatch({
          type: 'SHOW_ALL',
          customers: [],
          waitList: data,
        });
      });
  };
};
