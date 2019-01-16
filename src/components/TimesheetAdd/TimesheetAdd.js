// Libraries
import React, { Component } from "react";
import { Button, CircularProgress, FormControlLabel, FormHelperText, Grid, InputAdornment, Paper, Radio, RadioGroup, TextField, Typography, Zoom } from "@material-ui/core";
import * as Icons from "@material-ui/icons";
// Custom
import * as TimesheetActions from "../../actions/TimesheetActions";
import TimeMask from "../TimeMask/TimeMask";
import WorkTypes from "../../util/WorkTypes";
import Colours from "../../util/Colours";


const styles = {
  errorMessage: {
    color: Colours.error
  }
}

class TimesheetAdd extends Component {

  stateInitial = {
    email: "",
    time: null,
    type: null,
    message: "",
    formValid: {
      emailValid: true,
      timeValid: true,
      typeValid: true,
      messageValid: true,
      createdAtValid: true
    },
    step: 1
  }

  constructor(props) {
    super(props);

    this.state = {
      ...this.stateInitial
    }
  }

  handleChange = name => event => {
    this.setState({
      [name]: event.target.value,
    });
  };

  handleClear = () => {
    this.setState({...this.stateInitial})
  }

  handleStartAgain = () => {
    this.setState({
      ...this.stateInitial
    });
  }

  handleSubmit = () => {
    this.handleValidate()
      .then(formValid => {
        const { email, time, type, message } = this.state;
        TimesheetActions.addTimesheet({
          email,
          time,
          type,
          message,
          createdAt: new Date()
        }).then(() => {
          this.setState({
            step: 3
          });
        }).catch(() => {
          this.setState({
            step: 1
          });
        })
        this.setState({
          formValid,
          step: 2
        });
      })
      .catch(formValid => {
        this.setState({
          formValid
        });
      });
  }

  handleValidate = () => {
    return new Promise((resolve, reject) => {
      // regex taken from https://stackoverflow.com/questions/46155/how-to-validate-an-email-address-in-javascript
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email);
      const timeValid = this.state.time && this.state.time.toString().length === 4;
      const messageValid = true;
      const typeValid = true;
      const createdAtValid = true;

      const formValid = { emailValid, timeValid, messageValid, typeValid, createdAtValid };

      if (Object.keys(formValid).every(key => { return formValid[key] === true;})) {
        return resolve(formValid);
      } else {
        return reject(formValid);
      }      
    });
  }

  render() {
    return (
      <Grid item md={4} xs={12}>
        <Paper style={{ textAlign: "center", padding: 20 }}>
          {this.state.step === 1 && (
            <Zoom in={this.state.step === 1}>
              <form>
                <Grid container direction="row" justify="center" alignItems="center">
                  <Grid item>
                    <TextField
                      id="email"
                      placeholder="Email"
                      value={this.state.email}
                      onChange={this.handleChange("email")}
                      type="email"
                      ref="textFieldEmail"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icons.EmailOutlined />
                          </InputAdornment>
                        )
                      }}
                      disabled={this.props.timesheetsLoading}
                    />
                    <Zoom in={!this.state.formValid.emailValid}>
                      <FormHelperText style={{...styles.errorMessage, paddingBottom: !this.state.formValid.emailValid ? 10 : 0}}>Please enter a valid email address.</FormHelperText>
                    </Zoom>
                  </Grid>
                  <Grid item>
                    <TextField
                      value={this.state.time}
                      onChange={this.handleChange("time")}
                      InputProps={{
                        inputComponent: TimeMask,
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icons.AccessTime />
                          </InputAdornment>
                        )
                      }}
                      disabled={this.props.timesheetsLoading}
                    />
                    <Zoom in={!this.state.formValid.timeValid}>
                      <FormHelperText style={{...styles.errorMessage, paddingBottom: !this.state.formValid.emailValid ? 10 : 0}}>Please enter a valid time.</FormHelperText>
                    </Zoom>
                  </Grid>
                  <Grid item md={8} xs={12}>
                    <RadioGroup name="Type of Work" value={this.state.type} onChange={this.handleChange("type")}>
                      {Object.keys(WorkTypes).map((workType, i) => <FormControlLabel value={workType} control={<Radio />} label={WorkTypes[workType]} disabled={this.props.timesheetsLoading} />)}
                    </RadioGroup>
                  </Grid>
                  <Grid item xs={12} style={{ paddingTop: 10 }}>
                    <TextField
                      id="message"
                      label="Message (optional)"
                      value={this.state.message}
                      onChange={this.handleChange("message")}
                      multiline={true}
                      fullWidth={true}
                      InputProps={{
                        startAdornment: (
                          <InputAdornment position="start">
                            <Icons.EditOutlined />
                          </InputAdornment>
                        )
                      }}
                      disabled={this.props.timesheetsLoading}
                    />
                  </Grid>
                </Grid>
                <Grid container justify="center" alignItems="center" style={{ paddingTop: 10 }}>
                  <Grid item xs={6}>
                    <Button onClick={() => this.handleClear()} disabled={this.props.timesheetsLoading}>Clear</Button>
                  </Grid>
                  <Grid item xs={6}>
                    <Button onClick={() => this.handleSubmit()} disabled={this.props.timesheetsLoading}>Next</Button>
                  </Grid>
                  {this.props.timesheetsError && (
                    <Grid item xs={12}>
                      <Zoom in={this.props.timesheetsError}>
                        <FormHelperText style={{...styles.errorMessage, textAlign: "center"}}>{this.props.timesheetsError}</FormHelperText>
                      </Zoom>
                    </Grid>                                    
                  )}                  
                </Grid>
              </form>
            </Zoom>    
          )}                                     
          {this.state.step === 2 && (
            <CircularProgress />
          )}
          {this.state.step === 3 && (
            <Grid container direction="row" justify="center" alignItems="center">
              <Grid item xs={12}>
                <Icons.CheckCircleOutline style={{ fontSize: 30 }} />
              </Grid>                
              <Grid item xs={12}>
                <Typography variant="body1">                    
                  Thanks {this.state.email}! You just logged {this.state.time} of work today.
                </Typography>
              </Grid>
              <Grid item xs={12} style={{ marginTop: 20 }}>                  
                <Button onClick={() => this.handleStartAgain()}>Start Again</Button>
              </Grid>
            </Grid>
          )}
        </Paper>
      </Grid>
    );
  }
}

export default TimesheetAdd;