import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const EditWorkspace = ({ showEditModal, setShowEditModal, workspaceToEdit, handleUpdateWorkspace }) => {
  const { register, handleSubmit, reset, setValue } = useForm();

  useEffect(() => {
    if (workspaceToEdit) {
      setValue("name", workspaceToEdit.name);
      setValue("description", workspaceToEdit.description);
    }
  }, [workspaceToEdit, setValue]);

  const onSubmit = (data) => {
    handleUpdateWorkspace(workspaceToEdit._id, data);
    reset();
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setShowEditModal(false);
    }
  };

  useEffect(() => {
    if (showEditModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showEditModal]);

  return (
    showEditModal && (
      <div
        className="fixed inset-0 flex justify-center items-center bg-[#8c8b8b] bg-opacity-60 backdrop-blur-sm modal-overlay z-50"
        onClick={handleOutsideClick}
      >
        <div className="bg-[#eef7f6] px-6 py-4 rounded shadow-lg max-w-md w-full relative">
          <h2 className="text-xl font-semibold text-[#191D23] mb-4">Edit Workspace</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 items-end justify-center"
          >
            <div className="w-full">
              <label
                htmlFor="edit-name"
                className="block text-[#191D23] text-sm font-semibold mb-2"
              >
                Workspace Name
              </label>
              <input
                id="edit-name"
                type="text"
                className="w-full p-2 bg-[#cfe7df] text-[#191D23] placeholder-[#191D23] border-none rounded outline-none"
                placeholder="Enter workspace name"
                {...register("name")}
                required
              />
            </div>

            <div className="w-full">
              <label
                htmlFor="edit-description"
                className="block text-[#191D23] text-sm font-semibold mb-2"
              >
                Description
              </label>
              <textarea
                id="edit-description"
                className="w-full h-20 p-2 bg-[#cfe7df] text-[#191D23] placeholder-[#191D23] border-none rounded outline-none resize-none"
                placeholder="Enter workspace description"
                {...register("description")}
                required
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 mt-2 bg-[#7ddabb] text-[#191D23] rounded font-semibold w-full hover:bg-[#68c5a5] transition-colors"
            >
              Save Changes
            </button>
          </form>
          <button
            onClick={() => setShowEditModal(false)}
            className="absolute top-2 right-2 p-2 text-[#191D23] hover:text-red-500"
            aria-label="Close modal"
          >
            <span className="text-2xl">&times;</span>
          </button>
        </div>
      </div>
    )
  );
};

export default EditWorkspace;
