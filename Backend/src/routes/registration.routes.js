const express = require("express");
const router = express.Router();
const { registerUser, cancelRegistration, getRegistrations } = require("../controllers/registration.controller");

router.get("/", getRegistrations);  
router.post("/", registerUser);
router.patch("/:id/cancel", cancelRegistration);
module.exports = router;