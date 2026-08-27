const express = require("express");
const router = express.Router();
const controller = require("../controllers/event.controller.js");
const { requireAuth } = require("../middleware/requireAuth.js");
const { requireRole } = require("../middleware/requireRole.js");
const validate = require("../middleware/validation");
const {createEventRules,updateEventRules} =require("../middleware/validation.Rules.js");

router.get("/" , controller.listAllEvents);
router.get("/:id" , controller.showEvent);
router.post("/" , requireAuth , requireRole('admin'),createEventRules,validate,controller.addNewEvent);
router.patch("/:id" , requireAuth , requireRole('admin'),updateEventRules,validate,controller.editEvent);
router.delete("/:id" , requireAuth , requireRole('admin'), controller.cancelEvent);

module.exports = router;