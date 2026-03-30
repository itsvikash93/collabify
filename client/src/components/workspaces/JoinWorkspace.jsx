import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const JoinWorkspace = ({ showJoinModal, setShowJoinModal, handleJoinWorkspace }) => {
  const { register, handleSubmit, reset } = useForm();

  const onSubmit = (data) => {
    let code = data.inviteCode.trim();
    // Intelligently handle if a user pastes the full URL by mistake
    if (code.includes("/invite/")) {
      code = code.split("/invite/").pop();
    }
    handleJoinWorkspace(code);
    reset();
  };

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setShowJoinModal(false);
    }
  };

  useEffect(() => {
    if (showJoinModal) {
      document.addEventListener("mousedown", handleOutsideClick);
    }
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [showJoinModal]);

  return (
    showJoinModal && (
      <div
        className="fixed inset-0 flex justify-center items-center bg-[#8c8b8b] bg-opacity-60 backdrop-blur-sm modal-overlay z-50"
        onClick={handleOutsideClick}
      >
        <div className="bg-[#eef7f6] px-6 py-4 rounded shadow-lg max-w-md w-full relative">
          <h2 className="text-xl font-semibold text-[#191D23] mb-4">Join Workspace</h2>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4 items-end justify-center"
          >
            <div className="w-full">
              <label
                htmlFor="inviteCode"
                className="block text-[#191D23] text-sm font-semibold mb-2"
              >
                Invite Code
              </label>
              <input
                id="inviteCode"
                type="text"
                className="w-full p-2 bg-[#cfe7df] text-[#191D23] placeholder-[#191D23] border-none rounded outline-none"
                placeholder="Enter invite code"
                {...register("inviteCode")}
                required
              />
            </div>

            <button
              type="submit"
              className="px-4 py-2 mt-2 bg-[#7ddabb] text-[#191D23] rounded font-semibold w-full hover:bg-[#68c5a5] transition-colors"
            >
              Join Workspace
            </button>
          </form>
          <button
            onClick={() => setShowJoinModal(false)}
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

export default JoinWorkspace;
