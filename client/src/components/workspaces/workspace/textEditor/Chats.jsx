import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { socket } from "../../../../socket/socket";
import axios from "../../../../utils/axios";
import { asyncGetUserProfile } from "../../../../store/actions/UserActions";

const Chats = () => {
  const { workspaceId } = useParams();
  const { profile } = useSelector((state) => state.userReducer);
  const dispatch = useDispatch();
  const [messages, setMessages] = useState([]);
  const [inputMessage, setInputMessage] = useState("");
  const [isFetching, setIsFetching] = useState(true);
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (!profile) {
      dispatch(asyncGetUserProfile());
    }
  }, [profile, dispatch]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Fetch initial chats
  useEffect(() => {
    const fetchChats = async () => {
      try {
        const res = await axios.get(`/workspaces/${workspaceId}/chats`);
        setMessages(res.data?.messages || []);
      } catch (error) {
        console.error("Failed to fetch chats:", error);
      } finally {
        setIsFetching(false);
      }
    };
    fetchChats();
  }, [workspaceId]);

  // Listen to socket
  useEffect(() => {
    const handleReceiveMessage = (newMessage) => {
      setMessages((prev) => [...prev, newMessage]);
    };

    socket.on("chat:receive-message", handleReceiveMessage);

    return () => {
      socket.off("chat:receive-message", handleReceiveMessage);
    };
  }, []);

  const handleSendMessage = (e) => {
    e.preventDefault();
    // Use fallback senderId if profile happens to be un-populated immediately to avoid socket crash mapping
    if (!inputMessage.trim() || (!profile?._id && !localStorage.getItem("collabifyToken"))) return;

    socket.emit("chat:send-message", {
      workspaceId,
      content: inputMessage.trim(),
      senderId: profile?._id,
    });
    
    setInputMessage("");
  };

  const getInitials = (name) => {
    if (!name) return "U";
    const parts = name.split(" ");
    if (parts.length > 1) {
      return (parts[0][0] + parts[1][0]).toUpperCase();
    }
    return parts[0][0].toUpperCase();
  };

  const getColor = (name) => {
    if (!name) return "#33d1bf";
    const colors = ["#F87171", "#FBBF24", "#34D399", "#60A5FA", "#A78BFA", "#F472B6", "#14B8A6"];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
        sum += name.charCodeAt(i);
    }
    return colors[sum % colors.length];
  };

  const renderDateLabel = (dateStr) => {
    const msgDate = new Date(dateStr);
    const today = new Date();
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    if (msgDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (msgDate.toDateString() === yesterday.toDateString()) {
      return "Yesterday";
    } else {
      const day = msgDate.getDate();
      const ordinal = (d) => {
        if (d > 3 && d < 21) return 'th';
        switch (d % 10) {
          case 1:  return "st";
          case 2:  return "nd";
          case 3:  return "rd";
          default: return "th";
        }
      };
      const month = msgDate.toLocaleString('default', { month: 'short' });
      const year = msgDate.getFullYear();
      return `${day}${ordinal(day)} ${month} ${year}`;
    }
  };

  return (
    <div className="bg-[#eef7f6] min-h-full rounded-md p-5 shadow-xl w-1/3 flex flex-col border border-[#a8e8e0]">
      <h2 className="text-xl font-bold text-[#191D23] mb-4 border-b border-[#a8e8e0] pb-2">Workspace Chat</h2>
      
      <div className="flex-1 overflow-y-auto pr-2 mb-4 flex flex-col gap-3 scrollbar-thin relative pt-2">
        {isFetching ? (
          <div className="flex justify-center items-center h-full">
            <i className="ri-loader-line text-2xl animate-spin text-[#33d1bf]"></i>
          </div>
        ) : messages.length === 0 ? (
          <div className="flex justify-center items-center h-full text-gray-500 text-sm italic">
            No messages yet. Say hi!
          </div>
        ) : (
          messages.map((msg, idx) => {
            const isMe = msg.sender?._id === profile?._id;
            const senderName = msg.sender?.name || "Unknown User";

            // Extract logic formatting headers differentiating discrete dates 
            const msgDate = new Date(msg.timestamp);
            const currentDateString = msgDate.toDateString();
            const prevMsgDateString = idx > 0 ? new Date(messages[idx - 1].timestamp).toDateString() : null;
            
            let dateSeparator = null;
            if (currentDateString !== prevMsgDateString) {
              dateSeparator = (
                <div className="flex justify-center my-4 w-full relative z-10">
                  <span className="text-[11px] font-medium text-gray-500 bg-[#e2efee] px-4 py-1 rounded-full shadow-sm border border-[#a8e8e0] shadow-[#cee8e5]">
                    {renderDateLabel(msgDate)}
                  </span>
                </div>
              );
            }

            return (
              <React.Fragment key={msg._id || idx}>
                {dateSeparator}
                <div className={`flex gap-2 ${isMe ? "flex-row-reverse" : ""}`}>
                  <div 
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-white font-bold text-xs shadow-sm mt-1"
                    style={{ backgroundColor: getColor(senderName) }}
                    title={senderName}
                  >
                    {getInitials(senderName)}
                  </div>
                  <div className={`flex flex-col gap-1 max-w-[75%] ${isMe ? "items-end" : "items-start"}`}>
                    <span className="text-[10px] text-gray-400 px-1 font-medium tracking-wide">
                      {senderName} • {msgDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                    <div className={`px-3 py-2 rounded-xl text-sm shadow-sm whitespace-pre-wrap break-words w-full ${isMe ? "bg-[#33d1bf] text-white rounded-tr-none" : "bg-white text-[#191D23] rounded-tl-none border border-[#e2e8f0]"}`}>
                      {msg.content}
                    </div>
                  </div>
                </div>
              </React.Fragment>
            );
          })
        )}
        <div ref={messagesEndRef} />
      </div>

      <form onSubmit={handleSendMessage} className="flex gap-2 mt-auto pt-4 border-t border-[#a8e8e0]">
        <input
          type="text"
          value={inputMessage}
          onChange={(e) => setInputMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1 px-3 py-2 text-sm bg-white text-[#191D23] border border-[#a8e8e0] rounded-lg outline-none focus:border-[#33d1bf] transition-colors shadow-inner"
        />
        <button
          type="submit"
          disabled={!inputMessage.trim()}
          className="px-3 py-2 bg-[#33d1bf] text-white rounded-lg hover:bg-[#2bb4a4] transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center shadow-md"
        >
          <i className="ri-send-plane-fill"></i>
        </button>
      </form>
    </div>
  );
};

export default Chats;
