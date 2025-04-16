const express = require("express");

const router = express.Router();

const userController = require('../Controller/UserController');

router.get("/getuser", userController.getWelcome);
router.get("/request_Otp/email/:email/send", userController.requestForOTP);
router.post("/userlogin", userController.loginUserAndPassToken);

module.exports = router;