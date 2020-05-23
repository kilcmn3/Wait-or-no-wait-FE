import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MomentUtils from '@date-io/moment';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { CustomerListRow, searchWaitLists } from '../exportFiles';

import Paper from '@material-ui/core/Paper';

const moment = require('moment');

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});
const CustomersContainer = (props) => {
  const classes = useStyles();
  const [selectedDate, setSelectedDate] = React.useState(
    moment(new Date()).format()
  );
  const handleDateChange = (date) => {
    props.searchWaitLists(date.format());
    setSelectedDate(date.format());
  };

  return (
    <Fragment>
      <MuiPickersUtilsProvider utils={MomentUtils}>
        <Grid container justify='space-around'>
          <KeyboardDatePicker
            margin='normal'
            id='date-picker-dialog'
            label='Date picker dialog'
            rifmFormatter={(val) =>
              val.replace(/[^\.\ \,\[a-zA-Z0-9_]*$]+/gi, '')
            }
            refuse={/[^\.\ \,\[a-zA-Z0-9_]*$]+/gi}
            format={'MMM, DD YYYY'}
            autoOk
            value={selectedDate}
            onChange={handleDateChange}
            maxDate={moment(new Date()).format()}
            KeyboardButtonProps={{
              'aria-label': 'change date',
            }}
          />
        </Grid>
      </MuiPickersUtilsProvider>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label='simple table'>
          <TableHead>
            <TableRow>
              <TableCell>NAME</TableCell>
              {['PHONE', 'VISIT', 'LASTV VISIT'].map((text, index) => (
                <TableCell key={index} align='right'>
                  {text}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            <CustomerListRow customer={props.customers} />
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};
const mapStateToProps = (state) => {
  return {
    customers: state.customers,
    waitList: state.waitList,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    searchWaitLists: (search) => dispatch(searchWaitLists(search)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(CustomersContainer);
