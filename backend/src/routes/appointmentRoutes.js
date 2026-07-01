const express = require("express");

const router = express.Router();

const authentication = require("../middleware/authentication");

const {
    getAvailableSlots
} = require("../controllers/appointmentController");


router.get("/available-slots", authentication, getAvailableSlots);

module.exports = router;