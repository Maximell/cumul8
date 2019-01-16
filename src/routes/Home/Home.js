// Libraries
import React, { Component } from "react";
import { connect } from "react-redux";
import { Grid } from "@material-ui/core";
// Custom
import TimesheetAdd from "../../components/TimesheetAdd/TimesheetAdd";
import TimesheetList from "../../components/TimesheetList/TimesheetList";
import Colours from "../../util/Colours";

class Home extends Component { 
  render() {
    return (
      <Grid container direction="row" justify="flex-start" alignItems="flex-start" spacing={16} style={{padding: 20, minHeight: "100vh", backgroundColor: Colours.background}}>
        <TimesheetAdd timesheetsError={this.props.timesheetsError} timesheetsLoading={this.props.timesheetsLoading}/>
        <TimesheetList timesheets={this.props.timesheets}/>          
      </Grid>     
    );
  }
}

function mapStoreToProps(store) {
  return {
    timesheets: store.timesheets.data,
    timesheetsLoading: store.timesheets.loading,
    timesheetsError: store.timesheets.error
  }
}

export default connect(mapStoreToProps)(Home);