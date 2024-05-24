import { React, useRef } from "react";
import classes from "./styles.module.css";
import Input from "../Input/Input";
import Btn1 from "../Button/Btn1";
import Btn2 from "../Button/Btn2";
import { IoCloseOutline } from "react-icons/io5";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ModalBox = (props) => {
  const moduleRef = useRef(null);
  console.log(props);
  const urlRef = useRef(null);
  const createModule = () => {
    console.log(moduleRef.current.value);
    if (moduleRef.current.value.trim().length < 1) {
      toast.error("Module Name Cannot be Empty");
      return;
    }
    let existingModule = JSON.parse(localStorage.getItem("class"));
    let resources = JSON.parse(localStorage.getItem("resources"));
    if (!resources) {
      resources = [];
    }
    if (!existingModule) {
      existingModule = [];
    }
    let exist = false;
    resources.forEach((module) => {
      if (module.name == moduleRef.current.value) {
        toast.error("Module Name Already Exist");
        exist = true;
        return;
      }
    });
    if (exist) return;
    existingModule.push({
      name: moduleRef.current.value,
      type: "module",
      child: [],
    });
    resources.push({
      name: moduleRef.current.value,
      type: "module",
      child: [],
    });
    localStorage.setItem("class", JSON.stringify(existingModule));
    localStorage.setItem("resources", JSON.stringify(resources));
    console.group(existingModule);
    props.close();
  };
  const addLink = () => {
    console.log(moduleRef.current.value);
    if (moduleRef.current.value.trim().length < 1) {
      toast.error("Link Name Cannot be Empty");
      return;
    }
    if (urlRef.current.value.trim().length < 1) {
      toast.error("URL Cannot be Empty");
      return;
    }
    let existingModule = JSON.parse(localStorage.getItem("class"));
    if (!existingModule) {
      existingModule = [];
    }
    let resources = JSON.parse(localStorage.getItem("resources"));
    if (!resources) {
      resources = [];
    }
    let exist = false;
    resources.forEach((module) => {
      if (module.name == moduleRef.current.value) {
        toast.error("Link Already Exist");
        exist = true;
        return;
      }
    });
    if (exist) return;
    existingModule.push({
      name: moduleRef.current.value,
      url: urlRef.current.value,
      type: "url",
    });
    resources.push({
      name: moduleRef.current.value,
      url: urlRef.current.value,
      type: "url",
    });
    localStorage.setItem("class", JSON.stringify(existingModule));
    localStorage.setItem("resources", JSON.stringify(resources));
    console.group(existingModule);
    props.close();
  };
  const editModule = () => {
    console.log(moduleRef.current.value);
    if (moduleRef.current.value.trim().length < 1) {
      toast.error("Module Name Cannot be Empty");
      return;
    }
    let existingModule = JSON.parse(localStorage.getItem("class"));
    if (!existingModule) {
      existingModule = [];
    }
    let exist = false;
    existingModule.forEach((module) => {
      if (module.name == props.moduleName) {
        module.name = moduleRef.current.value;
        // toast.error("Module Name Already Exist");
        // exist = true;
        // return;
      }
    });
    // if (exist) return;
    // existingModule.push({ name: moduleRef.current.value });
    localStorage.setItem("class", JSON.stringify(existingModule));
    console.group(existingModule);
    props.close();
  };
  const editUrl = () => {
    console.log(moduleRef.current.value);
    if (moduleRef.current.value.trim().length < 1) {
      toast.error("Link Name Cannot be Empty");
      return;
    }
    if (urlRef.current.value.trim().length < 1) {
      toast.error("URL Cannot be Empty");
      return;
    }
    let existingModule = JSON.parse(localStorage.getItem("class"));
    if (!existingModule) {
      existingModule = [];
    }
    let exist = false;
    let ne = [];
    existingModule.forEach((module) => {
      let c = module;
      if (module.name == props.moduleName) {
        c.name = moduleRef.current.value;
        c.url = urlRef.current.value;
      }
      if (module.child) {
        for (let i = 0; i < module.child.length; i++) {
          if (module.child[i] == props.moduleName) {
            c.child[i] = moduleRef.current.value;
          }
        }
      }
      ne.push(c);
      // module.child?.forEach(i=>{
      //   if(i==props.moduleName){
      //     i=moduleRef.current.value
      //   }
      // })
    });

    let resources = JSON.parse(localStorage.getItem("resources"));
    resources.forEach((module) => {
      if (module.name == props.moduleName) {
        module.name = moduleRef.current.value;
        module.url = urlRef.current.value;
      }
    });
    // if (exist) return;
    // existingModule.push({ name: moduleRef.current.value });
    localStorage.setItem("class", JSON.stringify(ne));
    localStorage.setItem("resources", JSON.stringify(resources));
    console.group(existingModule);
    props.close();
  };
  const editPdf = () => {
    console.log(moduleRef.current.value);
    if (moduleRef.current.value.trim().length < 1) {
      toast.error("Pdf Name Cannot be Empty");
      return;
    }

    let existingModule = JSON.parse(localStorage.getItem("class"));
    if (!existingModule) {
      existingModule = [];
    }
    let exist = false;
    let ne = [];
    existingModule.forEach((module) => {
      let c = module;
      if (module.name == props.moduleName) {
        c.name = moduleRef.current.value;
      }
      if (module.child) {
        for (let i = 0; i < module.child.length; i++) {
          if (module.child[i] == props.moduleName) {
            c.child[i] = moduleRef.current.value;
          }
        }
      }
      ne.push(c);
      // module.child?.forEach(i=>{
      //   if(i==props.moduleName){
      //     i=moduleRef.current.value
      //   }
      // })
    });

    let resources = JSON.parse(localStorage.getItem("resources"));
    resources.forEach((module) => {
      if (module.name == props.moduleName) {
        module.name = moduleRef.current.value;
      }
    });
    // if (exist) return;
    // existingModule.push({ name: moduleRef.current.value });
    localStorage.setItem("class", JSON.stringify(ne));
    localStorage.setItem("resources", JSON.stringify(resources));
    console.group(existingModule);
    props.close();
  };
  return (
    <>
      {props.type == "create module" ? (
        <div className={classes.box}>
          <div className={classes.header}>
            <h1>Create New Module</h1>
            <div className={classes.close} onClick={props.close}>
              <IoCloseOutline className={classes.icon} />
            </div>
          </div>
          <div className={classes.form}>
            <label htmlFor="">Module Name</label>
            <Input ref={moduleRef} />
          </div>
          <div className={classes.btns}>
            <Btn2 click={props.close} />
            <Btn1 click={createModule}>Create</Btn1>
          </div>
        </div>
      ) : props.type == "edit module" ? (
        <div className={classes.box}>
          <div className={classes.header}>
            <h1>Edit module</h1>
            <div className={classes.close} onClick={props.close}>
              <IoCloseOutline className={classes.icon} />
            </div>
          </div>
          <div className={classes.form}>
            <label htmlFor="">Module Name</label>
            <Input value={props.moduleName} ref={moduleRef} />
          </div>
          <div className={classes.btns}>
            <Btn2 click={props.close} />
            <Btn1 click={editModule}>Save changes</Btn1>
          </div>
        </div>
      ) : props.type == "url" ? (
        <div className={classes.box}>
          <div className={classes.header}>
            <h1>Add new link</h1>
            <div className={classes.close} onClick={props.close}>
              <IoCloseOutline className={classes.icon} />
            </div>
          </div>
          <div className={classes.form}>
            <label htmlFor="">URL</label>
            <Input value={props.url} ref={urlRef} />
          </div>
          <div className={classes.form}>
            <label htmlFor="">Display Name</label>
            <Input value={props.moduleName} ref={moduleRef} />
          </div>
          <div className={classes.btns}>
            <Btn2 click={props.close} />
            <Btn1 click={editUrl}>Save Changes</Btn1>
          </div>
        </div>
      ) : props.type == "pdf" ? (
        <div className={classes.box}>
          <div className={classes.header}>
            <h1>Rename file</h1>
            <div className={classes.close} onClick={props.close}>
              <IoCloseOutline className={classes.icon} />
            </div>
          </div>
          <div className={classes.form}>
            <label htmlFor="">File name</label>
            <Input value={props.moduleName} ref={moduleRef} />
          </div>
          <div className={classes.btns}>
            <Btn2 click={props.close} />
            <Btn1 click={editPdf}>Save changes</Btn1>
          </div>
        </div>
      ) : (
        <div className={classes.box}>
          <div className={classes.header}>
            <h1>Add new link</h1>
            <div className={classes.close} onClick={props.close}>
              <IoCloseOutline className={classes.icon} />
            </div>
          </div>
          <div className={classes.form}>
            <label htmlFor="">URL</label>
            <Input ref={urlRef} />
          </div>
          <div className={classes.form}>
            <label htmlFor="">Display Name</label>
            <Input ref={moduleRef} />
          </div>
          <div className={classes.btns}>
            <Btn2 click={props.close} />
            <Btn1 click={addLink}>Add</Btn1>
          </div>
        </div>
      )}
    </>
  );
};

export default ModalBox;
