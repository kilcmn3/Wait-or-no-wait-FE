const manageCustomers = (state = { customers: [], loading: false }, action) => {
  console.log(action.type);
  switch (action.type) {
    case 'START_ADDING_CUSTOMER_REQUEST':
      return {
        ...state,
        customers: [...state.customers],
        loading: true,
      };
    case 'ADD_CUSTOMERS':
      return {
        ...state,
        customers: action.customers,
        loading: false,
      };
    default:
      return state;
  }
};
export default manageCustomers;
