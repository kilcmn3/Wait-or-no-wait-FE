import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

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
  const { name, contact, party_size, reservation, time } = props.customer;

  return (
    <Fragment>
      <DialogTitle id='form-dialog-title'>Add to Waitlist</DialogTitle>
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
            value={name}
            onChange={props.handleChanges}
          />
          <TextField
            autoFocus
            margin='dense'
            id='contact'
            label='Phone'
            type='text'
            onChange={props.handleChanges}
            name='contact'
            value={contact}
          />
          <TextField
            autoFocus
            margin='dense'
            id='party_size'
            label='Party Size'
            type='number'
            onChange={props.handleChanges}
            name='party_size'
            value={party_size}
          />
          {reservation ? (
            <Fragment>
              <label>Time</label>
              <input
                type='datetime-local'
                onChange={props.handleChanges}
                value={time}
                name='time'
                min={time}
                max={moment().add(1, 'year').format()}
                required
              />
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
