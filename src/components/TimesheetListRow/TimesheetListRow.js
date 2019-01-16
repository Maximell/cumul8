// Libraries
import React from "react";
import { TableCell, TableRow } from "@material-ui/core";
// Custom
import { secondsToHoursMinutesString } from "../../util/Util";
import WorkTypes from "../../util/WorkTypes";


const TimesheetListRow = (props) => {
  const { email, time, message, type, createdAt } = props.timesheet;  
  return (
    <TableRow>
      <TableCell align="left">{email}</TableCell>
      <TableCell align="left">{secondsToHoursMinutesString(time)}</TableCell>
      <TableCell align="left">{message}</TableCell>
      <TableCell align="left">{WorkTypes[type]}</TableCell>
      <TableCell align="left">{createdAt.toLocaleString()}</TableCell>
    </TableRow>  
  )  
}

export default TimesheetListRow;