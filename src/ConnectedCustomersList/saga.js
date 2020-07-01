/* eslint-disable no-console */
import { call, put, takeEvery } from 'redux-saga/effects';

import { receiveCustomerData, REQUEST_CUSTOMER_DATA } from './Redux/actions';
import customerApi from '../services/customersApi';

export  function* getCustomerData(action) {
  try {

    const data = yield call(
      customerApi.GetListeCustomers,
      action.payload.token,
      action.payload.currentPage,
      action.payload.resultByPage);

    if (data) {

      yield put(receiveCustomerData(data));
    }
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(`Error saga getCustomerData: ${e}`);
  }
}

export default function* mySagaGetCustomer() {

  yield takeEvery(REQUEST_CUSTOMER_DATA, getCustomerData);
}
