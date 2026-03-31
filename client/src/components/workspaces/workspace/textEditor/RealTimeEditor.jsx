// import React, { useEffect, useRef } from "react";
// import Quill from "quill";
// import QuillCursors from "quill-cursors";
// import { socket } from "../../../../socket/socket";
// import { useParams } from "react-router-dom";
// import "quill/dist/quill.snow.css";

// Quill.register("modules/cursors", QuillCursors);

// const RealTimeEditor = () => {
//   const { workspaceId } = useParams();
//   const editorRef = useRef(null);
//   const quillRef = useRef(null);

//   useEffect(() => {
//     if (editorRef.current) {
//       const toolbarOptions = [
//         ["bold", "italic", "underline", "strike"], // toggled buttons
//         ["blockquote", "code-block"],
//         ["link", "image", "video", "formula"],

//         [{ header: 1 }, { header: 2 }], // custom button values
//         [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
//         [{ script: "sub" }, { script: "super" }], // superscript/subscript
//         [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
//         [{ direction: "rtl" }], // text direction

//         [{ size: ["small", false, "large", "huge"] }], // custom dropdown
//         [{ header: [1, 2, 3, 4, 5, 6, false] }],

//         [{ color: [] }, { background: [] }], // dropdown with defaults from theme
//         [{ font: [] }],
//         [{ align: [] }],

//         ["clean"], // remove formatting button
//       ];

//       quillRef.current = new Quill(editorRef.current, {
//         theme: "snow",
//         modules: {
//           cursors: true,
//           toolbar: toolbarOptions,
//         },
//         placeholder: "Start collaborating...",
//       });

//       const quill = quillRef.current;
//       const cursors = quill.getModule("cursors");

//       // 🔥 Send cursor movement
//       quill.on("selection-change", (range) => {
//         if (range) {
//           console.log("Cursor moved:", range);
//           socket.emit("editor:cursor-move", {
//             workspaceId,
//             userId: socket.id,
//             range,
//           });
//         }
//       });

//       // 🔥 Receive cursor movement
//       socket.on("editor:receive-cursor", ({ userId, range }) => {
//         if (!range) return;

//         cursors.createCursor(userId, `User ${userId.slice(0, 4)}`, "blue");
//         cursors.moveCursor(userId, range);
//       });
//     }

//     return () => {
//       socket.off("editor:receive-cursor");
//     };
//   }, [workspaceId]);

//   return (
//     <div className="bg-[#eef7f6] min-h-full overflow-auto rounded-md p-5 shadow-xl w-2/3">
//       <div ref={editorRef} className="h-full w-full" />
//     </div>
//   );
// };

// export default RealTimeEditor;

