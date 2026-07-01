const StaffAvailability = require("../models/StaffAvailability");
const StaffProfile = require("../models/StaffProfile");

const createAvailability = async (req, res) => {

    try {

        const {
            staffProfileId,
            dayOfWeek,
            startTime,
            endTime,
            isAvailable
        } = req.body;

        const staff = await StaffProfile.findByPk(staffProfileId);

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found."
            });
        }

        const availability = await StaffAvailability.create({
            staffProfileId,
            dayOfWeek,
            startTime,
            endTime,
            isAvailable
        });

        res.status(201).json({
            success: true,
            availability
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

module.exports = {
    createAvailability
};