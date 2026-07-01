const express = require("express");

const router = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {

    createService,

    getAllServices,

    getServiceById,

    updateService,

    deleteService

} = require("../controllers/serviceController");

router.get("/", getAllServices);

router.get("/:id", getServiceById);

router.post(
    "/",
    authentication,
    authorization("ADMIN"),
    createService
);

router.put(
    "/:id",
    authentication,
    authorization("ADMIN"),
    updateService
);

router.delete(
    "/:id",
    authentication,
    authorization("ADMIN"),
    deleteService
);

module.exports = router;