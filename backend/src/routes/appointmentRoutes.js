const express = require("express");

const router = express.Router();

const authentication = require("../middleware/authentication");

const {
    getAvailableSlots,bookAppointment,getMyAppointments,getAppointmentById
} = require("../controllers/appointmentController");


router.get("/available-slots", authentication, getAvailableSlots);
router.post(
    "/",
    authentication,
    bookAppointment
);

router.get(
    "/my",
    authentication,
    getMyAppointments
);

router.get(
    "/:id",
    authentication,
    getAppointmentById
);

module.exports = router;