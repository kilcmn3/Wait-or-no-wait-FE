import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { Navbar, Login } from './exportFiles';

// import manage from './reducers/manage';

//STORE -> Globalize State
// let store = createStore(
//   manage,
//   window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
// );

//Action *ADD, REMOVE

//Reducer: Check which action  your are doing

//Dispatch: excute reducer action

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path='/login' component={Login} />
      <Route path='/' component={App} />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root')
);
