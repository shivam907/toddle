import React from "react";
import ModuleBox from "./ModuleBox";
import classes from "./style.module.css";
import Empty from "../Empty/Empty";
import { Container, Draggable, DropResult } from "react-smooth-dnd";

const Modules = (props) => {
  const modules = JSON.parse(localStorage.getItem("class"));
  const onDrop = (dropResult) => {
    const { removedIndex, addedIndex } = dropResult;
    let exis = JSON.parse(localStorage.getItem("class"));
    console.log(exis);
    let m = [];
    let nm = exis[removedIndex];
    // let nm=exis[removedIndex]
    exis[removedIndex] = exis[addedIndex];
    exis[addedIndex] = nm;

    localStorage.setItem("class", JSON.stringify(exis));
    console.log("removeIndex", removedIndex, "addIndex", addedIndex);
    props.render()
  };
  const m = [];
  modules?.forEach((i) => {
    if (i.type == "module") {
      m.push(i.name);
    }
  });
  console.log(modules);
  return (
    <div className={classes.modules}>
      {modules ? (
        <>
          <div className={classes.mod}>
            <Container
              groupName="1"
              onDrop={onDrop}
              dragHandleSelector=".dragHandleSelector"
            >
              {modules && modules.length != 0 ? (
                modules.map((module) => {
                  if (module.type == "module") {
                    return (
                      <Draggable key={Math.random()}>
                        <ModuleBox
                          render={props.render}
                          key={Math.random()}
                          data={module}
                        />
                      </Draggable>
                    );
                  }
                })
              ) : (
                <Empty />
              )}
            </Container>
          </div>
          {modules.map((module) => {
            if (module.type != "module") {
              return (
                <ModuleBox
                  render={props.render}
                  key={Math.random()}
                  data={module}
                />
              );
            }
          })}
        </>
      ) : (
        <Empty />
      )}
    </div>
  );
};

export default Modules;
