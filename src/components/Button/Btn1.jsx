import React from "react";
import classes from "./styles.module.css";
const Btn1 = (props) => {
  return (
    <button onClick={props.click} className={classes.btn1}>
      {props.children}
    </button>
  );
};

export default Btn1;
