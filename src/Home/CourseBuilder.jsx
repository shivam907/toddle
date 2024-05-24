import React, { useState } from "react";
import { DragDropContext, Droppable, Draggable } from "react-beautiful-dnd";
const CourseBuilder = () => {
  const [modules, setModules] = useState([
    {
      id: "module-1",
      title: "Module 1",
      resources: [],
    },
    {
      id: "module-2",
      title: "Module 2",
      resources: [],
    },
  ]);

  const [resources, setResources] = useState([
    { id: "resource-1", content: "Resource 1" },
    { id: "resource-2", content: "Resource 2" },
  ]);

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId) {
      // Reordering within the same list
      if (source.droppableId === "resources") {
        const newResources = Array.from(resources);
        const [moved] = newResources.splice(source.index, 1);
        newResources.splice(destination.index, 0, moved);
        setResources(newResources);
      } else {
        const moduleIndex = modules.findIndex(
          (module) => module.id === source.droppableId
        );
        const newModuleResources = Array.from(modules[moduleIndex].resources);
        const [moved] = newModuleResources.splice(source.index, 1);
        newModuleResources.splice(destination.index, 0, moved);

        const newModules = Array.from(modules);
        newModules[moduleIndex].resources = newModuleResources;
        setModules(newModules);
      }
    } else {
      // Moving between lists
      if (source.droppableId === "resources") {
        const newResources = Array.from(resources);
        const [moved] = newResources.splice(source.index, 1);

        const moduleIndex = modules.findIndex(
          (module) => module.id === destination.droppableId
        );
        const newModuleResources = Array.from(modules[moduleIndex].resources);
        newModuleResources.splice(destination.index, 0, moved);

        const newModules = Array.from(modules);
        newModules[moduleIndex].resources = newModuleResources;

        setResources(newResources);
        setModules(newModules);
      } else if (destination.droppableId === "resources") {
        const moduleIndex = modules.findIndex(
          (module) => module.id === source.droppableId
        );
        const newModuleResources = Array.from(modules[moduleIndex].resources);
        const [moved] = newModuleResources.splice(source.index, 1);

        const newResources = Array.from(resources);
        newResources.splice(destination.index, 0, moved);

        const newModules = Array.from(modules);
        newModules[moduleIndex].resources = newModuleResources;

        setResources(newResources);
        setModules(newModules);
      } else {
        const sourceModuleIndex = modules.findIndex(
          (module) => module.id === source.droppableId
        );
        const destinationModuleIndex = modules.findIndex(
          (module) => module.id === destination.droppableId
        );

        const sourceResources = Array.from(
          modules[sourceModuleIndex].resources
        );
        const [moved] = sourceResources.splice(source.index, 1);

        const destinationResources = Array.from(
          modules[destinationModuleIndex].resources
        );
        destinationResources.splice(destination.index, 0, moved);

        const newModules = Array.from(modules);
        newModules[sourceModuleIndex].resources = sourceResources;
        newModules[destinationModuleIndex].resources = destinationResources;

        setModules(newModules);
      }
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="resources">
        {(provided) => (
          <div ref={provided.innerRef} {...provided.droppableProps}>
            {resources.map((resource, index) => (
              <Draggable
                key={resource.id}
                draggableId={resource.id}
                index={index}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    {resource.content}
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {modules.map((module) => (
        <Droppable key={module.id} droppableId={module.id}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.droppableProps}>
              <h2>{module.title}</h2>
              {module.resources.map((resource, index) => (
                <Draggable
                  key={resource.id}
                  draggableId={resource.id}
                  index={index}
                >
                  {(provided) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      {...provided.dragHandleProps}
                    >
                      {resource.content}
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      ))}
    </DragDropContext>
  );
};

export default CourseBuilder;
