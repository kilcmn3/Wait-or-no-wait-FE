const URL = 'http://localhost:3000/';

export const fetchCustomers = () => {
  return (dispatch) => {
    dispatch({ type: 'START_ADDING_CUSTOMER_REQUEST' });
    fetch(URL + '/customers')
      .then((response) => response.json())
      .then((customers) => {
        dispatch({ type: 'ADD_CUSTOMERS', customers });
      });
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
      });
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

// export const postWaitList = () => {
//   return (dispath) => {
//     fetch(URL + '/waitlists', {
//       method: 'POST',
//       headers: {
//         'content-type': 'application/json',
//       },
//       body: JSON.stringify({"waitlist_date": }),
//     })
//       .then((response) => response.json())
//       .then((respJSON) => console.log(respJSON));
//   };
// };
