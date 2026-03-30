const express = require("express");
const router = express.Router();
const {
  getWorkspaces,
  getWorkspaceById,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
  joinWorkspace,
} = require("../controllers/workspaces.controller");
const { getWorkspaceChats } = require("../controllers/chat.controller");
const { isLoggedIn } = require("../middlewares/auth.middleware");

router.get("/", isLoggedIn, getWorkspaces);

router.get("/:id", isLoggedIn, getWorkspaceById);

router.post("/", isLoggedIn, createWorkspace);

router.put("/:id", isLoggedIn, updateWorkspace);

router.delete("/:id", isLoggedIn, deleteWorkspace);

router.post("/join/:inviteCode", isLoggedIn, joinWorkspace);

router.get("/:id/chats", isLoggedIn, getWorkspaceChats);

module.exports = router;
