const express = require("express");
const router = express.Router();
const controller = require("../controllers/message.controller.js");
const { requireAuth } = require("../middleware/requireAuth.js");
const { requireRole } = require("../middleware/requireRole.js");

router.get("/:eventId" , controller.getHistory);
router.post("/" , requireAuth , requireRole('admin') ,controller.sendMsg);

module.exports = router;