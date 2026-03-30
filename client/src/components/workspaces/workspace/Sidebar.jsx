import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router-dom";
import MembersModal from "./MembersModal";

const Sidebar = ({ activeComponent, workspaceName, workspaceId, inviteCode }) => {
  const navigate = useNavigate();
  const [showMembersModal, setShowMembersModal] = useState(false);

  return (
    <div className=" w-[20%] h-full p-4 rounded-md shadow-xl bg-[#eef7f6] flex flex-col">
      <h2 className="text-xl font-semibold mb-6 flex-shrink-0"> {workspaceName}</h2>
      <button
        onClick={() => setShowMembersModal(true)}
        className="w-full text-sm flex items-center justify-center gap-2 bg-[#33d1bf] text-white hover:bg-[#2bb4a4] px-3 py-2 rounded-lg mb-6 shadow-sm transition-all duration-300"
      >
        <i className="ri-group-line"></i> Members & Invite
      </button>
      <nav className="flex-1 overflow-y-auto">
        <button
          onClick={() => navigate("", { state: { name: workspaceName, inviteCode } })}
          className={`block text-left w-full px-3 py-2 mb-2 rounded hover:bg-[#ffffff] outline-none ${
            activeComponent === workspaceId ? "bg-[#ffffff] shadow" : ""
          }`}
        >
          <i className="ri-kanban-view mr-1"></i> Kanban Board
        </button>
        <button
          onClick={() => navigate("editor", { state: { name: workspaceName, inviteCode } })}
          className={`block text-left w-full px-3 py-2 mb-2 rounded hover:bg-[#ffffff] outline-none ${
            activeComponent === "editor" ? "bg-[#ffffff] shadow" : ""
          }`}
        >
          <i className="ri-ai-generate-text mr-1"></i> Text Editor
        </button>
        <button
          onClick={() => navigate("activity", { state: { name: workspaceName, inviteCode } })}
          className={`block text-left w-full px-3 py-2 mb-2 rounded hover:bg-[#ffffff] outline-none ${
            activeComponent === "activity" ? "bg-[#ffffff] shadow" : ""
          }`}
        >
          <i className="ri-chat-history-line mr-1"></i> Activity Log
        </button>
      </nav>
      
      <MembersModal 
        showMembersModal={showMembersModal}
        setShowMembersModal={setShowMembersModal}
        workspaceId={workspaceId}
        inviteCode={inviteCode}
      />
    </div>
  );
};

export default Sidebar;
