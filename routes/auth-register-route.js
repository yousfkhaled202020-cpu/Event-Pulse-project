const express = require("express");
const router = express.Router();
const controller = require("../controllers/auth-register-controller");
const validate = require("../middleware/validation");
const {registerRules} =require("../middleware/validationRules");

router.post("/" , registerRules,validate,controller.regisAuth);


module.exports = router ;