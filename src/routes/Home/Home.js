// Libraries
import React, { Component } from "react";
import { Fab, Grid, Paper } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
import AddIcon from '@material-ui/icons/Add';
// Custom


const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
})

class Home extends Component { 
  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center" style={{padding: 20, height: "100vh"}}>
        <Grid item xs={12}>
          <Paper style={{ textAlign: "center", padding: 20 }}>
            xs=12
            <Fab 
              style={{ position: "absolute", right: 0, bottom: 0 }}
              onClick={() => this.props.history.push("/add/")}
            >
              <AddIcon />
            </Fab>   
          </Paper>
        </Grid>
          
      </Grid>     
    );
  }
}

export default withStyles(styles)(Home);