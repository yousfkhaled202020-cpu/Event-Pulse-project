const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth-login-controller");
const validate = require("../middleware/validation");
const {loginRules} =require("../middleware/validation.Rules");

router.post("/" , loginRules,validate,controller.loginAuth);

module.exports = router;