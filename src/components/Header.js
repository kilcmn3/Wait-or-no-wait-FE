import React from 'react';
import { connect } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import Dialog from '@material-ui/core/Dialog';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { dialogControl, AddCustomer } from '../exportFiles';

const useStyles = makeStyles((theme) => ({
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
  const [anchorEl, setAnchorEl] = React.useState(null);
  const history = useHistory();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className={classes.grow}>
      <Toolbar>
        <Typography className={classes.title} variant='h6' noWrap>
          Wait or no Wait
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

const mapDispatchToProps = (dispatch) => {
  return {
    dialogControl: (open) => dispatch(dialogControl(open)),
  };
};

export default connect(null, mapDispatchToProps)(Header);
