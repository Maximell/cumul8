// Library
import { combineReducers } from "redux";
// Custom
import TimesheetReducer from "./TimesheetReducer";


const Reducer = combineReducers({
  timesheets: TimesheetReducer
});

export default Reducer;