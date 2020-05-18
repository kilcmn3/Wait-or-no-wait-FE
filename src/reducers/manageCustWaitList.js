const manageCustWaitList = (
  state = { customers: [], waitList: [], loading: false },
  action
) => {
  console.log(action);
  switch (action.type) {
    case 'START_ADDING_CUSTOMER_REQUEST':
      return {
        ...state,
        customers: [...state.customers],
        loading: true,
      };
    case 'SHOW_ALL':
      return {
        ...state,
        customers: action.customers,
        waitList: action.waitList,
        loading: false,
      };
    default:
      return state;
  }
};
export default manageCustWaitList;
