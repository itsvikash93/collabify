import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const TaskModal = ({ showModal, setShowModal, handleAddTask }) => {
  const { register, handleSubmit, reset } = useForm();
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Get date-time 30 minutes from now in local format for min attribute
  const getMinDateTime = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30);
    const offset = now.getTimezoneOffset();
    const local = new Date(now.getTime() - offset * 60000);
    return local.toISOString().slice(0, 16);
  };

  const handleSubmitTask = async (data) => {
    setError("");

    // Validate deadline is at least 30 minutes from now
    if (data.deadline) {
      const selected = new Date(data.deadline);
      const minTime = new Date();
      minTime.setMinutes(minTime.getMinutes() + 30);
      if (selected < minTime) {
        setError("Deadline must be at least 30 minutes from now.");
        return;
      }
    }

    setLoading(true);
    try {
      await handleAddTask(data);
      reset();
      setShowModal(false);
    } catch (err) {
      const message =
        err?.response?.data?.message || "Failed to add task. Please try again.";
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal]);

  return (
    showModal && (
      <div
        className="fixed z-[999] inset-0 flex justify-center items-center bg-[#8c8b8b] bg-opacity-60 backdrop-blur-sm modal-overlay"
        onClick={handleOutsideClick}
      >
        <div className="bg-[#eef7f6] px-6 py-6 rounded-xl shadow-lg max-w-md w-full relative">
          <h2 className="text-xl font-bold text-[#191D23] mb-4 border-b border-gray-300 pb-2">Add Task</h2>
          <form
            onSubmit={handleSubmit(handleSubmitTask)}
            className="flex flex-col gap-4"
          >
            <div className="w-full">
              <label
                htmlFor="title"
                className="block text-sm font-semibold text-[#191D23] mb-1"
              >
                Task Name
              </label>
              <input
                id="title"
                type="text"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7dcfb4]"
                placeholder="Enter task name"
                {...register("title")}
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="description"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                className="w-full h-20 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7dcfb4] resize-none"
                placeholder="Enter task description"
                {...register("description")}
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="status"
                className="block text-sm font-semibold text-[#191D23] mb-1"
              >
                Status
              </label>
              <select
                id="status"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7dcfb4]"
                {...register("status")}
                required
              >
                <option value="" disabled>
                  Select Status
                </option>
                <option value="To-Do" className="text-blue-600 bg-blue-50">
                  To-Do
                </option>
                <option
                  value="In-Progress"
                  className="text-orange-600 bg-orange-50"
                >
                  In-Progress
                </option>
                <option value="Done" className="text-green-600 bg-green-50">
                  Done
                </option>
              </select>
            </div>

            <div className="w-full">
              <label
                htmlFor="priority"
                className="block text-sm font-semibold text-[#191D23] mb-1"
              >
                Priority Level
              </label>
              <select
                id="priority"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7dcfb4]"
                {...register("priority")}
                required
              >
                <option value="" disabled>
                  Select Priority
                </option>
                <option value="low" className="text-green-600 bg-green-50">
                  Low Priority
                </option>
                <option value="medium" className="text-yellow-600 bg-yellow-50">
                  Medium Priority
                </option>
                <option value="high" className="text-red-600 bg-red-50">
                  High Priority
                </option>
              </select>
            </div>

            <div className="w-full">
              <label
                htmlFor="deadline"
                className="block text-sm font-semibold text-[#191D23] mb-1"
              >
                Deadline
              </label>
              <input
                id="deadline"
                type="datetime-local"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-[#7dcfb4]"
                min={getMinDateTime()}
                {...register("deadline", { required: "Deadline is required" })}
              />
            </div>

            {error && (
              <div className="w-full px-3 py-2 bg-red-50 border border-red-200 rounded text-red-600 text-sm">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-2 bg-[#7dcfb4] text-white py-2 rounded-md font-semibold hover:bg-[#6cba9f] transition-colors flex justify-center items-center"
            >
              {loading ? (
                <i className="ri-loader-line animate-spin text-xl"></i>
              ) : (
                "Create Task"
              )}
            </button>
          </form>
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-4 right-4 text-[#191D23] hover:text-red-500 transition-colors"
            aria-label="Close modal"
          >
            <span className="text-3xl leading-none">&times;</span>
          </button>
        </div>
      </div>
    )
  );
};

export default TaskModal;
