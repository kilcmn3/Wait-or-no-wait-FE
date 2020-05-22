import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import {
  WaitListRow,
  fetchWaitLists,
  ReservationListRow,
} from '../exportFiles';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
  },
});

const WaitListContainer = (props) => {
  const classes = useStyles();

  useEffect(() => {
    props.fetchWaitLists();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  //TODO Maybe don't need  msp?
  const currentUrl = () => {
    let path = window.location.pathname.split('/')[1];
    if (path === 'reservations') {
      return <ReservationListRow />;
    } else if (props.customers.length > 0) {
      return <WaitListRow />;
    } else {
      return false;
    }
  };

  const displayWaitList = () => {
    return ['SIZE', 'QUOTED', 'WAIT', 'NOTIFY', 'ACTIONS'].map(
      (text, index) => (
        <TableCell key={index} align='right'>
          {text}
        </TableCell>
      )
    );
  };

  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>PARTY</TableCell>
            {displayWaitList()}
          </TableRow>
        </TableHead>
        <TableBody>{currentUrl()}</TableBody>
      </Table>
    </TableContainer>
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
    fetchWaitLists: () => dispatch(fetchWaitLists()),
  };
};

//TODO Maybe don't need  msp?
export default connect(mapStateToProps, mapDispatchToProps)(WaitListContainer);
