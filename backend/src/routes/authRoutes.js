const express = require("express");

const router = express.Router();
const authentication = require("../middleware/authentication");

const {
    register,
    login,profile
} = require("../controllers/authController");

router.post("/register", register);

router.post("/login", login);

router.get("/profile", authentication, profile);

module.exports = router;