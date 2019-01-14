// Libraries
import React, { Component } from "react";
import { Grid, Paper, TextField, Typography } from "@material-ui/core";
import { withStyles } from "@material-ui/core/styles";
// Custom


const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    textAlign: "center",
    color: theme.palette.text.secondary
  }
})

class Add extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      time: null,
      timeHours: "0",
      timeMinutes: "0",      
      message: ""
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleTimeChange = time => {
    alert(time);
  };

  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center" style={{ padding: 20, height: "100vh" }}>
        <Grid item md={8} xs={12}>
          <Paper style={{ textAlign: "center", padding: 20 }}>
            <form>
              <TextField
                id="email"
                label="Email"
                value={this.state.email}
                onChange={this.handleChange("email")}
              />
              Time Spent: 
              <TextField
                id="time"
                label="Time Spent"
                value={this.state.time}
                onChange={this.handleChange("time")}
                type="time"
              />
              <TextField
                id="time"
                label="Time Spent"
                value={this.state.time}
                onChange={this.handleChange("time")}
                type="time"
              />
              <TextField
                id="message"
                label="Message (optional)"
                value={this.state.message}
                onChange={this.handleChange("message")}
                multiline={true}
              />
            </form>
          </Paper>            
        </Grid>          
      </Grid>
    );
  }
}

export default withStyles(styles)(Add);