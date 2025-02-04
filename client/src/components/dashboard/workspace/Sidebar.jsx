import React from "react";
import 'remixicon/fonts/remixicon.css'


const Sidebar = ({ activeComponent, setActiveComponent, workspaceName }) => {
  return (
    <div className=" w-[20%] h-full p-4 rounded-md shadow-xl">
      <h2 className="text-xl font-semibold mb-6"> {workspaceName}</h2>
      <nav>
        <button
          onClick={() => setActiveComponent("kanban")}
          className={`block text-left w-full px-3 py-2 mb-2 rounded hover:bg-zinc-300 outline-none ${
            activeComponent === "kanban"
              ? "bg-[#ffffff] shadow"
              : ""
          }`}
        >
          <i className="ri-kanban-view mr-1"></i> Kanban Board
        </button>
        <button
          onClick={() => setActiveComponent("editor")}
          className={`block text-left w-full px-3 py-2 mb-2 rounded hover:bg-zinc-300 outline-none ${
            activeComponent === "editor"
              ? "bg-[#ffffff] shadow"
              : ""
          }`}
        >
         <i className="ri-ai-generate-text mr-1"></i> Text Editor
        </button>
        <button
          onClick={() => setActiveComponent("activity")}
          className={`block text-left w-full px-3 py-2 mb-2 rounded hover:bg-zinc-300 outline-none ${
            activeComponent === "activity"
              ? "bg-[#ffffff] shadow"
              : ""
          }`}
        >
         <i className="ri-chat-history-line mr-1"></i> Activity Log
        </button>
      </nav>
    </div>
  );
};

export default Sidebar;
