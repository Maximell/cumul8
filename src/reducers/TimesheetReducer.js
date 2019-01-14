export default function reducer(state = {
  timesheets: []
}, action) {
  switch (action.type) {
    case "ADD_TIMESHEET":
      return {
        ...state,
        timesheets: [...state.timesheets, action.timesheet],
        error: null
      }
    default:
      return {
        ...state
      };
  }
}