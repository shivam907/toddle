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
import { useEffect } from "react";
const ResourceBox = (props) => {
  const [data, setData] = useState({ name: "lorem", type: "url" });
  useEffect(() => {
    let existingModule = JSON.parse(localStorage.getItem("resources"));
    existingModule?.forEach((module) => {
      if (module.name == props.moduleName) {
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
      <Boxable label={data.name} targetKey="box">
        <div className="moduleBox">
          <div className={classes.moduleLeft}>
            {data.type == "module" ? (
              <div className={classes.iconContainer}>
                <FaCaretDown className={classes.iconn} />
              </div>
            ) : data.type == "url" ? (
              <div className={classes.linkContainer}>
                <IoIosLink className={classes.linkIcon} />
              </div>
            ) : (
              <div className={classes.pdfContainer}>
                <SiAdobeacrobatreader className={classes.pdfIcon} />
              </div>
            )}
            <div className={classes.text}>
              <h1 className={classes.resourceHead}>{data.name}</h1>
              <p>
                {data.type == "module"
                  ? "Add items to this module"
                  : data.type == "url"
                  ? "Link"
                  : "PDF"}
              </p>
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
      </Boxable>
    </>
  );
};

export default ResourceBox;
