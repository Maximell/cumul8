// Libraries
import React, { Component } from "react";
import NumberFormat from "react-number-format";
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

const TimeMask = (props) => {
  const { inputRef, onChange, ...other } = props;
  return (
    <NumberFormat 
      {...other}
      getInputRef={inputRef}
      onValueChange={values => {
        onChange({
          target: {
            value: values.value
          }
        })
      }}
      label="Time Spent"
      placeholder="__ hours __ minutes"
      format="## hours ## minutes"
      mask="_"
    />
  )
}

class Add extends Component {

  constructor(props) {
    super(props);

    this.state = {
      email: "",
      time: null,          
      message: ""
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  render() {
    return (
      <Grid container direction="row" justify="center" alignItems="center" style={{ padding: 20, height: "100vh" }}>
        <Grid item md={8} xs={12}>
          <Paper style={{ textAlign: "center", padding: 20 }}>
            <form>
              <Grid container direction="row" justify="center" alignItems="center">
                <Grid item>
                  <TextField
                    id="email"
                    placeholder="Email"
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                  />
                </Grid>
                <Grid item>
                  <TextField
                    value={this.state.time}
                    onChange={this.handleChange("time")}
                    InputProps={{
                      inputComponent: TimeMask
                    }}
                  />
                </Grid>                             
                <Grid item md={8} xs={12}>
                  <TextField
                    id="message"
                    label="Message (optional)"
                    value={this.state.message}
                    onChange={this.handleChange("message")}
                    multiline={true}
                    fullWidth={true}
                    style={{ minHeight: 56 }}
                  />
                </Grid>
              </Grid>
              
              
              
              
              
            </form>
          </Paper>            
        </Grid>          
      </Grid>
    );
  }
}

export default withStyles(styles)(Add);