import React, { useEffect, useState } from "react";
import KanbanBoard from "./KanbanBoard";
import Sidebar from "./Sidebar";
import TextEditor from "./TextEditor";
import ActivityLog from "./ActivityLog";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../home/Navbar";

const Workspace = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const [activeComponent, setActiveComponent] = useState("kanban");
  const location = useLocation();
  const workspaceName = location.state;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
    }
  }, []);
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex w-full overflow-hidden h-[92vh] flex gap-4 p-4">
        <Sidebar
          activeComponent={activeComponent}
          setActiveComponent={setActiveComponent}
          workspaceName={workspaceName}
        />

        <div className="flex-1 w-[80%] rounded-md">
          {activeComponent === "kanban" && <KanbanBoard />}
          {activeComponent === "editor" && <TextEditor />}
          {activeComponent === "activity" && <ActivityLog />}
        </div>
      </div>
    </div>
  );
};

export default Workspace;
