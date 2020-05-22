import React, { Fragment } from 'react';

import TableCell from '@material-ui/core/TableCell';
import TableRow from '@material-ui/core/TableRow';

const CustomerListRow = (props) => {
  return (
    <Fragment>
      <TableRow>
        <TableCell>party</TableCell>
        <TableCell align='right'>phone</TableCell>
        <TableCell align='right'>visit</TableCell>
        <TableCell align='right'>last visit</TableCell>
      </TableRow>
    </Fragment>
  );
};

export default CustomerListRow;
