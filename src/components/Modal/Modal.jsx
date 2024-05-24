import React from "react";
import ReactDOM from "react-dom";
import classes from "./styles.module.css";
import ModalBox from "./ModalBox";
const Modal = (props) => {
  const modalRoot = document.getElementById("modal-root");
  console.log(props);
  return ReactDOM.createPortal(
    <>
      <div
        className={classes.modal}
        onClick={() => {
          props.close();
        }}
      />
      <div className={classes.centered}>
        <ModalBox
          moduleName={props.moduleName}
          url={props.url}
          type={props.type}
          close={props.close}
        />
      </div>
    </>,
    modalRoot
  );
};

export default Modal;
