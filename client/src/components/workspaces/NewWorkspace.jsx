import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";

const NewWorkspace = ({ showModal, setShowModal, handleAddWorkspace }) => {
  const { register, handleSubmit, reset } = useForm();

  const handleSubmitWorkspace = (data) => {
    console.log(data);
    handleAddWorkspace(data);
    reset();
    setShowModal(false);
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
        className="fixed inset-0 flex justify-center items-center bg-[#8c8b8b] bg-opacity-60 backdrop-blur-sm modal-overlay"
        onClick={handleOutsideClick}
      >
        <div className="bg-[#eef7f6] px-6 py-4 rounded shadow-lg max-w-md w-full relative">
          <h2 className="text-xl font-semibold text-[#191D23] mb-2">Create New Workspace</h2>
          <form
            onSubmit={handleSubmit(handleSubmitWorkspace)}
            className="flex flex-col gap-2 items-end justify-center"
          >
            <div className="w-full">
              <label
                htmlFor="name"
                className="block text-[#191D23] text-sm font-semibold mb-2"
              >
                Workspace Name
              </label>
              <input
                id="name"
                type="text"
                className="w-full p-2 bg-[#cfe7df] text-[#191D23] placeholder-[#191D23] border-none rounded outline-none"
                placeholder="Enter workspace name"
                {...register("name")}
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="description"
                className="block text-[#191D23] text-sm font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="description"
                className="w-full h-20 p-2 bg-[#cfe7df] text-[#191D23] placeholder-[#191D23] border-none rounded outline-none resize-none"
                placeholder="Enter workspace description"
                {...register("description")}
                required
              />
            </div>

            <button
              type="submit"
              className="px-3 py-2 mt-1 bg-[#7ddabb] text-[#191D23] rounded font-semibold"
            >
              Create Workspace
            </button>
          </form>
          <button
            onClick={() => setShowModal(false)}
            className="absolute top-2 right-2 p-2 text-[#191D23] "
            aria-label="Close modal"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
      </div>
    )
  );
};

export default NewWorkspace;
