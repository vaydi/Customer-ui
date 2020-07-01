import { RECEIVE_CUSTOMER_DATA } from "./actions";

// eslint-disable-next-line import/no-anonymous-default-export
export default (state = {}, { type, listeCustomer }) => {
  switch (type) {
    case RECEIVE_CUSTOMER_DATA:
      return listeCustomer;
    default:
      return state;
  }
};
