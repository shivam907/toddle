import React from "react";
import classes from "./styles.module.css";
import Btn from "../Button/Btn";
const NavBar = (props) => {
  return (
    <nav className={classes.navbar}>
      <h1>Course Builder</h1>
      <Btn render={props.render} />
    </nav>
  );
};

export default NavBar;
