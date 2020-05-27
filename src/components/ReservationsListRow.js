import React, { useState, useEffect, Fragment } from 'react';
import { useDispatch } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { patchCustWaitlist } from '../exportFiles';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const moment = require('moment');

const useStyles = makeStyles((theme) => ({
  menuButton: {
    marginRight: theme.spacing(2),
  },
  button: {
    margin: theme.spacing(0),
    size: 'small',
    fontSize: 11,
    maxWidth: 90,
  },
}));

const ReservationsListRow = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [confirm, setConfirm] = useState(false);
  const { party_size, check_inTime } = props.customer.customerWaitlists[0];
  const { id, name, contact, reservation } = props.customer;

  const displayTableRows = () => {
    let timeZone = moment(new Date(check_inTime)).format('MM-DD h:mm a');
    if (reservation) {
      return (
        <Fragment>
          <TableRow>
            <TableCell>
              {name}
              <br></br>
              contact: {contact}
            </TableCell>
            <TableCell align='right'>{party_size}</TableCell>
            <TableCell align='right'>{timeZone}</TableCell>
            <TableCell align='right'>
              <Button
                id={id}
                variant='contained'
                color='primary'
                className={classes.button}
                onClick={() => setConfirm(!confirm)}
                disabled={confirm}
                startIcon={<Icon>send</Icon>}>
                Confirm
              </Button>
            </TableCell>
          </TableRow>
        </Fragment>
      );
    } else {
      return false;
    }
  };

  return <Fragment>{displayTableRows()}</Fragment>;
};

export default ReservationsListRow;
