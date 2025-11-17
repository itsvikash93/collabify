import React, { useEffect } from "react";
import Navbar from "./Navbar";

const Home = () => {
  return (
    <div className="">
      <Navbar />
      <div className="flex w-full overflow-hidden h-[92vh] flex items-center justify-center gap-4 p-4">
        <h1 className="text-2xl font-semibold">Home</h1>
      </div>
    </div>
  );
};

export default Home;
