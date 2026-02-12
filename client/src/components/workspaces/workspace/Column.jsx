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
      style={{ background: column.color }}
      className={`w-1/3 rounded-lg shadow-md select-none h-fit`}
    >
      {/* <div style={{ background: column.color }} className="sticky top-0 z-2"> */}
      <div style={{ background: column.color }} className="rounded-lg">
        <h1 className="text-2xl pt-4 font-semibold px-4 mb-4 flex items-center gap-2">
          <span
            style={{ background: column.color2 }}
            className="inline-block h-2 w-2 rounded-full"
          ></span>
          {column.title}
        </h1>
        <hr className="border-t-2 border-[#57707A] my-2" />
      </div>
      <div className="flex flex-col gap-4 p-4">
        {tasks?.length > 0 ? (
          tasks.map((task, i) => (
            <Task
              key={i}
              task={task}
              setSelectedTask={setSelectedTask}
              setShowTaskDetails={setShowTaskDetails}
              setShowDeleteConfirmation={setShowDeleteConfirmation}
            />
          ))
        ) : (
          <p className="text-center text-gray-800">No tasks</p>
        )}
      </div>
    </div>
  );
};

export default Column;
