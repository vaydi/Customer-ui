import { fork } from 'redux-saga/effects';

// eslint-disable-next-line import/no-named-as-default
import mySagaGetCustomer from './ConnectedCustomersList/saga';

export default function* rootSaga() {
  yield* [fork(mySagaGetCustomer)];
}
