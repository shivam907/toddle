import React from "react";
import classes from "./style.module.css";
import { forwardRef } from "react";
const Input = forwardRef((props, ref) => {
  return <input defaultValue={props.value} required ref={ref} className={classes.input} type="text" />;
});

export default Input;
