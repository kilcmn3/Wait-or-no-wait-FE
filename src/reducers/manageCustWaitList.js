const manageCustWaitList = (
  state = { customers: [], waitList: [], customer: [] },
  action
) => {
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
        customer: action.customer,
      };
    case 'UPDATE_CUSTOMER':
      return {
        ...state,
        customer: action.cuustomer,
      };
    default:
      return state;
  }
};

export default manageCustWaitList;
