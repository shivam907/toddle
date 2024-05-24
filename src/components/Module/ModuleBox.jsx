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
const ModuleBox = (props) => {
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
      {props.data.type == "module" ? (
        <div className={classes.modCont}>
          <div className={classes.moduleBox}>
            <div className={`${classes.moduleLeft} dragHandleSelector`}>
              {props.data.type == "module" ? (
                <div className={classes.iconContainer}>
                  <FaCaretDown className={classes.iconn} />
                </div>
              ) : props.data.type == "url" ? (
                <div className={classes.linkContainer}>
                  <IoIosLink className={classes.linkIcon} />
                </div>
              ) : (
                <div className={classes.pdfContainer}>
                  <SiAdobeacrobatreader className={classes.pdfIcon} />
                </div>
              )}
              <div className={classes.text}>
                <h1>{props.data.name}</h1>
                <p>
                  {props.data.child.length == 0
                    ? "Add items to this module"
                    : props.data.child.length + " items"}
                </p>
              </div>
            </div>
            <div onClick={openHandler} className={classes.moduleRight}>
              <PiDotsThreeVertical className={classes.icon} />
            </div>
            {open && (
              <MenuBar
                render={props.render}
                moduleName={props.data.name}
                url={props.data.url}
                close={closeMenu}
                down={props.data.file}
                type={props.data.type}
              />
            )}
          </div>
          <Box
            items={props.data.child}
            render={props.render}
            name={props.data.name}
            targetKey="box"
            key={Math.random()}
          >
            <div className={classes.moduleChildren}>
              <h1>Hello</h1>
              <Boxable label={props.data.name} targetKey="box">
                <div className="moduleBox">
                  <div className={classes.moduleLeft}>
                    {props.data.type == "module" ? (
                      <div className={classes.iconContainer}>
                        <FaCaretDown className={classes.iconn} />
                      </div>
                    ) : props.data.type == "url" ? (
                      <div className={classes.linkContainer}>
                        <IoIosLink className={classes.linkIcon} />
                      </div>
                    ) : (
                      <div className={classes.pdfContainer}>
                        <SiAdobeacrobatreader className={classes.pdfIcon} />
                      </div>
                    )}
                    <div className={classes.text}>
                      <h1>{props.data.name}</h1>
                      <p>
                        {props.data.type == "module"
                          ? "Add items to this module"
                          : props.data.type == "url"
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
                      moduleName={props.data.name}
                      url={props.data.url}
                      close={closeMenu}
                      down={props.data.file}
                      type={props.data.type}
                    />
                  )}
                </div>
              </Boxable>
            </div>
          </Box>
        </div>
      ) : (
        <Boxable label={props.data.name} targetKey="box">
          <div className="moduleBox">
            <div className={classes.moduleLeft}>
              {props.data.type == "module" ? (
                <div className={classes.iconContainer}>
                  <FaCaretDown className={classes.iconn} />
                </div>
              ) : props.data.type == "url" ? (
                <div className={classes.linkContainer}>
                  <IoIosLink className={classes.linkIcon} />
                </div>
              ) : (
                <div className={classes.pdfContainer}>
                  <SiAdobeacrobatreader className={classes.pdfIcon} />
                </div>
              )}
              <div className={classes.text}>
                <h1>{props.data.name}</h1>
                <p>
                  {props.data.type == "module"
                    ? "Add items to this module"
                    : props.data.type == "url"
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
                moduleName={props.data.name}
                url={props.data.url}
                close={closeMenu}
                down={props.data.file}
                type={props.data.type}
              />
            )}
          </div>
        </Boxable>
      )}
    </>
  );
};

export default ModuleBox;
