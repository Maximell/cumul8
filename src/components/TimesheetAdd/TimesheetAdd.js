// Libraries
import React, { Component } from "react";
import { Button, FormControlLabel, FormLabel, FormHelperText, Grid, InputAdornment, Paper, Radio, RadioGroup, TextField, Typography, Zoom } from "@material-ui/core";
import * as Icons from "@material-ui/icons";
// Custom
import * as TimesheetActions from "../../actions/TimesheetActions";
import TimesheetAddStep2 from "./TimesheetAddStep2";
import TimesheetAddStep3 from "./TimesheetAddStep3";
import TimeMask from "../TimeMask/TimeMask";
import WorkTypes from "../../util/WorkTypes";
import Colours from "../../util/Colours";
import { secondsToHoursMinutesString, timeInputToSeconds } from "../../util/Util";


const styles = {
  errorMessage: {
    color: Colours.error    
  }
}

class TimesheetAdd extends Component {

  stateInitial = {
    email: "",
    time: null,
    type: "noSelection", // null did not reset the radio buttons on the clear action
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
          time: timeInputToSeconds(time),
          type: type === "noSelection" ? null : type,
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
      // note that it is not RFC 2822 compliant, but I chose it as it accepts _most_ emails, but is much less complex than compliant regex's.
      const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email);
      const timeValid = this.state.time && this.state.time.length === 4;
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

    const minHeight = 320;

    return (
      <Grid item md={4} xs={12}>
        <Paper style={{ textAlign: "center", padding: 20 }}>
          {this.state.step === 1 && (
            <Zoom in={this.state.step === 1}>
              <Grid container direction="column" justify="center" alignItems="flex-start" style={{ minHeight: minHeight }}>
                <Grid container direction="column" justify="center" alignItems="center">
                  <Grid item>
                    <Typography variant="h6">Add a Timesheet</Typography>
                  </Grid>
                </Grid>                
                <Grid item xs={12}>
                  <TextField
                    required
                    error={!this.state.formValid.emailValid}
                    label="Email"
                    id="email"
                    placeholder="you@x.y"
                    value={this.state.email}
                    onChange={this.handleChange("email")}
                    type="email"
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
                <Grid item xs={12}>
                  <TextField
                    required
                    error={!this.state.formValid.timeValid}
                    label="Time Spent"
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
                <FormLabel component="legend">Type of Work</FormLabel>
                <Grid item md={8} xs={12}>
                  <RadioGroup label="Type of Work" name="Type of Work" value={this.state.type} onChange={this.handleChange("type")}>
                    {Object.keys(WorkTypes).map((workType, i) => <FormControlLabel value={workType} control={<Radio />} label={<Typography variant={this.state.type === workType ? "body2" : "body1"}>{WorkTypes[workType]}</Typography>} disabled={this.props.timesheetsLoading} key={i} />)}
                  </RadioGroup>
                </Grid>
                <Grid container>                  
                  <Grid item xs={12} style={{ paddingTop: 10 }}>
                    <TextField     
                      label="Message"             
                      id="message"
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
                        <FormHelperText style={{ ...styles.errorMessage, textAlign: "center" }}>{this.props.timesheetsError}</FormHelperText>
                      </Zoom>
                    </Grid>
                  )}
                </Grid>
              </Grid>                
            </Zoom>    
          )}                                     
          {this.state.step === 2 && (
            <TimesheetAddStep2
              minHeight={minHeight}
            />            
          )}
          {this.state.step === 3 && (
            <TimesheetAddStep3 
              email={this.state.email} 
              minHeight={minHeight}
              time={secondsToHoursMinutesString(timeInputToSeconds(this.state.time))}
              onClick={this.handleStartAgain}
            />            
          )}
        </Paper>
      </Grid>
    );
  }
}

export default TimesheetAdd;