import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "../../utils/axios";
import { toast } from "react-toastify";

const Invite = () => {
  const { code } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const joinWorkspace = async () => {
      try {
        const response = await axios.post(`/workspaces/join/${code}`);
        toast.success("Successfully joined the workspace!");
        navigate("/workspaces");
      } catch (error) {
        console.error(error);
        toast.error(error.response?.data?.message || "Failed to join workspace.");
        navigate("/workspaces");
      }
    };
    joinWorkspace();
  }, [code, navigate]);

  return (
    <div className="flex h-screen items-center justify-center bg-[#eef7f6]">
      {loading && (
        <div className="text-center flex flex-col items-center">
          <i className="ri-loader-line text-4xl animate-spin text-[#33d1bf] mb-4"></i>
          <h2 className="text-xl font-semibold text-gray-700">Joining workspace...</h2>
        </div>
      )}
    </div>
  );
};

export default Invite;
