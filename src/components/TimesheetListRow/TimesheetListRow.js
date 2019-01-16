// Libraries
import React from "react";
import { TableCell, TableRow } from "@material-ui/core";
// Custom
import WorkTypes from "../../util/WorkTypes";


const TimesheetListRow = (props) => {
  const { email, time, message, type, createdAt } = props.timesheet;  
  return (
    <TableRow>
      <TableCell align="right">{email}</TableCell>
      <TableCell align="right">{time}</TableCell>
      <TableCell align="right">{message}</TableCell>
      <TableCell align="right">{WorkTypes[type]}</TableCell>
      <TableCell align="right">{createdAt.toLocaleString()}</TableCell>
    </TableRow>  
  )  
}

export default TimesheetListRow;