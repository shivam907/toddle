import React from "react";
import { DragDropContainer } from "react-drag-drop-container";

export default function Boxable(props) {
  const { targetKey, label, customDragElement } = props;
  return (
    <div className="boxable_component">
      <DragDropContainer
        targetKey={targetKey}
        dragData={{ label: label, elem: props.children }}
        customDragElement={customDragElement}
        onDragStart={() => console.log("start")}
        onDrag={() => console.log("dragging")}
        onDragEnd={() => console.log("end")}
        onDrop={(e) => console.log(e)}
      >
        <div onClick={props.onClick}>{props.children}</div>
      </DragDropContainer>
    </div>
  );
}
