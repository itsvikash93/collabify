const express = require("express");
const router = express.Router({ mergeParams: true });
const { getActivities } = require("../controllers/activity.controller");

router.get("/", getActivities);

module.exports = router;
