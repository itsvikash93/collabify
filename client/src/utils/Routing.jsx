import { Routes, Route } from "react-router-dom";
import Home from "../components/home/Home";
import Signup from "../components/user/Signup";
import Login from "../components/user/Login";
import Dashboard from "../components/dashboard/Dashboard";
import Profile from "../components/user/Profile";
import Workspace from "../components/dashboard/workspace/Workspace";
const Routing = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/workspaces/:workspaceId" element={<Workspace />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />
    </Routes>
  );
};

export default Routing;
