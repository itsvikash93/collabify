import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoutes = () => {
    const token = localStorage.getItem("collabifyToken");

    return token ? <Outlet /> : <Navigate to="/login" />;
};

export default ProtectedRoutes;
