// Library
import { combineReducers } from "redux";
// Custom
import TimesheetReducer from "./TimesheetReducer";


const Reducer = combineReducers({
  user: TimesheetReducer
});

export default Reducer;