import React, { useEffect, useRef } from "react";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import "quill/dist/quill.snow.css";
import { socket } from "../../../../socket/socket";
import { useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "../../../../utils/axios";

Quill.register("modules/cursors", QuillCursors);

// Vibrant modern colors for different users
const cursorColors = [
  "#2bb4a4", "#f56565", "#ed8936", "#ecc94b", 
  "#48bb78", "#4299e1", "#9f7aea", "#ed64a6",
  "#667eea", "#f687b3", "#4fd1c5", "#f6ad55"
];

const getColor = (str) => {
  let hash = 0;
  if (!str) return cursorColors[0];
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  return cursorColors[Math.abs(hash) % cursorColors.length];
};

const RealTimeEditor = () => {
  const { workspaceId } = useParams();
  const editorRef = useRef(null);
  const quillRef = useRef(null);
  const activeCursors = useRef(new Set());

  // Setup User Information
  const userProfile = useSelector((state) => state.userReducer.profile);
  const userNameRef = useRef(userProfile?.name || "User");
  const userIdRef = useRef(userProfile?._id || "anonymous");

  useEffect(() => {
    userNameRef.current = userProfile?.name || "User";
    userIdRef.current = userProfile?._id || socket.id;
  }, [userProfile]);

  useEffect(() => {
    if (!editorRef.current) return;
    
    // Clear out strict-mode duplicated children safely
    editorRef.current.innerHTML = "";
    activeCursors.current.clear();

    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"],
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],
      [{ header: 1 }, { header: 2 }],
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }],
      [{ indent: "-1" }, { indent: "+1" }],
      [{ direction: "rtl" }],
      [{ size: ["small", false, "large", "huge"] }],
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ color: [] }, { background: [] }],
      [{ font: [] }],
      [{ align: [] }],
      ["clean"],
    ];

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        cursors: {
          transformOnTextChange: true,
        },
        toolbar: toolbarOptions,
      },
      placeholder: "Start collaborating...",
    });

    quill.disable(); // disable until ready
    quill.setText("Loading...");

    quillRef.current = quill;
    const cursors = quill.getModule("cursors");

    // Fetch initial document
    let saveTimeout;
    axios
      .get(`/editor/${workspaceId}`)
      .then((res) => {
        quill.enable();
        if (res.data && res.data.content) {
          try {
            quill.setContents(JSON.parse(res.data.content));
          } catch (e) {
            quill.setText(res.data.content);
          }
        } else {
          quill.setText("");
        }
      })
      .catch((err) => {
        console.error("Failed to load document", err);
        quill.enable();
        quill.setText("");
      });

    // 🔥 SEND CHANGES & AUTO-SAVE
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source !== "user") return; // prevent loop

      socket.emit("editor:send-changes", {
        workspaceId,
        delta,
      });

      // Debounce auto-save
      clearTimeout(saveTimeout);
      saveTimeout = setTimeout(() => {
        const content = JSON.stringify(quill.getContents());
        axios.put(`/editor/${workspaceId}`, { content }).catch(console.error);
      }, 2000);
    });

    // 🔥 RECEIVE CHANGES
    const receiveChangesHandler = (delta) => {
      quill.updateContents(delta);
    };
    socket.on("editor:receive-changes", receiveChangesHandler);

    // 🔥 CURSOR SEND
    quill.on("selection-change", (range, oldRange, source) => {
      if (source !== "user") return;
      socket.emit("editor:cursor-move", {
        workspaceId,
        userId: userIdRef.current,
        userName: userNameRef.current,
        range,
      });
    });

    // 🔥 CURSOR RECEIVE
    const receiveCursorHandler = ({ userId, userName, range }) => {
      // Ignore echoing our own cursor if we mistakenly get it somehow
      if (userId === userIdRef.current) return;

      // Remove cursor if range is null (no focus)
      if (!range) {
        cursors.removeCursor(userId);
        activeCursors.current.delete(userId);
        return;
      }

      // Create once per user
      if (!activeCursors.current.has(userId)) {
        cursors.createCursor(userId, userName || `User`, getColor(userId));
        activeCursors.current.add(userId);
      }
      
      cursors.moveCursor(userId, range);
    };
    
    socket.on("editor:receive-cursor", receiveCursorHandler);

    return () => {
      // Remove our own ghost cursor from others' screens when we unmount/refresh
      socket.emit("editor:cursor-move", {
        workspaceId,
        userId: userIdRef.current,
        userName: userNameRef.current,
        range: null,
      });

      clearTimeout(saveTimeout);
      socket.off("editor:receive-changes", receiveChangesHandler);
      socket.off("editor:receive-cursor", receiveCursorHandler);
    };
  }, [workspaceId]);

  return (
    <>
      <style>{`
        .ql-cursor-flag {
          display: block !important;
          visibility: visible !important;
          opacity: 1 !important;
          /* Inherit color injected by quill-cursors */
          color: white !important;
          border-radius: 12px !important;
          border-bottom-left-radius: 2px !important;
          padding: 3px 10px !important;
          font-weight: 500 !important;
          font-size: 13px !important;
          white-space: nowrap;
          z-index: 10;
        }
        .ql-cursor-name {
          color: white !important;
        }
        /* Caret background color natively injected by module */
      `}</style>
      <div className="bg-white min-h-full flex-1 overflow-hidden flex flex-col rounded-md shadow-xl">
        <div ref={editorRef} className="flex-1 w-full overflow-hidden" />
      </div>
    </>
  );
};

export default RealTimeEditor;
