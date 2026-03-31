// import React, { useState } from "react";
// import "remixicon/fonts/remixicon.css";
// import { useNavigate } from "react-router-dom";
// import MembersModal from "./MembersModal";

import React, { useState } from "react";
import "remixicon/fonts/remixicon.css";
import { useNavigate } from "react-router-dom";
import MembersModal from "./MembersModal";

const Sidebar = ({
  activeComponent,
  workspaceName,
  workspaceId,
  inviteCode,
  onlineUsers = [],
}) => {
  const navigate = useNavigate();
  const [showMembersModal, setShowMembersModal] = useState(false);
  const [showOnlineList, setShowOnlineList] = useState(false);

  // Fallback to exactly 1 if the very initial socket pull is processing
  const onlineCount = onlineUsers.length > 0 ? onlineUsers.length : 1;

  return (
    <div className=" w-[20%] h-full p-4 rounded-md shadow-xl bg-[#eef7f6] flex flex-col">
      <h2 className="text-xl font-semibold mb-2 flex-shrink-0">
        {" "}
        {workspaceName}
      </h2>

      {/* Universal Online Presence Tracker */}
      <div className="relative mb-6">
        <button
          onClick={() => setShowOnlineList(!showOnlineList)}
          className="flex items-center gap-2 py-1 px-1 hover:bg-[#e2efee] rounded-md transition-colors w-full text-left outline-none cursor-pointer"
        >
          <span className="relative flex h-3 w-3">
            {onlineCount > 0 && (
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            )}
            <span
              className={`relative inline-flex rounded-full h-3 w-3 ${onlineCount > 0 ? "bg-green-500" : "bg-gray-400"}`}
            ></span>
          </span>
          <span className="text-sm font-medium text-gray-600">
            {onlineCount} {onlineCount === 1 ? "User" : "Users"} Online
            <i
              className={`ri-arrow-${showOnlineList ? "up" : "down"}-s-line ml-1 text-xs`}
            ></i>
          </span>
        </button>

        {/* Global Transparent Clickaway Overlay */}
        {showOnlineList && (
          <div
            className="fixed inset-0 z-40"
            onClick={() => setShowOnlineList(false)}
          ></div>
        )}

        {/* Floating Interactive Names Dropdown List */}
        {showOnlineList && onlineUsers.length > 0 && (
          <div className="absolute top-full left-0 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-100 z-50 overflow-hidden animate-fade-in">
            <div className="max-h-48 overflow-y-auto py-1">
              {onlineUsers.map((u) => (
                <div
                  key={u.userId}
                  className="flex items-center gap-3 px-3 py-2 hover:bg-gray-50 border-b border-gray-50 last:border-0 transition-colors"
                >
                  <div className="w-6 h-6 rounded-full bg-teal-100 flex items-center justify-center text-teal-700 font-bold flex-shrink-0 text-xs">
                    {u.userName ? u.userName.charAt(0).toUpperCase() : "U"}
                  </div>
                  <span className="text-sm text-gray-700 truncate">
                    {u.userName || "User"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>

      <button
        onClick={() => setShowMembersModal(true)}
        className="w-full text-sm flex items-center justify-center gap-2 bg-[#33d1bf] text-white hover:bg-[#2bb4a4] px-3 py-2 rounded-lg mb-6 shadow-sm transition-all duration-300 outline-none"
      >
        <i className="ri-group-line"></i> Members & Invite
      </button>

      <nav className="flex-1 overflow-y-auto">
        <button
          onClick={() =>
            navigate("", { state: { name: workspaceName, inviteCode } })
          }
          className={`block text-left w-full px-3 py-2 mb-2 rounded hover:bg-[#ffffff] outline-none ${
            activeComponent === workspaceId ? "bg-[#ffffff] shadow" : ""
          }`}
        >
          <i className="ri-kanban-view mr-1"></i> Kanban Board
        </button>
        <button
          onClick={() =>
            navigate("editor", { state: { name: workspaceName, inviteCode } })
          }
          className={`block text-left w-full px-3 py-2 mb-2 rounded hover:bg-[#ffffff] outline-none ${
            activeComponent === "editor" ? "bg-[#ffffff] shadow" : ""
          }`}
        >
          <i className="ri-ai-generate-text mr-1"></i> Text Editor
        </button>
        <button
          onClick={() =>
            navigate("activity", { state: { name: workspaceName, inviteCode } })
          }
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
