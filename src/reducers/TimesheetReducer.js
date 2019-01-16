export default function reducer(state = {
  data: [],
  loading: false,
  error: null
}, action) {
  switch (action.type) {
    case "ADD_TIMESHEET":
      return {
        ...state,
        loading: true,
        error: null
      }
    case "ADD_TIMESHEET_ERROR":
      return {
        ...state,
        loading: false,
        error: action.payload
      }
    case "ADD_TIMESHEET_SUCCESS":
      return {
        ...state,
        loading: false,
        data: [...state.data, action.payload],
        error: null
      }
    default:
      return {
        ...state
      };
  }
}