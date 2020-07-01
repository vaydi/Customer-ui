export const REQUEST_CUSTOMER_DATA = "REQUEST_CUSTOMER_DATA";
export const RECEIVE_CUSTOMER_DATA = "RECEIVE_CUSTOMER_DATA";

export const requestCustomerData = (token, currentPage, resultByPage) => ({
   type: REQUEST_CUSTOMER_DATA,
   payload: {
    token,
    currentPage,
    resultByPage
  },
  });
export const receiveCustomerData = listeCustomer => ({ type: RECEIVE_CUSTOMER_DATA, listeCustomer });
