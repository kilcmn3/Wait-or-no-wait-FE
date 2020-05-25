const iniState = { customers: [], waitList: [], owner: [] };

const manageCustWaitList = (state = iniState, action) => {
  switch (action.type) {
    case 'SHOW_ALL':
      console.log(state);
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
      return state.customers.map((customer) => {
        if (customer.id !== action.customer.id) {
          return customer;
        }

        return {
          ...customer,
          ...action.customer,
        };
      });
    case 'OWNER_LOGIN/SIGNUP':
      return window.localStorage.setItem('owner', action.owner.id);

    default:
      return state;
  }
};

export default manageCustWaitList;
