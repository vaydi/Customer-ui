import { Provider } from 'react-redux';
import React from 'react';
import ReactDOM from 'react-dom';

import App from './App/App';
import configureStore from './configureStore';
import registerServiceWorker from './registerServiceWorker';

const store = configureStore();
ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root'),
);

registerServiceWorker();
