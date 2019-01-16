// Libraries
import { Grid, Typography } from "@material-ui/core";
import React from "react";
import { NavLink } from "react-router-dom";
// Custom
import Colours from "../../util/Colours";

const Four04 = () => (
  <Grid container direction="column" justify="center" alignItems="center" style={{ minHeight: "100vh", backgroundColor: Colours.background }}>
    <Grid item xs={12}>
      <Typography variant="h6">Whoops! Looks like you took a wrong turn. Head back to the app <NavLink to="/">here</NavLink>.</Typography>
    </Grid>
  </Grid>
)

export default Four04;