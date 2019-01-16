// Libraries
import React from "react";
import NumberFormat from "react-number-format";
// Custom


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

export default TimeMask;