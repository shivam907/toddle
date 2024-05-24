import { React, useState } from "react";
import classes from "./style.module.css";
import { FaCaretUp } from "react-icons/fa";
import { FaCaretDown } from "react-icons/fa6";
import { PiDotsThreeVertical } from "react-icons/pi";
import { IoIosLink } from "react-icons/io";
import { SiAdobeacrobatreader } from "react-icons/si";
import Boxable from "../DragAndDrop/Boxable";
import MenuBar from "../Menu/MenuBar";
import Box from "../DragAndDrop/Box";
import ModBox from "../DragAndDrop/ModBox";
import { useEffect } from "react";
const BoxModule = (props) => {
  const [data, setData] = useState({ name: "lorem", type: "url" });
  useEffect(() => {
    let existingModule = JSON.parse(localStorage.getItem("class"));
    existingModule?.forEach((module) => {
      if (module.name == props.moduleName) {
        console.log(module)
        setData(module);
      }
    });
  }, []);
  const [open, setOpen] = useState(false);
  const [type, setType] = useState();
  const openHandler = (e) => {
    e.stopPropagation();
    console.log("Clickcc");
    setOpen(true);
    console.log(open);
  };
  const closeMenu = () => {
    setOpen(false);
  };
  return (
    <>
      <div className={classes.modCont}>
        <div className={classes.moduleBox}>
          <div className={classes.moduleLeft}>
            <div className={classes.iconContainer}>
              <FaCaretDown className={classes.iconn} />
            </div>
            <div className={classes.text}>
              <h1>{data.name}</h1>
              <p>Add items to this module</p>
            </div>
          </div>
          <div onClick={openHandler} className={classes.moduleRight}>
            <PiDotsThreeVertical className={classes.icon} />
          </div>
          {open && (
            <MenuBar
              render={props.render}
              moduleName={data.name}
              url={data.url}
              close={closeMenu}
              down={data.file}
              type={data.type}
            />
          )}
        </div>
        <Box
          items={data.child}
          render={props.render}
          name={data.name}
          targetKey="box"
        >
          <div className={classes.moduleChildren}>
            <h1>Hello</h1>
          </div>
        </Box>
      </div>
    </>
  );
};

export default BoxModule;
