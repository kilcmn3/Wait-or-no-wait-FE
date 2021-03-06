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
    let owner = localStorage.getItem('owner');
    fetch(URL + `/waitlists?q=${owner}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.code === 400) {
          dispatch({
            type: '@@INIT',
          });
        } else {
          dispatch({
            type: 'SHOW_ALL',
            customers: data.customers,
            waitList: data.waitlist_date,
          });
        }
      })
      .catch((error) => console.log('Error waitList', error));
  };
};

export const searchWaitLists = (search) => {
  return (dispatch) => {
    fetch(URL + '/waitlists/search', {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(search),
    })
      .then((response) => response.json())
      .then((search) => {
        dispatch({
          type: 'SHOW_ALL',
          customers: search.customers,
          waitList: search.waitlist_date,
        });
      });
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
        dispatch({
          type: 'SHOW_ALL',
          customers: data.customers,
          waitList: data.waitlist_date,
        });
      })

      .catch((error) => console.log('Error postCustomer', error));
  };
};

export const patchCustWaitlist = (id, data) => {
  console.log('patching????');
  return (dispatch) => {
    fetch(URL + '/customer_waitlists/' + id, {
      method: 'PATCH',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify(data),
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        dispatch({
          type: 'SHOW_ALL',
          customers: data.customers,
          waitList: data.waitlist_date,
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

export const updateCustomer = (customer) => {
  return {
    type: 'UPDATE_CUSTOMER',
    customer,
  };
};
