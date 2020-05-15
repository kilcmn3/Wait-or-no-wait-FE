const manageCustomers = (state = { customers: [] }, action) => {
  switch (action.type) {
    case 'START_ADDING_CUSTOMER_REQUEST':
      return {
        ...state,
        customers: [...state.customers],
        requesting: true,
      };

    case 'ADD_CUSTOMER':
      return {
        ...state,
        customers: [...state.customers],
        requesting: false,
      };

    default:
      return state;
  }
};

export default manageCustomers;
