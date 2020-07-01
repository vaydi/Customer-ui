import { applyMiddleware, compose, createStore } from 'redux';
import createSagaMiddleWare from 'redux-saga';

import reducers from './reducer';
import rootSagas from './saga';

const sagaMiddleware = createSagaMiddleWare();
const configureStore = () => {

  const middleware = [sagaMiddleware];
  const enhancers = compose(
    applyMiddleware(...middleware),
    window.devToolsExtension ? window.devToolsExtension() : f => f,
  );

  const store = createStore(reducers, enhancers);
  sagaMiddleware.run(rootSagas);
  return store;
};

export default configureStore;
