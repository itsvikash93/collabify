import React, { useEffect, useState } from "react";
import KanbanBoard from "./KanbanBoard";
import Sidebar from "./Sidebar";
import TextEditor from "./TextEditor";
import ActivityLog from "./ActivityLog";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../home/Navbar";
import RealTimeEditor from "./textEditor/EditorPage";

const Workspace = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  // const [activeComponent, setActiveComponent] = useState("kanban");
  const location = useLocation();
  const workspaceName = location.state;

  const activeComponent = location.pathname.split("/").pop();

  // useEffect(() => {
  //   const token = localStorage.getItem("token");
  //   if (!token) {
  //     navigate("/login");
  //   }
  // }, []);
  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex w-full overflow-hidden h-[92vh] gap-4 p-4">
        <Sidebar
          activeComponent={activeComponent}
          workspaceId={workspaceId}
          // setActiveComponent={setActiveComponent}
          workspaceName={workspaceName}
        />

        <div className="flex-1 w-[80%] rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
