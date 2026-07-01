const express = require("express");

const router = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {
    createAvailability
} = require("../controllers/staffAvailabilityController");

router.post(
    "/",
    authentication,
    authorization("ADMIN"),
    createAvailability
);

module.exports = router;