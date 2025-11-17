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
    console.log(tokenGoogle);
    if (tokenGoogle) {
      localStorage.setItem("token", tokenGoogle.toString());
      navigate("/workspaces");
      // toast.success("Login successful");
    }
    // connectToBackend();
  }, []);
  return (
    <div className="bg-[#cfe7df]">
      {/* #F2F2F2 */}

      {/* #0F2A1D */}
      {/* #375534 */}
      {/* #6B9071 */}
      {/* #AEC3B0 */}
      {/* #E3EED4 */}

      {/* #191D23 */}
      {/* #57707A */}
      {/* #7B919C */}
      {/* #989DAA */}
      {/* #C5BAC4 */}
      {/* #DEDCDC */}
      <Routing />
    </div>
  );
};

export default App;
