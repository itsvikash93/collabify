import React from "react";
import Navbar from "./components/home/Navbar";
import Routing from "./utils/Routing";
import axios from "./utils/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
const App = () => {
  const navigate = useNavigate();
  const connectToBackend = async () => {
    const response = await axios.get("/");
    console.log(response);
  };
  useEffect(() => {
    const tokenGoogle = new URLSearchParams(window.location.search).get(
      "token"
    );
    if (tokenGoogle) {
      toast.success("Login successful");
      localStorage.setItem("token", tokenGoogle.toString());
      navigate("/");
    }
    // connectToBackend();
  }, []);
  return (
    <div className="bg-[#F2F2F2]">
      <Routing />
    </div>
  );
};

export default App;
