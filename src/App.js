import React from 'react';
import { Navbar, Header, MainContainer, AddCustomer } from './exportFiles';
import { Route, Switch } from 'react-router-dom';

const App = () => {
  return (
    <div className='app'>
      {/* <Navbar /> */}
      <Header />
      <Switch>
        <Route path='/add-customer' component={AddCustomer} />
        <Route path='/' component={MainContainer} />
      </Switch>
    </div>
  );
};

export default App;
