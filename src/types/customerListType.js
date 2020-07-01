import { arrayOf, shape } from 'prop-types';

import paginationType from './paginationType';
import customerDetailType from './customerDetailType';

const CustomerListeType = {
  customers: arrayOf(shape(customerDetailType)),
  pagination: shape(paginationType),
};

export default CustomerListeType;
