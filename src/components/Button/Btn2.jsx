import React from "react";
import classes from "./styles.module.css";
const Btn2 = (props) => {
  return <button onClick={()=>props.click()} className={classes.btn2}>Cancel</button>;
};

export default Btn2;
