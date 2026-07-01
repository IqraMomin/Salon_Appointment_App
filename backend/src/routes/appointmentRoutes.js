const express = require("express");

const router = express.Router();

const authentication = require("../middleware/authentication");

const {
    getAvailableSlots,bookAppointment
} = require("../controllers/appointmentController");


router.get("/available-slots", authentication, getAvailableSlots);
router.post(
    "/",
    authentication,
    bookAppointment
);

module.exports = router;