import React, { useEffect, useState } from "react";
import axios from "../../../utils/axios";
import { toast } from "react-toastify";

const MembersModal = ({ showMembersModal, setShowMembersModal, workspaceId, inviteCode }) => {
  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (showMembersModal) {
      setLoading(true);
      axios.get(`/workspaces/${workspaceId}`).then((res) => {
        setMembers(res.data.members || []);
        setLoading(false);
      });
    }
  }, [showMembersModal, workspaceId]);

  const handleOutsideClick = (e) => {
    if (e.target.classList.contains("modal-overlay")) {
      setShowMembersModal(false);
    }
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const getColor = (name) => {
    // Generate a consistent color based on string
    if (!name) return "#33d1bf";
    const colors = ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA", "#F472B6", "#14B8A6"];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
        sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  return (
    showMembersModal && (
      <div
        className="fixed inset-0 flex justify-center items-center bg-[#8c8b8b] bg-opacity-60 backdrop-blur-sm modal-overlay z-50 text-left"
        onClick={handleOutsideClick}
      >
        <div className="bg-[#eef7f6] px-6 py-6 rounded-xl shadow-lg max-w-md w-full relative max-h-[80vh] flex flex-col">
          <h2 className="text-xl font-bold text-[#191D23] mb-4 border-b border-gray-300 pb-2">Workspace Members {members.length > 0 && `(${members.length})`}</h2>
          
          <div className="flex-1 overflow-y-auto pr-2 mb-6">
            {loading ? (
              <div className="flex justify-center p-4">
                 <i className="ri-loader-line text-2xl animate-spin text-[#33d1bf]"></i>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                {members.map((member) => (
                  <div key={member._id} className="flex items-center gap-3 p-2 hover:bg-[#cfe7df] rounded-lg transition-colors">
                    <div 
                      className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-sm shadow-sm"
                      style={{ backgroundColor: getColor(member.userId?.name) }}
                    >
                      {getInitials(member.userId?.name)}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-[#191D23] text-sm">{member.userId?.name || "Unknown User"}</p>
                      <p className="text-xs text-gray-500">{member.userId?.email || ""}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded-md font-medium ${member.role === 'Admin' ? 'bg-[#33d1bf] text-white' : 'bg-gray-200 text-gray-600'}`}>
                      {member.role}
                    </span>
                  </div>
                ))}
              </div>
            )}
          </div>

          {inviteCode && (
            <div className="border-t border-gray-300 pt-4">
              <p className="text-sm font-semibold mb-2 text-center text-gray-600">Invite new members</p>
              <button
                onClick={() => {
                  navigator.clipboard.writeText(inviteCode);
                  toast.success("Invite code copied!");
                }}
                className="w-full text-sm flex items-center justify-center gap-2 bg-[#191d23] text-white hover:bg-[#2a2f38] px-3 py-2 rounded-lg shadow-sm transition-all duration-300"
              >
                <i className="ri-file-copy-line"></i> Copy Invite Code
              </button>
            </div>
          )}

          <button
            onClick={() => setShowMembersModal(false)}
            className="absolute top-4 right-4 p-1 text-[#191D23] hover:text-red-500 transition-colors"
            aria-label="Close modal"
          >
            <span className="text-3xl leading-none">&times;</span>
          </button>
        </div>
      </div>
    )
  );
};

export default MembersModal;
