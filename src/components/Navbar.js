import React from 'react';
import { NavLink } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  return (
    <div>
      <div className={classes.toolbar} />
      <Divider />
      <List>
        {['Home', 'Reservations', 'Customers', 'Profile', 'Logout'].map(
          (text, index) => (
            <NavLink key={index} to={`/${text.toLowerCase()}`}>
              <ListItem button key={text}>
                <ListItemText primary={text} />
              </ListItem>
            </NavLink>
          )
        )}
      </List>
    </div>
  );
};

export default Navbar;
