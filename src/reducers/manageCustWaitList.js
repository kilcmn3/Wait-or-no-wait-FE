const manageCustWaitList = (
  state = { customers: [], waitList: [] },
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
        customers: [...state.customers, action.customers],
        waitList: action.waitList,
      };
    default:
      return state;
  }
};
export default manageCustWaitList;
