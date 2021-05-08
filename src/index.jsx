import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import thunk from 'redux-thunk';
import { BrowserRouter } from 'react-router-dom';
import manageCustWaitList from './reducers/manageCustWaitList';

//STORE -> Globalize State
const store = createStore(manageCustWaitList, applyMiddleware(thunk));

//Action *ADD, REMOVE

//Reducer: Check which action  your are doing

//Dispatch: excute reducer action

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter forceRefresh={true}>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
