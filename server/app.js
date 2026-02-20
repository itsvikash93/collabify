const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const expressSession = require("express-session");
const googleStrategy = require("./config/googleStrategy");
const connectDB = require("./config/mongodb");
const { Server } = require("socket.io");
const { createServer } = require("http");

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

dotenv.config();
app.use(
  cors({
    origin: "http://localhost:5173",
    // origin: "https://collabify-bice.vercel.app",
    credentials: true,
  }),
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  }),
);
app.use(passport.initialize());
app.use(passport.session());

connectDB();
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const taskRoutes = require("./routes/tasks.routes");
const workspaceRoutes = require("./routes/workspaces.routes");
const editorRoutes = require("./routes/editor.routes");

app.get("/", (req, res) => {
  res.status(200).json({ message: "Collabify Backend is running!" });
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/workspaces/:workspaceId/tasks", taskRoutes);
app.use("/api/workspaces", workspaceRoutes);
app.use("/api/editor", editorRoutes);

// io.on("connection", (socket) => {
//   console.log("A user is connected", socket.id);
//   socket.on("disconnect", () => {
//     console.log("A user is disconnected", socket.id);
//   });
// });

const initializeSockets = require("./sockets");
initializeSockets(io);

// app.listen(process.env.PORT || 3000);

server.listen(3000);
