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

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-[#fdebe6] text-red-800";
      case "medium":
        return "bg-[#fbfbeb] text-yellow-800";
      case "low":
        return "bg-[#d9fffc] text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div
      ref={setNodeRef}
      {...attributes}
      {...listeners}
      style={style}
      className="w-full px-3 py-5 rounded-md bg-[#ffffff] shadow-md flex justify-between items-center"
      onClick={handleOpenTaskDetails}
    >
      <div className="flex flex-col gap-1">
        {task.priority && (
          <p
            className={`text-sm px-3 py-1 font-semibold rounded-xl w-fit ${getPriorityColor(
              task.priority
            )} capitalize`}
          >
            {task.priority}
          </p>
        )}
        <h1 className="text-xl font-semibold">{task.title}</h1>
        <p className="text-sm text-zinc-400">{task.description}</p>
      </div>
      <button
        onClick={handleDeleteClick}
        className="text-red-600 hover:text-red-800"
      >
        <i className="ri-delete-bin-line text-xl"></i>
      </button>
    </div>
  );
};

export default Task;
