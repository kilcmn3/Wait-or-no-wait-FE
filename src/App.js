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
  MainContainer,
  Navbar,
  SignUp,
  WaitListContainer,
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

  const checkIfLogin = () => {
    let owner = window.localStorage.getItem('owner');
    if (owner) {
      return (
        <div className={classes.root}>
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
          </Drawer>
          <main className={classes.content}>
            <div className={classes.toolbar} />
            <Switch>
              <Route path='/reservations' component={WaitListContainer} />
              <Route path='/customers' component={CustomersContainer} />
              <Route path='/' component={MainContainer} />
            </Switch>
          </main>
        </div>
      );
    } else {
      const path = window.location.pathname.split('/')[1];

      if (path === 'signup') {
        return <Redirect to='/signup' push={true}></Redirect>;
      } else {
        return <Redirect to='/login' push={true}></Redirect>;
      }
    }
  };
  return (
    <Fragment>
      {checkIfLogin()}
      <Switch>
        <Route exact path='/signup' component={SignUp} />
        <Route exact path='/login' component={Login} />
      </Switch>
    </Fragment>
  );
};

export default App;
