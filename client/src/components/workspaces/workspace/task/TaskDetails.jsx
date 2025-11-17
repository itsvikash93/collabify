import React, { useState, useEffect } from "react";
const TaskDetails = ({
  task,
  setShowTaskDetails,
  setShowDeleteConfirmation,
  setSelectedTask,
}) => {
  const handleClose = () => {
    setShowTaskDetails(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      handleClose();
    }
  };
  const handleDeleteClick = () => {
    setSelectedTask(task);
    setShowTaskDetails(false);
    setShowDeleteConfirmation(true);
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, []);

  const getPriorityColor = (priority) => {
    switch (priority?.toLowerCase()) {
      case "high":
        return "bg-red-100 text-red-800";
      case "medium":
        return "bg-yellow-100 text-yellow-800";
      case "low":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "To-Do":
        return "bg-purple-100 text-purple-800";
      case "In-Progress":
        return "bg-blue-100 text-blue-800";
      case "Done":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center modal-overlay">
      <div className="w-1/2 bg-white rounded-xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto transform transition-all">
        <div className="flex justify-between items-center mb-6 border-b pb-3">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-2">
              {task.title}
            </h1>
            <div className="flex gap-2">
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status}
              </span>
              <span
                className={`px-2 py-0.5 rounded-full text-xs font-medium ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority} Priority
              </span>
            </div>
          </div>
          <div className="flex gap-2">
            {/* <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
              onClick={() => setShowEditTask(true)}
            >
              <i className="ri-edit-line"></i>
              Edit
            </button> */}
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 shadow-md hover:shadow-lg text-sm"
              onClick={handleDeleteClick}
            >
              <i className="ri-delete-bin-line"></i>
              Delete
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <i className="ri-file-text-line"></i>
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm">
              {task.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <i className="ri-calendar-line"></i>
                Created
              </h2>
              <p className="text-gray-700 text-sm">
                {new Date(task.createdAt).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <i className="ri-time-line"></i>
                Last Updated
              </h2>
              <p className="text-gray-700 text-sm">
                {new Date(task.updatedAt).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
          </div>
        </div>

        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
