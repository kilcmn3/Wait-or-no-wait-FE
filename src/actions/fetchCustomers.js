export const fetchCustomers = () => {
  return (dispatch) => {
    dispatch({ type: 'START_ADDING_CUSTOMER_REQUEST' });
    fetch('http://localhost:3000/customers')
      .then((response) => response.json())
      .then((customers) => {
        dispatch({ type: 'ADD_CUSTOMERS', customers });
      });
  };
};
