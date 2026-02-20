import { Routes, Route, Navigate } from "react-router-dom";
import Home from "../components/home/Home";
import Signup from "../components/user/Signup";
import Login from "../components/user/Login";
import Workspaces from "../components/workspaces/Workspaces";
import Profile from "../components/user/Profile";
import Workspace from "../components/workspaces/workspace/Workspace";
import ProtectedRoutes from "./ProtectedRoutes";
import EditorPage from "../components/workspaces/workspace/textEditor/EditorPage";
import KanbanBoard from "../components/workspaces/workspace/KanbanBoard";
import ActivityLog from "../components/workspaces/workspace/ActivityLog";
const Routing = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<ProtectedRoutes />}>
        <Route path="/" element={<Navigate to="/workspaces" replace />} />
        <Route path="/workspaces" element={<Workspaces />} />
        <Route path="/workspaces/:workspaceId" element={<Workspace />}>
          <Route index element={<KanbanBoard />} />
          <Route path="editor" element={<EditorPage />} />
          <Route path="activity" element={<ActivityLog />} />
        </Route>

        <Route path="/profile" element={<Profile />} />
      </Route>
    </Routes>
  );
};

export default Routing;
