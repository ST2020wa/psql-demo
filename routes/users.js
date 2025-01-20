const express = require("express");
const router = express.Router();
const usersController = require("../controllers/usersController");

router.get("/usernames", usersController.getUsernames);
router.get("/create-username", usersController.createUsernameGet);
router.post("/create-username", usersController.createUsernamePost);

module.exports = router;
