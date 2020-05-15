export const addCustomer = (customer) => {
  return {
    type: 'ADD_CUSTOMER',
    customer,
  };
};
