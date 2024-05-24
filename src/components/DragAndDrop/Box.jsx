import React, { useState } from "react";
import { DragDropContainer, DropTarget } from "react-drag-drop-container";
import BoxItem from "./BoxItem";
import { nanoid } from "nanoid";
import ResourceBox from "../Module/ResourceBox";
export default function Box(props) {
  let arr = [];
  props.items?.forEach((i) => {
    arr.push({ label: i });
  });
  const { targetKey } = props;
  const [items, setItems] = useState(arr || []);
  const [name, setName] = useState();
  const handleDrop = (e) => {
    console.log(props.name, e.dragData.label);
    setName(e.dragData.name);
    let existingModule = JSON.parse(localStorage.getItem("class"));
    let n = [];
    existingModule.forEach((module) => {
      let c = [];
      module.child?.forEach((i) => {
        if (i != e.dragData.label) {
          c.push(i);
        }
      });
      module.child = c;
      if (module.name != e.dragData.label) {
        n.push(module);
      }
    });
    console.log("n", n);
    existingModule = n;
    existingModule.forEach((module) => {
      if (module.name == props.name) {
        module.child.push(e.dragData.label);
        console.log(module);
      }
    });

    localStorage.setItem("class", JSON.stringify(existingModule));
    props.render();
    const newItem = {
      label: e.dragData.label,
      uid: nanoid(),
      elem: e.dragData.elem,
    };
    const newItems = [...items];
    newItems.splice(items.length, 0, newItem);
    setItems(newItems);
    e.containerElem.style.visibility = "hidden";
  };

  const swap = (fromIndex, toIndex, dragData) => {
    console.log("swap ", dragData, fromIndex, toIndex);
    const newItem = {
      label: dragData.label,
      uid: nanoid(),
      elem: dragData.elem,
    };
    const newItems = [...items];
    newItems.splice(toIndex, 0, newItem);
    setItems(newItems);
  };

  const kill = (uid) => {
    console.log("kill ", uid);

    const newItems = [...items];
    items.map((item, index) => {
      if (item.uid == uid) {
        newItems.splice(index, 1);
      }
    });

    setItems(newItems);
  };

  return (
    <div key={Math.random()} className="component_box">
      <DropTarget
        onHit={handleDrop}
        targetKey={targetKey}
        dropData={{ name: props.name }}
      >
        <DropTarget
          onHit={handleDrop}
          targetKey="boxItem"
          dropData={{ name: props.name }}
        >
          <div className="box">
            {console.log("items ", items)}
            {items.map((item, index) => {
              return (
                <BoxItem
                  key={item.uid}
                  uid={item.uid}
                  kill={kill}
                  index={index}
                  swap={swap}
                  label={item.label}
                >
                  <ResourceBox
                    key={item.uid}
                    render={props.render}
                    moduleName={item.label}
                  />
                </BoxItem>
              );
            })}
          </div>
        </DropTarget>
      </DropTarget>
    </div>
  );
}
