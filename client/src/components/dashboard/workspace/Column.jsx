import React from "react";
import Task from "./Task";
import { useDroppable } from "@dnd-kit/core";

const Column = ({
  column,
  tasks,
  setSelectedTask,
  setShowTaskDetails,
  setShowDeleteConfirmation,
}) => {
  const { setNodeRef } = useDroppable({ id: column.status });
  return (
    <div
      ref={setNodeRef}
      className="w-1/3 rounded-lg bg-[#fcfcfc] shadow select-none"
    >
      <h1 className="text-2xl pt-4 font-semibold text-center mb-4">
        {column.title}
      </h1>
      <hr className="border-t-2 border-gray-200 my-2" />
      <div className="flex flex-col gap-4 p-4">
        {tasks.map((task, i) => (
          <Task
            key={i}
            task={task}
            setSelectedTask={setSelectedTask}
            setShowTaskDetails={setShowTaskDetails}
            setShowDeleteConfirmation={setShowDeleteConfirmation}
          />
        ))}
      </div>
    </div>
  );
};

export default Column;
