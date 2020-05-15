import React from 'react';
import { Navbar, HeaderContainer, MainContainer } from './exportFiles';

const App = () => {
  console.log(window.location.href);
  return (
    <div className='app'>
      App
      <Navbar />
      <HeaderContainer />
      <MainContainer />
    </div>
  );
};

export default App;
