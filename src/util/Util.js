export function timeInputToSeconds(timeInput) {
  if (timeInput.length !== 4) {
    return null;
  } else {
    return parseInt(timeInput.slice(0,2)) * 60 * 60 + parseInt(timeInput.slice(2,4)) * 60;
  }
}

export function secondsToHoursMinutesString(seconds) {
  return Math.floor(seconds/3600) + " Hours " + Math.floor((seconds % 3600) / 60) + " Minutes";
}