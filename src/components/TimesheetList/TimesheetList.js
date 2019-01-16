// Libraries
import React, { Component } from "react";
import { Grid, Paper, Table, TableBody, TableCell, TableHead, Typography, Zoom } from "@material-ui/core";
import * as Icons from "@material-ui/icons";
// Custom
import TimesheetListRow from "../TimesheetListRow/TimesheetListRow";


class TimesheetList extends Component {

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {

    const { timesheets } = this.props;

    return (
      <Grid item md={8} xs={12}>
        <Zoom in={true}>
          <Paper style={{ textAlign: "center", padding: 20, overflowX: "auto" }}>
            <Table>
              <TableHead>
                <TableCell>Email</TableCell>
                <TableCell>Time</TableCell>
                <TableCell>Message</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Created</TableCell>
              </TableHead>
              <TableBody>
                {timesheets.map((timesheet, i) => <TimesheetListRow timesheet={timesheet} key={i} />)}
              </TableBody>
            </Table>
            {timesheets.length === 0 && (
              <Grid container direction="row" justify="center" alignItems="center" style={{ paddingTop: 20 }}>
                <Grid item>
                  <Icons.PriorityHighOutlined style={{ fontSize: 30 }} />
                  <Typography variant="body1">                    
                    No timesheets yet
                  </Typography>
                </Grid>
              </Grid>
            )}
          </Paper>
        </Zoom>          
      </Grid>
    );
  }
}

export default TimesheetList;