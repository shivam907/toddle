import { React, useState } from "react";
import classes from "./styles.module.css";
import { IoAdd } from "react-icons/io5";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";

import MenuBar from "../Menu/MenuBar";
const Btn = (props) => {
  const [open, setOpen] = useState(false);
  const openHandler = (e) => {
    e.preventDefault()
    console.log("yes")
    setOpen(!open);
  };
  const closeMenu = () => {
    setOpen(false);
  };
  return (
    <div  className={classes.btnContainer}>
      <button onClick={openHandler} className={classes.btn}>
        <IoAdd className={classes.icon} />
        <span>Add</span>
        {open ? (
          <FaCaretUp className={classes.icon1} />
        ) : (
          <FaCaretDown className={classes.icon1} />
        )}
      </button>
      {open && (
        <MenuBar
        onBlur={closeMenu}
          set={setOpen}
          render={props.render}
          type="add"
          close={closeMenu}
        />
      )}
    </div>
  );
};

export default Btn;
