import React from "react";
import classes from "./styles.module.css";
import img from "../../assets/empty.png"
const Empty = () => {
  return <div className={classes.emptyContainer}>
    <img src={img} alt="" />
    <h1>Nothing Added here yet</h1>
    <p>Click on the [+] Add button to add items to this course</p>
  </div>;
};

export default Empty;
