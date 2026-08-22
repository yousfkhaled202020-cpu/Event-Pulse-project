const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth-register-controller");

router.post("/" , controller.regisAuth);


module.exports = router ;