import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import manageCustomers from './reducers/manageCustomers';

//STORE -> Globalize State
const store = createStore(manageCustomers, applyMiddleware(thunk));

//Action *ADD, REMOVE

//Reducer: Check which action  your are doing

//Dispatch: excute reducer action

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
