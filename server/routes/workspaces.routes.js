const express = require("express");
const router = express.Router();
const {
  getWorkspaces,
  getWorkspaceById,
  createWorkspace,
  updateWorkspace,
  deleteWorkspace,
} = require("../controllers/workspaces.controller");
// const { isLoggedIn } = require("../middlewares/auth.middleware");

router.get("/", getWorkspaces);

router.get("/:id", getWorkspaceById);

router.post("/", createWorkspace);

router.put("/:id", updateWorkspace);

router.delete("/:id", deleteWorkspace);

module.exports = router;
