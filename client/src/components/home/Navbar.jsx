import React from "react";
import { Link } from "react-router-dom";
const Navbar = () => {
  return (
    <div className="w-full h-[8vh] px-6 py-2 flex justify-between gap-20 items-center bg-gray-200">
      <div className="flex items-center gap-2">
        <img src="/collabify.png" alt="logo" className="w-7" />
        <h3 className="text-2xl font-semibold">Collabify</h3>
      </div>
      <div className="flex gap-10 bg-gray-200 p-2 rounded-md">
        <Link to="/">
          <h5 className="text-lg font-semibold">Home</h5>
        </Link>
        <Link to="/dashboard">
          <h5 className="text-lg font-semibold">Dashboard</h5>
        </Link>
        <Link to="/profile">
          <h5 className="text-lg font-semibold">Profile</h5>
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
