import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const TaskDetails = ({
  task,
  setShowTaskDetails,
  setShowDeleteConfirmation,
  setSelectedTask,
  setShowEditModal,
  handleEditTask,
}) => {
  const { profile } = useSelector((state) => state.userReducer);
  const { workspaces } = useSelector((state) => state.workspaceReducer);
  
  const [showAssignDropdown, setShowAssignDropdown] = useState(false);

  // Authenticate Admin Context Status dynamically across local workspaces
  const currentWorkspace = workspaces.find((w) => w._id === task.workspace);
  const isAdmin = currentWorkspace?.members?.find((m) => m.userId?._id === profile?._id)?.role === "Admin";

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

  const handleAssign = (userId) => {
    handleEditTask(task._id, { assignedTo: userId });
    setShowAssignDropdown(false);
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
    <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center modal-overlay z-[900]">
      <div className="w-1/2 bg-white rounded-xl shadow-2xl p-6 max-h-[80vh] overflow-y-auto transform transition-all relative">
        <div className="flex justify-between items-start mb-6 border-b pb-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-800 mb-3">
              {task.title}
            </h1>
            <div className="flex flex-wrap gap-2 items-center">
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${getStatusColor(
                  task.status
                )}`}
              >
                {task.status}
              </span>
              <span
                className={`px-2 py-1 rounded-full text-xs font-semibold shadow-sm ${getPriorityColor(
                  task.priority
                )}`}
              >
                {task.priority} Priority
              </span>
              {task.assignedTo && (
                <span className="flex items-center gap-1.5 px-3 py-1 bg-gray-50 text-gray-700 rounded-full text-xs font-medium border border-gray-200 shadow-sm">
                  <div className="w-4 h-4 rounded-full bg-purple-100 text-purple-700 flex items-center justify-center font-bold text-[10px]">
                    {task.assignedTo.name ? task.assignedTo.name.charAt(0).toUpperCase() : "U"}
                  </div>
                  Assigned to: <span className="font-bold">{task.assignedTo.name}</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex gap-2">
            {/* Dynamic Admin-Specific Assignment Panel Wrapper */}
            {isAdmin && currentWorkspace?.members?.length > 0 && (
              <div className="relative">
                <button
                  className="bg-purple-500 hover:bg-purple-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-semibold"
                  onClick={() => setShowAssignDropdown(!showAssignDropdown)}
                >
                  <i className="ri-user-add-line"></i>
                  Assign
                </button>
                {showAssignDropdown && (
                  <div className="absolute right-0 top-full mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-xl z-50 overflow-hidden animate-fade-in">
                    <div className="px-3 py-2 bg-gray-50 border-b border-gray-100 text-xs font-semibold text-gray-500 uppercase tracking-wider flex justify-between items-center">
                      Assign To
                      <button onClick={() => setShowAssignDropdown(false)} className="hover:text-red-500">
                        <i className="ri-close-line text-sm"></i>
                      </button>
                    </div>
                    <div className="max-h-48 overflow-y-auto">
                      {currentWorkspace.members.map((member) => (
                        <button
                          key={member.userId?._id || Math.random()}
                          onClick={() => handleAssign(member.userId?._id)}
                          className={`w-full text-left px-4 py-2 text-sm hover:bg-purple-50 transition-colors flex items-center gap-3 border-b border-gray-50 last:border-0 ${task.assignedTo?._id === member.userId?._id ? "bg-purple-50 text-purple-700 font-medium" : "text-gray-700"}`}
                        >
                          <div className="w-6 h-6 rounded-full bg-purple-100 flex items-center justify-center text-purple-700 font-bold text-xs flex-shrink-0">
                            {member.userId?.name ? member.userId.name.charAt(0).toUpperCase() : "U"}
                          </div>
                          <span className="truncate">{member.userId?.name || "Unknown User"}</span>
                          {task.assignedTo?._id === member.userId?._id && <i className="ri-check-line ml-auto text-purple-600 font-bold"></i>}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

            <button
              className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-semibold"
              onClick={() => {
                setShowTaskDetails(false);
                setSelectedTask(task);
                setShowEditModal(true);
              }}
            >
              <i className="ri-edit-line"></i>
              Edit
            </button>
            <button
              className="bg-red-500 hover:bg-red-600 text-white px-3 py-1.5 rounded-lg flex items-center gap-1.5 transition-all duration-200 shadow-md hover:shadow-lg text-sm font-semibold"
              onClick={handleDeleteClick}
            >
              <i className="ri-delete-bin-line"></i>
              Delete
            </button>
          </div>
        </div>

        <div className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
              <i className="ri-file-text-line text-[#33d1bf]"></i>
              Description
            </h2>
            <p className="text-gray-700 leading-relaxed text-sm whitespace-pre-wrap">
              {task.description}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <i className="ri-calendar-line text-[#33d1bf]"></i>
                Created
              </h2>
              <p className="text-gray-700 text-sm font-medium tracking-wide">
                {new Date(task.createdAt).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>

            <div className="bg-gray-50 p-4 rounded-xl border border-gray-100 hover:border-gray-200 transition-colors shadow-sm">
              <h2 className="text-lg font-semibold text-gray-800 mb-2 flex items-center gap-2">
                <i className="ri-time-line text-[#33d1bf]"></i>
                Last Updated
              </h2>
              <p className="text-gray-700 text-sm font-medium tracking-wide">
                {new Date(task.updatedAt).toLocaleString(undefined, {
                  dateStyle: "medium",
                  timeStyle: "short",
                })}
              </p>
            </div>
            
            {task.deadline && (
              <div className="bg-red-50 p-4 rounded-xl border border-red-100 transition-colors shadow-sm col-span-2">
                <h2 className="text-lg font-semibold text-red-800 mb-1 flex items-center gap-2">
                  <i className="ri-alarm-warning-line"></i>
                  Deadline
                </h2>
                <p className="text-red-700 text-sm font-bold tracking-wide">
                  {new Date(task.deadline).toLocaleString(undefined, {
                    dateStyle: "full",
                    timeStyle: "short",
                  })}
                </p>
              </div>
            )}
            
          </div>
        </div>

        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors bg-gray-100 hover:bg-gray-200 rounded-full w-8 h-8 flex items-center justify-center outline-none"
        >
          <i className="ri-close-line text-xl"></i>
        </button>
      </div>
    </div>
  );
};

export default TaskDetails;
