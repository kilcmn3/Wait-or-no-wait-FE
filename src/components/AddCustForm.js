import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import { DateTimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';

const moment = require('moment');

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const AddCustForm = (props) => {
  const classes = useStyles();
  const { name, contact, party_size, time } = props.customer;
  const path = window.location.pathname.split('/')[1];

  return (
    <Fragment>
      <DialogTitle id='form-dialog-title'>
        {path === 'reservations' ? 'Add Reservations' : 'Add to Waitlist'}
      </DialogTitle>
      <DialogContent>
        <form
          className={classes.root}
          id='my-form-id'
          noValidate
          autoComplete='off'
          onSubmit={props.handleSubmit}>
          <TextField
            autoFocus
            margin='dense'
            id='name'
            label='Name'
            name='name'
            type='text'
            defaultValue={name}
            onChange={props.handleChanges}
            required
          />
          <TextField
            autoFocus
            margin='dense'
            id='contact'
            label='Phone'
            type='text'
            onChange={props.handleChanges}
            name='contact'
            defaultValue={contact}
            required
          />
          <TextField
            autoFocus
            margin='dense'
            id='party_size'
            label='Party Size'
            type='number'
            onChange={props.handleChanges}
            name='party_size'
            defaultValue={party_size}
            required
          />
          {path === 'reservations' ? (
            <Fragment>
              <MuiPickersUtilsProvider utils={MomentUtils}>
                <DateTimePicker
                  id='datetime-local'
                  label='Date & Time'
                  value={time}
                  name='time'
                  onChange={props.handleChanges}
                  minDate={time}
                  maxDate={moment(new Date()).add(7, 'd').format()}
                />
              </MuiPickersUtilsProvider>
            </Fragment>
          ) : (
            false
          )}
        </form>
      </DialogContent>
      <DialogActions>
        <Button color='primary' type='submit' form='my-form-id'>
          Confirm
        </Button>
        <Button onClick={props.handleClose} color='primary'>
          Cancel
        </Button>
      </DialogActions>
    </Fragment>
  );
};

export default AddCustForm;
