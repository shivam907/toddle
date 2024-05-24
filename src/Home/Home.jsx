import React from "react";
import classes from "./styles.module.css";
import NavBar from "../components/NavBar/NavBar";
import Empty from "../components/Empty/Empty";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Modules from "../components/Module/Modules";
import { useState } from "react";

const Home = () => {
  const [render, setRender] = useState();
  const changeRender = () => {
    setRender(Math.random());
  };
  return (
    <div className={classes.body}>
      <NavBar render={changeRender} />
      <main>
        {/* <Empty /> */}
        <Modules render={changeRender} />
      </main>
      <ToastContainer />
    </div>
  );
};

export default Home;
