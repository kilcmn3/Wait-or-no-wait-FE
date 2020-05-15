export const fetchCustomers = () => {
  return (dispatch) => {
    dispatch({
      type: 'START_ADDING_CUSTOMER_REQUEST',
    });
    fetch('http://localhost:3000')
      .then((response) => response.json())
      .then((customers) => dispatch({ type: 'ADD_CUSTOMER', customers }));
  };
};
