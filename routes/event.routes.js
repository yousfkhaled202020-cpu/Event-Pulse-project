const express = require("express");
const router = express.Router();
const controller = require("../controllers/event.controller.js");
const { requireAuth } = require("../middleware/requireAuth.js");
const { requireRole } = require("../middleware/requireRole.js");

router.get("/" , controller.listAllEvents);
router.get("/:id" , controller.showEvent);
router.post("/" , requireAuth , requireRole('admin'), controller.addNewEvent);
router.patch("/:id" , requireAuth , requireRole('admin'), controller.editEvent);
router.delete("/:id" , requireAuth , requireRole('admin'), controller.cancelEvent);

module.exports = router;