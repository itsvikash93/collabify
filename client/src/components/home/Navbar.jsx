import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { asyncLogout } from "../../store/actions/AuthActions";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(asyncLogout(() => navigate("/login")));
  };

  return (
    <div className="w-full h-[8vh] px-6 py-2 flex justify-between gap-20 items-center bg-[#eef7f6]">
      <div className="flex items-center gap-2">
        <img src="/collabify.png" alt="logo" className="w-7" />
        <h3 className="text-2xl font-semibold">Collabify</h3>
      </div>
      <div className="flex gap-10 p-2 rounded-md">
        <Link to="/workspaces">
          <h5 className="text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors">
            Workspaces
          </h5>
        </Link>
        <Link to="/profile">
          <h5 className="text-lg font-semibold text-gray-700 hover:text-gray-900 transition-colors">
            Profile
          </h5>
        </Link>
        <button
          onClick={handleLogout}
          className="text-lg font-semibold text-red-500 hover:text-red-700 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Navbar;
