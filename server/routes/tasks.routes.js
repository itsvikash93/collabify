const express = require("express");
const router = express.Router({ mergeParams: true });
const {
  getTasks,
  createTask,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/tasks.controller");

router.get("/", getTasks);
router.post("/", createTask);
router.get("/:taskId", getTaskById);
router.put("/:taskId", updateTask);
router.delete("/:taskId", deleteTask);

module.exports = router;
