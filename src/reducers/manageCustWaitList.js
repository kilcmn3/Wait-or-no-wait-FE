const manageCustWaitList = (
  state = { customers: [], waitList: [], open: false },
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
        customers: action.customers,
      };
    case 'UPDATE_CUSTOMER':
      let copyArray = state.customers.filter(
        (target) => target.id !== action.customer.id
      );
      return {
        ...state,
        customers: copyArray,
      };
    case 'DIALOG_CONTROL':
      console.log(action.open);
      if (action.open) {
        return {
          ...state,
          open: false,
        };
      } else if (!action.open) {
        return {
          ...state,
          open: true,
        };
      }

    default:
      return state;
  }
};

export default manageCustWaitList;
