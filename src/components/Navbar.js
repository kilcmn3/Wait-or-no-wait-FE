import React, { Fragment } from 'react';
import { Link } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AssignmentIcon from '@material-ui/icons/Assignment';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import DateRangeIcon from '@material-ui/icons/DateRange';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Typography from '@material-ui/core/Typography';
import SettingsIcon from '@material-ui/icons/Settings';
import SupervisorAccountIcon from '@material-ui/icons/SupervisorAccount';

const moment = require('moment');

const useStyles = makeStyles((theme) => ({
  list: {
    padding: theme.spacing(4),
  },
}));

const Navbar = (props) => {
  const classes = useStyles();

  // ['Home', 'Reservations', 'Customers', 'Profile', 'Logout'];
  return (
    <Fragment>
      <Typography component='div'>
        <Box textAlign='center' fontWeight='fontWeightMedium' m={1}>
          <Box>{moment(new Date()).format('MMMM Do , h:mm a')}</Box>
        </Box>
      </Typography>
      <Divider />
      <List>
        <ListItem button className={classes.list} component={Link} to='/'>
          <ListItemIcon>
            <AssignmentIcon color='primary' style={{ fontSize: 35 }} />
          </ListItemIcon>
          <ListItemText primary='Home' />
        </ListItem>
        <ListItem
          button
          className={classes.list}
          component={Link}
          to='/reservations'>
          <ListItemIcon>
            <DateRangeIcon color='primary' style={{ fontSize: 35 }} />
          </ListItemIcon>
          <ListItemText primary='Reservations' />
        </ListItem>
        <ListItem
          button
          className={classes.list}
          component={Link}
          to='/customers'>
          <ListItemIcon>
            <SupervisorAccountIcon color='primary' style={{ fontSize: 35 }} />
          </ListItemIcon>
          <ListItemText primary='Customers' />
        </ListItem>
        <ListItem
          button
          className={classes.list}
          component={Link}
          to='/profile'>
          <ListItemIcon>
            <SettingsIcon color='primary' style={{ fontSize: 35 }} />
          </ListItemIcon>
          <ListItemText primary='Profile' />
        </ListItem>
        <ListItem button className={classes.list} component={Link} to='/logout'>
          <ListItemIcon>
            <ExitToAppIcon color='primary' style={{ fontSize: 35 }} />
          </ListItemIcon>
          <ListItemText primary='Logout' />
        </ListItem>
      </List>
    </Fragment>
  );
};

export default Navbar;
