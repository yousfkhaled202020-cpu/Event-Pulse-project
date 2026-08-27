const express = require("express");
const router = express.Router();
const controller = require("../controllers/riges.controller.js");
const { requireAuth } = require("../middleware/requireAuth.js");
const { requireRole } = require("../middleware/requireRole.js");
const validate = require("../middleware/validation");
const {registrationRules} = require("../middleware/validation.Rules.js");

router.get("/" , requireAuth, requireRole('attendee') , controller.showMyReserve);
router.get("/all",requireAuth, requireRole('admin') , controller.showAllReserve );
router.post("/:id",requireAuth, requireRole('attendee'),registrationRules,validate, controller.bookEvent);
router.delete("/:id",requireAuth, requireRole('attendee') , controller.cancelMyReserve);

module.exports = router;