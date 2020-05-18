const moment = require('moment');
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
        if (data.length === 0) {
          return dispatch({ type: '@@init' });
        } else {
          return dispatch({
            type: 'SHOW_ALL',
            customers: data[0].customers,
            waitList: data[0].waitlist_date,
          });
        }
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
      .then((data) => {
        console.log(data);
      });
  };
};

export const postWaitList = () => {
  let waitlist = moment().format('dddd, MMMM Do YYYY, h:mm:ss a');

  return (dispatch) => {
    fetch(URL + '/waitlists', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ waitlist }),
    })
      .then((response) => response.json())
      .then((data) => {
        return dispatch({
          type: 'SHOW_ALL',
          customers: [],
          waitList: data.waitlist_date,
        });
      });
  };
};
