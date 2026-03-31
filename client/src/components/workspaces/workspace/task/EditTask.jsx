import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const EditTask = ({ showModal, setShowModal, handleEditTask, task }) => {
  const { register, handleSubmit, reset } = useForm();

  const handleSubmitTask = (data) => {
    handleEditTask(task._id, data);
    setShowModal(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setShowModal(false);
    }
  };

  useEffect(() => {
    if (showModal && task) {
      document.addEventListener("mousedown", handleOutsideClick);
      reset({
        title: task.title,
        description: task.description,
        status: task.status,
        priority: task.priority,
        deadline: task.deadline ? new Date(task.deadline).toISOString().slice(0, 16) : "",
      });
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showModal, task, reset]);

  return (
    showModal && (
      <div
        className="fixed z-[999] inset-0 flex justify-center items-center bg-gray-500 bg-opacity-50 modal-overlay"
        onClick={handleOutsideClick}
      >
        <div className="bg-white px-6 py-4 rounded shadow-lg max-w-md w-full relative">
          <h2 className="text-xl font-semibold mb-2">Edit Task</h2>
          <form
            onSubmit={handleSubmit(handleSubmitTask)}
            className="flex flex-col gap-2 items-end justify-center"
          >
            <div className="w-full">
              <label
                htmlFor="title"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Task Name
              </label>
              <input
                id="title"
                type="text"
                className="w-full p-2 border border-gray-400 rounded outline-none"
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
                className="w-full h-20 p-2 border border-gray-400 rounded outline-none resize-none"
                placeholder="Enter task description"
                {...register("description")}
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="status"
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Status
              </label>
              <select
                id="status"
                className="w-full p-2 border border-gray-400 rounded outline-none"
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
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Priority Level
              </label>
              <select
                id="priority"
                className="w-full p-2 border border-gray-400 rounded outline-none"
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
                className="block text-gray-700 text-sm font-semibold mb-2"
              >
                Deadline
              </label>
              <input
                id="deadline"
                type="datetime-local"
                className="w-full p-2 border border-gray-400 rounded outline-none"
                {...register("deadline", { required: "Deadline is required" })}
              />
            </div>

            <button
              type="submit"
              className="px-3 py-2 mt-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors duration-200 font-semibold focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
            >
              Update Task
            </button>
          </form>
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-2 right-2 p-2 text-gray-500 hover:text-zinc-700 "
            aria-label="Close modal"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
      </div>
    )
  );
};

export default EditTask;
