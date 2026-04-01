const express = require("express");
const router = express.Router();
const { isLoggedIn } = require("../middlewares/auth.middleware");
const { profileController, editProfileController } = require("../controllers/user.controller");

router.get("/profile", isLoggedIn, profileController);
router.put("/profile", isLoggedIn, editProfileController);

module.exports = router;
