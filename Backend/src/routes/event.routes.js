const express = require("express");
const router = express.Router();
const { createEvent, getEvents, getStats } = require("../controllers/event.controller");
 
router.post("/", createEvent);
router.get("/", getEvents);
router.get("/stats", getStats);

module.exports = router;