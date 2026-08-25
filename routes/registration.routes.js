const express = require("express");
const router = express.Router();
const controller = require("../controllers/riges.controller.js");
const { requireAuth } = require("../middleware/requireAuth.js");
const { requireRole } = require("../middleware/requireRole.js");

router.get("/" , requireAuth, requireRole('attendee') , controller.showMyReserve);
router.get("/all",requireAuth, requireRole('admin') , controller.showAllReserve );
router.post("/:id", requireAuth, requireRole('attendee'), controller.bookEvent);
router.delete("/:id",requireAuth, requireRole('attendee') , controller.cancelMyReserve);

module.exports = router;