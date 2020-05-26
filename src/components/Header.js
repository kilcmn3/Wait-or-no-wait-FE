import React from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Badge from '@material-ui/core/Badge';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { AddCustomer } from '../exportFiles';

const moment = require('moment');

const useStyles = makeStyles((theme) => ({
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(3),
  },
  grow: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));
const Header = (props) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const headerTitle = window.localStorage.getItem('title');
  return (
    <div className={classes.grow}>
      <Toolbar>
        <Typography className={classes.title} variant='h6' noWrap>
          <IconButton aria-label='show 4 new mails' color='inherit'>
            {' '}
            <Badge badgeContent={props.customers.length} color='secondary'>
              {headerTitle}
            </Badge>
          </IconButton>
        </Typography>
        <div className={classes.grow} />
        <div className={classes.sectionDesktop}>
          <IconButton
            edge='start'
            className={classes.menuButton}
            color='inherit'
            aria-label='open drawer'
            onClick={handleClickOpen}>
            <AddCircleOutlineIcon
              className='fa fa-plus-circle'
              style={{ fontSize: 35 }}
            />
          </IconButton>
          <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby='form-dialog-title'>
            <AddCustomer handleClose={handleClose} />
          </Dialog>
        </div>
        <div className={classes.sectionMobile}></div>
      </Toolbar>
    </div>
  );
};

const mapStateToProps = (state) => {
  let filterCustomer = [];
  if (state.customers) {
    filterCustomer = state.customers.filter((customer) => {
      const { is_waiting, check_inTime } = customer.customerWaitlists[0];
      const currentTime = moment(new Date()).format();
      const compareTime = moment(new Date(check_inTime)).format();
      const todayOnly = moment(currentTime).isSame(compareTime, 'day');

      return !is_waiting && todayOnly;
    });
  }
  return {
    customers: filterCustomer,
  };
};

export default connect(mapStateToProps)(Header);
