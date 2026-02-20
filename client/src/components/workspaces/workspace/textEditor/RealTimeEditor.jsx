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

Quill.register("modules/cursors", QuillCursors);

const RealTimeEditor = () => {
  const { workspaceId } = useParams();
  const editorRef = useRef(null);
  const quillRef = useRef(null);

  useEffect(() => {
    if (!editorRef.current) return;

    const toolbarOptions = [
      ["bold", "italic", "underline", "strike"], // toggled buttons
      ["blockquote", "code-block"],
      ["link", "image", "video", "formula"],

      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
      [{ script: "sub" }, { script: "super" }], // superscript/subscript
      [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
      [{ direction: "rtl" }], // text direction

      [{ size: ["small", false, "large", "huge"] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ["clean"], // remove formatting button
    ];

    const quill = new Quill(editorRef.current, {
      theme: "snow",
      modules: {
        cursors: true,
        toolbar: toolbarOptions,
      },
      placeholder: "Start collaborating...",
    });

    quill.disable(); // disable until ready
    quill.setText("Loading...");

    quillRef.current = quill;

    const cursors = quill.getModule("cursors");

    // 🔥 SEND CHANGES
    quill.on("text-change", (delta, oldDelta, source) => {
      if (source !== "user") return; // prevent loop

      socket.emit("editor:send-changes", {
        workspaceId,
        delta,
      });
    });

    // 🔥 RECEIVE CHANGES
    socket.on("editor:receive-changes", (delta) => {
      quill.updateContents(delta);
    });

    // 🔥 CURSOR SEND
    quill.on("selection-change", (range) => {
      if (range) {
        socket.emit("editor:cursor-move", {
          workspaceId,
          userId: socket.id,
          range,
        });
      }
    });

    // 🔥 CURSOR RECEIVE
    socket.on("editor:receive-cursor", ({ userId, range }) => {
      if (!range) return;

      cursors.createCursor(userId, `User`, "#3b82f6");
      cursors.moveCursor(userId, range);
    });

    quill.enable();
    quill.setText("");

    return () => {
      socket.off("editor:receive-changes");
      socket.off("editor:receive-cursor");
    };
  }, [workspaceId]);

  return (
    <div className="bg-white min-h-full rounded-md shadow-xl flex-1 overflow-hidden">
      <div ref={editorRef} className="h-full w-full overflow-hidden" />
    </div>
  );
};

export default RealTimeEditor;
