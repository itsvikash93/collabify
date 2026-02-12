import React, { useEffect, useRef } from "react";
import { connectWS } from "./ws";

const RealTimeEditor = () => {
  const socket = useRef(null);
  
  useEffect(() => {
    socket.current = connectWS();
  }, []);
  return <div className="bg-[#eef7f6]">RealTimeEditor</div>;
};

export default RealTimeEditor;
