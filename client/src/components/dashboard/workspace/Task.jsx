import { useDraggable } from "@dnd-kit/core";
import React from "react";

const Task = ({
  task,
  setSelectedTask,
  setShowTaskDetails,
  setShowDeleteConfirmation,
}) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task._id,
    data: {
      status: task.status,
    },
  });

  const style = transform
    ? {
        transform: `translate(${transform.x}px, ${transform.y}px)`,
      }
    : undefined;

  const handleOpenTaskDetails = () => {
    setSelectedTask(task);
    setShowTaskDetails(true);
  };

  const handleDeleteClick = (e) => {
    e.stopPropagation();
    setSelectedTask(task);
    setShowDeleteConfirmation(true);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        {...attributes}
        {...listeners}
        style={style}
        className="w-full p-2 rounded-md bg-gray-100 shadow-md flex justify-between items-center"
        onClick={handleOpenTaskDetails}
      >
        <div className="">
          <h1 className="text-xl font-semibold">{task.title}</h1>
          <p className="text-sm">{task.description}</p>
          {task.priority && (
            <p className="text-sm text-gray-400">Priority: {task.priority}</p>
          )}
        </div>
        <button
          onClick={handleDeleteClick}
          className="text-red-600 hover:text-red-800"
        >
          <i className="ri-delete-bin-line text-xl"></i>
        </button>
      </div>
    </>
  );
};

export default Task;
