import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Home";
import Signup from "../components/user/Signup";
import Login from "../components/user/Login";
import Workspaces from "../components/workspaces/Workspaces";
import Profile from "../components/user/Profile";
import Workspace from "../components/workspaces/workspace/Workspace";
import ProtectedRoutes from "./ProtectedRoutes";
const Routing = () => {
  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />

      <Route path="/" element={<ProtectedRoutes />}>
        {/* <Route path="/" element={<Home />} /> */}
        <Route path="/workspaces" element={<Workspaces />} />
        <Route path="/workspaces/:workspaceId" element={<Workspace />} />
        <Route path="/profile" element={<Profile />} />
      </Route>

    </Routes>
  );
};

export default Routing;
