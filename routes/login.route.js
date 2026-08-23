const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth-login-controller");

router.post("/" , controller.loginAuth);

module.exports = router;