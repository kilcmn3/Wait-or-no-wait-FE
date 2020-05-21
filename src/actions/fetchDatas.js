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
        dispatch({
          type: 'SHOW_ALL',
          customers: data.customers,
          waitList: data.waitlist_date,
        });
      })
      .catch((error) => console.log('Error waitList', error));
  };
};

export const postCustomer = (data) => {
  return (dispatch) => {
    fetch(URL + '/customers', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        return dispatch({
          type: 'ADD_CUSTOMER',
          customers: data.customers,
          waitList: data.waitlist_date,
        });
      });
  };
};

export const patchCustWaitlist = (id, data) => {
  return (dispatch) => {
    fetch(URL + '/customer_waitlists/' + id, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({ is_waiting: !data }),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        return dispatch({
          type: 'UPDATE_CUSTOMER',
          customer: data.customer,
        });
      });
  };
};

export const addCustomer = (customer) => {
  return {
    type: 'ADD_CUSTOMER',
    customer,
  };
};

export const dialogControl = (open) => {
  return {
    type: 'DIALOG_CONTROL',
    open,
  };
};
