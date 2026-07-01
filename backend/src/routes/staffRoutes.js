const express = require("express");

const router = express.Router();

const authentication = require("../middleware/authentication");
const authorization = require("../middleware/authorization");

const {

    createStaff,getAllStaff,getStaffById,updateStaff,deleteStaff,assignServices

}=require("../controllers/staffController");

router.post(

    "/",

    authentication,

    authorization("ADMIN"),

    createStaff

);

router.get("/", getAllStaff);

router.get("/:id", getStaffById);

router.put(
    "/:id",
    authentication,
    authorization("ADMIN"),
    updateStaff
);

router.delete(
    "/:id",
    authentication,
    authorization("ADMIN"),
    deleteStaff
);

router.post(
    "/assign-services",
    authentication,
    authorization("ADMIN"),
    assignServices
);

module.exports=router;