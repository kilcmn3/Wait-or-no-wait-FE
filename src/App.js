import React from 'react';
import {
  AddCustomer,
  Header,
  Navbar,
  MainContainer,
  WaitListContainer,
} from './exportFiles';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <div className='app'>
      {/* <Navbar /> */}
      <Header />
      <Switch>
        <Route path='/add-customer' component={AddCustomer} />
        <Route path='/reservations' component={WaitListContainer} />
        <Route path='/' component={MainContainer} />
      </Switch>
    </div>
  );
};

export default App;
