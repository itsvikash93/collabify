import React, { useState, useEffect, useCallback } from "react";
import Navbar from "../home/Navbar";
import NewWorkspace from "./NewWorkspace";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  asyncGetWorkspaces,
  asyncAddWorkspace,
  asyncDeleteWorkspace,
} from "../../store/actions/WorkspaceActions";
import { toast } from "react-toastify";
import DeleteConfirmation from "./delete/DeleteConfirmation";

const Workspaces = () => {
  const [showModal, setShowModal] = useState(false);
  const [deleteDetails, setDeleteDetails] = useState(null); // Tracks the workspace to be deleted
  const dispatch = useDispatch();
  const { workspaces } = useSelector((state) => state.workspaceReducer);

  const getWorkspaces = useCallback(async () => {
    try {
      await dispatch(asyncGetWorkspaces());
    } catch (error) {
      console.error("Failed to fetch workspaces:", error);
      toast.error("Failed to load workspaces. Please try again.");
    }
  }, [dispatch]);

  const handleAddWorkspace = useCallback(
    async (data) => {
      try {
        await dispatch(asyncAddWorkspace(data));
        setShowModal(false);
      } catch (error) {
        console.error("Failed to add workspace:", error);
      }
    },
    [dispatch]
  );

  const handleDeleteWorkspace = useCallback(
    async (workspaceId) => {
      try {
        await dispatch(asyncDeleteWorkspace(workspaceId));
        setDeleteDetails(null); // Close delete modal on success
      } catch (error) {
        console.error("Failed to delete workspace:", error);
        toast.error("Failed to delete workspace. Please try again.");
      }
    },
    [dispatch]
  );

  useEffect(() => {
    getWorkspaces();
  }, [getWorkspaces]);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex w-full overflow-hidden h-[92vh] gap-4 px-6 py-4">
        <div className="flex-1 w-[80%] rounded-md">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-semibold">My Workspaces</h1>
            <button
              className="px-4 py-2 bg-[#7ddabb] shadow-md text-[#2a2a2a] rounded-full flex items-center gap-2"
              onClick={() => setShowModal(true)}
            >
              <i className="ri-add-circle-line"></i>
              New Workspace
            </button>
            <NewWorkspace
              showModal={showModal}
              setShowModal={setShowModal}
              handleAddWorkspace={handleAddWorkspace}
            />
          </div>

          {workspaces.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {workspaces.map((workspace) => (
                <div
                  key={workspace._id}
                  className="bg-[#eef7f6] p-6 rounded-xl shadow-md transition-all duration-300 border border-[#a8e8e0] hover:border-[#33d1bf]"
                >
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-[#191D23]">
                      {workspace.name}
                    </h3>
                    <button
                      onClick={() =>
                        setDeleteDetails({
                          id: workspace._id,
                          name: workspace.name,
                        })
                      }
                      className="text-red-700 hover:text-red-800"
                    >
                      <i className="ri-delete-bin-line text-xl"></i>
                    </button>
                  </div>
                  <p className="text-[#191D23] mb-6 line-clamp-2">
                    {workspace.description}
                  </p>
                  <div className="flex justify-between items-center pt-4 border-t border-[#57707A]">
                    <span className="text-sm text-[#191D23] flex items-center">
                      <i className="ri-calendar-line mr-2"></i>
                      {new Date(workspace.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                    <Link
                      to={`/workspaces/${workspace._id}`}
                      state={workspace.name}
                      className="inline-flex items-center px-4 py-2 bg-[#b1e6e0] rounded-lg"
                    >
                      Open
                      <i className="ri-arrow-right-line ml-2"></i>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="">
              <h1 className="text-2xl font-semibold text-center">
                No workspaces found, create one
              </h1>
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {deleteDetails && (
        <DeleteConfirmation
          itemId={deleteDetails.id}
          itemName={deleteDetails.name}
          onDelete={() => handleDeleteWorkspace(deleteDetails.id)}
          onCancel={() => setDeleteDetails(null)}
        />
      )}
    </div>
  );
};

export default Workspaces;
