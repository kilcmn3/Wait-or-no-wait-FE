import React, { Fragment } from 'react';
import Button from '@material-ui/core/Button';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';
import { DateTimePicker } from '@material-ui/pickers';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import MaskedInput from 'react-text-mask';

const moment = require('moment');

const TextMaskCustom = (props) => {
  const { inputRef, ...other } = props;

  return (
    <MaskedInput
      {...other}
      ref={(ref) => {
        inputRef(ref ? ref.inputElement : null);
      }}
      mask={[
        '(',
        /[1-9]/,
        /\d/,
        /\d/,
        ')',
        ' ',
        /\d/,
        /\d/,
        /\d/,
        '-',
        /\d/,
        /\d/,
        /\d/,
        /\d/,
      ]}
      placeholderChar={'\u2000'}
      showMask
    />
  );
};

const useStyles = makeStyles((theme) => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}));

export const AddCustForm = (props) => {
  const classes = useStyles();
  const {
    name,
    contact,
    party_size,
    checkIn,
    estimate_waitTime,
  } = props.customer;
  const path = window.location.pathname.split('/')[1];

  let open = false;

  const reservationPath = () => {
    if (path === 'reservations') {
      return (
        <Fragment>
          <MuiPickersUtilsProvider utils={MomentUtils}>
            <DateTimePicker
              id='datetime-local'
              label='Date & Time'
              value={checkIn}
              name='checkIn'
              onChange={props.handleTime}
              onOpen={() => (open = true)}
              onClose={() => (open = false)}
              minDate={checkIn}
              maxDate={moment(new Date()).add(7, 'd').format()}
            />
          </MuiPickersUtilsProvider>
        </Fragment>
      );
    } else {
      return (
        <Fragment>
          <TextField
            autoFocus
            margin='dense'
            id='estimate_waitTime'
            label='Quoted Time'
            type='number'
            InputProps={{ value: estimate_waitTime }}
            required
          />
          <ButtonGroup>
            <Button
              aria-label='reduce'
              name='time-reduce'
              onClick={props.handleEstimateTime}>
              <RemoveIcon fontSize='small' />
            </Button>
            <Button
              aria-label='increase'
              name='time-increase'
              onClick={props.handleEstimateTime}>
              <AddIcon fontSize='small' />
            </Button>
          </ButtonGroup>
        </Fragment>
      );
    }
  };

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
            name='contact'
            size='small'
            InputProps={{
              inputComponent: TextMaskCustom,
              value: contact,
              onChange: props.handleChanges,
            }}
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
          {reservationPath()}
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          color='primary'
          type='submit'
          form='my-form-id'
          onClick={props.handleClose}>
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
