import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import Provider from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import {
  Login,
  Profile,
  CustomersContainer,
  manageCustomers,
} from './exportFiles';

//STORE -> Globalize State
let store = createStore(
  manageCustomers,
  applyMiddleware(thunk),
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

//Action *ADD, REMOVE

//Reducer: Check which action  your are doing

//Dispatch: excute reducer action

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path='/profile' component={App} />
        <Route path='/reservations' component={App} />
        <Route path='/' component={App} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
