import { React, useState } from "react";
import classes from "./styles.module.css";
import { BsLayoutThreeColumns } from "react-icons/bs";
import { TfiUpload } from "react-icons/tfi";
import { CiEdit } from "react-icons/ci";
import { RiDeleteBinLine } from "react-icons/ri";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { LiaDownloadSolid } from "react-icons/lia";

import { IoIosLink } from "react-icons/io";
import Modal from "../Modal/Modal";
import { useRef } from "react";
import { useEffect } from "react";
const MenuBar = (props) => {
  const [isModalOpen, setModal] = useState(false);
  const [hide, setHide] = useState(false);
  const [type, setType] = useState();
  const menu = useRef(null);
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const selectedFile = event.target.files[0];
    console.log(selectedFile.name);
    if (selectedFile) {
      setFile(selectedFile);
      let existingModule = JSON.parse(localStorage.getItem("class"));
      if (!existingModule) {
        existingModule = [];
      }
let resources = JSON.parse(localStorage.getItem("resources"));
    if (!resources) {
      resources = [];
    }
      const url = URL.createObjectURL(selectedFile);
      
      existingModule.push({
        name: selectedFile.name.slice(0, selectedFile.name.length - 4),
        type: "pdf",
        file: url,
      });
      localStorage.setItem("class", JSON.stringify(existingModule));
      resources.push({
        name: selectedFile.name.slice(0, selectedFile.name.length - 4),
        type: "pdf",
        file: url,
      });
      localStorage.setItem("resources", JSON.stringify(resources));
      props.render();
      props.close()
    }
  };
  const closeModal = () => {
    setModal(false);
    props.render();
    props.close();
  };
  const deleteHandler = () => {
    let existingModule = JSON.parse(localStorage.getItem("class"));
    let newModules = [];
    existingModule.forEach((module) => {
      if (module.name != props.moduleName) {
        newModules.push(module);
        // exist = true;
        // return;
      }
    });

    // toast.success("Module Successfully Deleted");
    localStorage.setItem("class", JSON.stringify(newModules));

    props.render();
    props.close();
  };
  const deleteResource = () => {
    let existingModule = JSON.parse(localStorage.getItem("class"));
    let newModules = [];
    existingModule.forEach((module) => {
      if (module.name != props.moduleName) {
        let n=module
        if(module.child){
            let c=[]
            for(let i=0;i<module.child.length;i++){
                if(module.child[i]!=props.moduleName){
                    c.push(module.child[i])
                }
            }
            n.child=c
        }
        newModules.push(n)
      }
    });

    // toast.success("Module Successfully Deleted");
    localStorage.setItem("class", JSON.stringify(newModules));

    props.render();
    props.close();
  };
  const download = () => {
    console.log(props.moduleName)
    const link = document.createElement("a");
    link.href = props.down;
    link.download = props.moduleName+".pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(props.down);
    props.close()
  };
  useEffect(() => {
    menu.current?.focus();
  }, []);
  return (
    <>
      {props.type == "add" ? (
        <>
          <div
            ref={menu}
            tabIndex={-1}
            // onBlur={() => {
            //   //   props.close();
            //   setHide(true);
            // }}
            className={`${classes.menuContainer} ${hide ? classes.none : ""}`}
          >
            <div
              onClick={() => {
                setType("create module");
                setModal(true);
                // props.close();
              }}
              className={classes.menu}
            >
              <BsLayoutThreeColumns className={classes.icon} />
              <p>Create module</p>
            </div>
            <div
              onClick={() => {
                setType("add link");
                setModal(true);
                // props.close();
              }}
              className={classes.menu}
            >
              <IoIosLink className={classes.icon1} />
              <p>Add a Link</p>
            </div>
            <div className={classes.menu}>
              <TfiUpload className={classes.icon1} />
              <p>Upload</p>
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
                name=""
                id=""
              />
            </div>
          </div>
          {isModalOpen && (
            <Modal render={props.render} type={type} close={closeModal} />
          )}
        </>
      ) : props.type == "module" ? (
        <>
          <div
            ref={menu}
            tabIndex={-1}
            onBlur={() => {
              //   props.close();
              setHide(true);
            }}
            className={`${classes.menuContainer1} ${hide ? classes.none : ""}`}
          >
            <div
              onClick={() => {
                setType("edit module");
                setModal(true);
                // props.close();
              }}
              className={classes.menu}
            >
              <CiEdit className={classes.icon1} />
              <p>Edit module name</p>
            </div>
            <div onClick={deleteHandler} className={classes.menu}>
              <RiDeleteBinLine
                className={`${classes.icon1} ${classes.delete}`}
              />
              <p className={classes.delete}>Delete</p>
            </div>
          </div>
          {isModalOpen && (
            <Modal
              moduleName={props.moduleName}
              render={props.render}
              type={type}
              close={closeModal}
            />
          )}
        </>
      ) : props.type == "url" ? (
        <>
          <div
            ref={menu}
            tabIndex={-1}
            onBlur={() => {
              //   props.close();
              setHide(true);
            }}
            className={`${classes.menuContainer2} ${hide ? classes.none : ""}`}
          >
            <div
              onClick={() => {
                setType("edit module");
                setModal(true);
                // props.close();
              }}
              className={classes.menu}
            >
              <CiEdit className={classes.icon1} />
              <p>Edit</p>
            </div>
            <div onClick={deleteResource} className={classes.menu}>
              <RiDeleteBinLine
                className={`${classes.icon1} ${classes.delete}`}
              />
              <p className={classes.delete}>Delete</p>
            </div>
          </div>
          {isModalOpen && (
            <Modal
              moduleName={props.moduleName}
              render={props.render}
              type={props.type}
              url={props.url}
              close={closeModal}
            />
          )}
        </>
      ) : (
        <>
          <div
            ref={menu}
            tabIndex={-1}
            onBlur={() => {
              //   props.close();
              setHide(true);
            }}
            className={`${classes.menuContainer2} ${hide ? classes.none : ""}`}
          >
            <div
              onClick={() => {
                setType("edit module");
                setModal(true);
                // props.close();
              }}
              className={classes.menu}
            >
              <CiEdit className={classes.icon1} />
              <p> Rename</p>
            </div>
            <div onClick={download} className={classes.menu}>
              <LiaDownloadSolid className={`${classes.icon1}`} />
              <p>Download</p>
            </div>
            <div className={classes.line}></div>
            <div onClick={deleteResource} className={classes.menu}>
              <RiDeleteBinLine
                className={`${classes.icon1} ${classes.delete}`}
              />
              <p className={classes.delete}>Delete</p>
            </div>
          </div>
          {isModalOpen && (
            <Modal
              moduleName={props.moduleName}
              render={props.render}
              type={props.type}
              url={props.url}
              close={closeModal}
            />
          )}
        </>
      )}
    </>
  );
};

export default MenuBar;
