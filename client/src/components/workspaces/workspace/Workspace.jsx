import React, { useEffect, useState } from "react";
import KanbanBoard from "./KanbanBoard";
import Sidebar from "./Sidebar";
import TextEditor from "./TextEditor";
import ActivityLog from "./ActivityLog";
import { Outlet, useLocation, useNavigate, useParams } from "react-router-dom";
import Navbar from "../../home/Navbar";
import RealTimeEditor from "./textEditor/EditorPage";
import { socket } from "../../../socket/socket";
import { useSelector, useDispatch } from "react-redux";
import { asyncGetUserProfile } from "../../../store/actions/UserActions";
import { asyncGetWorkspaces } from "../../../store/actions/WorkspaceActions";

const Workspace = () => {
  const navigate = useNavigate();
  const { workspaceId } = useParams();
  const location = useLocation();
  const workspaceName = location.state?.name || location.state;
  const inviteCode = location.state?.inviteCode;

  const activeComponent = location.pathname.split("/").pop();

  // Track Live Active Workspace Users globally!
  const [onlineUsers, setOnlineUsers] = useState([]);
  const userProfile = useSelector((state) => state.userReducer.profile);
  const { workspaces } = useSelector((state) => state.workspaceReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!userProfile) {
      dispatch(asyncGetUserProfile());
    }
    if (!workspaces || workspaces.length === 0) {
      dispatch(asyncGetWorkspaces());
    }
  }, [dispatch, userProfile]);

  useEffect(() => {
    // connect only if not connected
    if (!socket.connected) {
      socket.connect();
    }

    const userId = userProfile?._id || "anonymous";
    const userName = userProfile?.name || "User";

    // globally join workspace room representing generic presence
    socket.emit("workspace:join", { workspaceId, userId, userName });

    const handleOnlineUsers = (usersList) => {
      setOnlineUsers(usersList);
    };

    socket.on("workspace:online-users", handleOnlineUsers);

    return () => {
      socket.emit("workspace:leave", { workspaceId });
      socket.off("workspace:online-users", handleOnlineUsers);
    };
  }, [workspaceId, userProfile]);

  return (
    <div className="flex flex-col">
      <Navbar />
      <div className="flex w-full overflow-hidden h-[92vh] gap-4 p-4">
        <Sidebar
          activeComponent={activeComponent}
          workspaceId={workspaceId}
          workspaceName={workspaceName}
          inviteCode={inviteCode}
          onlineUsers={onlineUsers}
        />

        <div className="flex-1 w-[80%] rounded-md">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Workspace;
