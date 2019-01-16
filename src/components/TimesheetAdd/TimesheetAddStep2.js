// Libraries
import { CircularProgress, Grid } from "@material-ui/core";
import React from "react";
// Custom

const TimesheetAddStep3 = (props) => (
  <Grid container direction="row" justify="center" alignItems="center" style={{ minHeight: props.minHeight }}>
    <Grid item xs={12}>
      <CircularProgress />
    </Grid>
  </Grid>  
)

export default TimesheetAddStep3;          