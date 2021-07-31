import React, { Fragment } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import {
  CustomersContainer,
  Header,
  Login,
  Logout,
  MainContainer,
  Navbar,
  Profile,
  SignUp,
} from './exportFiles';

const drawerWidth = 200;

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBar: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const App = (props) => {
  const classes = useStyles();
  // const path = '/' + window.location.pathname.split('/')[1];

  let userLogIn = window.localStorage.getItem('owner');

  const hideBar = () => {
    return (
      <Fragment>
        <CssBaseline />
        <AppBar position='fixed' className={classes.appBar}>
          <Header />
        </AppBar>
        <Drawer
          className={classes.drawer}
          variant='permanent'
          classes={{
            paper: classes.drawerPaper,
          }}
          anchor='left'>
          <div className={classes.toolbar} />
          <Navbar />
        </Drawer>{' '}
      </Fragment>
    );
  };

  return (
    <div className={classes.root}>
      {userLogIn ? hideBar() : false}
      <main className={classes.content}>
        <div className={classes.toolbar} />
        <Switch>
          <Route path='/login' component={() => (userLogIn ? <Redirect to='/' /> : <Login />)} />
          <Route path='/signup' component={SignUp} />
          <Route path='/reservations' component={() => (userLogIn ? <MainContainer /> : <Login />)} />
          <Route
            path='/customers'
            render={() => (userLogIn ? <CustomersContainer /> : <Redirect to='/login' />)}
          />
          <Route path='/profile' render={() => (userLogIn ? <Profile /> : <Redirect to='/login' />)} />
          <Route path='/logout' render={() => (userLogIn ? <Logout /> : <Redirect to='/login' />)} />
          <Route path='/' render={() => (userLogIn ? <MainContainer /> : <Redirect to='/login' />)} />
        </Switch>
      </main>
    </div>
  );
};

export default App;
