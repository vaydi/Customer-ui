import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import React, { Component, Fragment } from 'react';

import ConnectedCustomer from '../ConnectedCustomersList';

class App extends Component {
  render = () => (
    <BrowserRouter>
      <Fragment>
        <Switch>
          <Route path="/" component={ConnectedCustomer} />
          <Redirect to="/" />
        </Switch>
      </Fragment>
    </BrowserRouter>
  );
}

export default App;
