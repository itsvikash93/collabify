const express = require("express");
const app = express();
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const passport = require("passport");
const expressSession = require("express-session");
const googleStrategy = require("./config/googleStrategy");
const connectDB = require("./config/mongodb");

dotenv.config();
app.use(
  cors({
    origin: "https://collabify-bice.vercel.app",
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(
  expressSession({
    secret: process.env.EXPRESS_SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());

connectDB();
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const taskRoutes = require("./routes/tasks.routes");
const workspaceRoutes = require("./routes/workspaces.routes");
app.get("/api/", (req, res) => {
  res.send("Collabify Backend is running!");
});

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
app.use("/api/workspaces/:workspaceId/tasks", taskRoutes);
app.use("/api/workspaces", workspaceRoutes);

app.listen(process.env.PORT || 3000);
