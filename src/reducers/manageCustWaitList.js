const iniState = { customers: [], waitList: [] };

const manageCustWaitList = (state = iniState, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      return {
        ...state,
        customers: action.customers,
        waitList: action.waitList,
      };
    case 'ADD_CUSTOMER':
      return {
        ...state,
        customers: [...state.customers, action.customers],
      };
    case 'UPDATE_CUSTOMER':
      console.log(action);
      return state.customers.map((customer) => {
        if (customer.id !== action.customer.id) {
          return customer;
        }
        return {
          ...customer,
          ...action.customer,
        };
      });
    default:
      return state;
  }
};

export default manageCustWaitList;
