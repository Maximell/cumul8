// Libraries
import { Button, Grid, Typography } from "@material-ui/core";
import * as Icons from "@material-ui/icons";
import React from "react";
// Custom

const TimesheetAddStep3 = (props) => (
  <Grid container direction="row" justify="center" alignItems="flex-end" style={{ minHeight: props.minHeight }}>
    <Grid item xs={12}>
      <Icons.CheckCircleOutline style={{ fontSize: 30 }} />
      <Typography variant="h6">
        Thanks {props.email}! You just logged {props.time} of work today.
      </Typography>
    </Grid>
    <Button onClick={() => props.onClick()} style={{ marginTop: 20 }}>Start Again</Button>
  </Grid>
)

export default TimesheetAddStep3;