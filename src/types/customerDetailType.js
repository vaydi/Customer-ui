import { number, shape, string } from 'prop-types';

const paymentOption = {
  id: number,
  name: string,
};

const customerDetail = {
  amout: number,
  creation_date: string,
  order_ref: string,
  payment_option: shape(paymentOption),
  status: string,
  customer_num: number,
  type: string,
};

export default customerDetail;
