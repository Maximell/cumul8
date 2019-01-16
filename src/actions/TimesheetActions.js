// Libraries
// Custom
import Store from "../store/Store";


export function addTimesheet(timesheet) {
  return new Promise((resolve, reject) => {
    Store.dispatch({
      type: "ADD_TIMESHEET"
    });
    setTimeout(() => {
      const randomResult = Math.random();
      if (randomResult < 0.75) {
        // 75% chance the operation is successful
        Store.dispatch({
          type: "ADD_TIMESHEET_SUCCESS",
          payload: timesheet
        });
        resolve();
      } else {
        // 25% chance something goes wrong
        Store.dispatch({
          type: "ADD_TIMESHEET_ERROR",
          payload: "Error: Network timed out."
        });
        reject();
      }      
    }, 1000);    
  })  
}