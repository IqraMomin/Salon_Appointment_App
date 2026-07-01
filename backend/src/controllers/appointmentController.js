const { Op } = require("sequelize");

const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const StaffProfile = require("../models/StaffProfile");
const StaffAvailability = require("../models/StaffAvailability");
const User = require("../models/User");

const generateSlots = require("../utils/slotGenerator");

const getDay = (date) => {

    return new Date(date).toLocaleDateString("en-US", {
        weekday: "long"
    });

};



const getAvailableSlots = async (req, res) => {

    try {

        const { staffProfileId, serviceId, date } = req.query;

        if (!staffProfileId || !serviceId || !date) {
            return res.status(400).json({
                success: false,
                message: "Missing required parameters."
            });
        }

        const service = await Service.findByPk(serviceId);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        const day = getDay(date);

        const availability = await StaffAvailability.findOne({
            where: {
                staffProfileId,
                dayOfWeek: day,
                isAvailable: true
            }
        });

        if (!availability) {
            return res.status(404).json({
                success: false,
                message: "Staff is not available on this day."
            });
        }

        const availableSlots = await generateSlots({
            appointmentDate: date,
            duration: service.duration,
            availability,
            staffProfileId
        });

        return res.status(200).json({
            success: true,
            availableSlots
        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({
            success: false,
            message: error.message
        });

    }

};

const bookAppointment = async (req, res) => {

    try {

        const customerId = req.user.id;

        const {
            staffProfileId,
            serviceId,
            appointmentDate,
            startTime,
            notes
        } = req.body;

        const service = await Service.findByPk(serviceId);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        const staff = await StaffProfile.findByPk(staffProfileId);

        if (!staff) {
            return res.status(404).json({
                success: false,
                message: "Staff not found."
            });
        }

        const day = getDay(appointmentDate);

        const availability = await StaffAvailability.findOne({
            where: {
                staffProfileId,
                dayOfWeek: day,
                isAvailable: true
            }
        });

        if (!availability) {
            return res.status(400).json({
                success: false,
                message: "Staff is not available on this day."
            });
        }

        const availableSlots = await generateSlots({
            appointmentDate,
            duration: service.duration,
            availability,
            staffProfileId
        });

        const selectedSlot = availableSlots.find(
            slot => slot.startTime === startTime
        );

        if (!selectedSlot) {
            return res.status(400).json({
                success: false,
                message: "Selected slot is no longer available."
            });
        }

        const appointment = await Appointment.create({

            customerId,

            staffProfileId,

            serviceId,

            appointmentDate,

            startTime: selectedSlot.startTime,

            endTime: selectedSlot.endTime,

            notes

        });

        return res.status(201).json({

            success: true,

            message: "Appointment booked successfully.",

            appointment

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


const getMyAppointments = async (req, res) => {

    try {

        const appointments = await Appointment.findAll({

            where: {
                customerId: req.user.id
            },

            include: [

                {
                    model: Service,
                    attributes: [
                        "id",
                        "serviceName",
                        "price",
                        "duration"
                    ]
                },

                {
                    model: StaffProfile,

                    include: [

                        {
                            model: User,

                            attributes: [
                                "id",
                                "name",
                                "email",
                                "phone"
                            ]
                        }

                    ]

                }

            ],

            order: [
                ["appointmentDate", "DESC"],
                ["startTime", "ASC"]
            ]

        });

        return res.status(200).json({

            success: true,

            count: appointments.length,

            appointments

        });

    } catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};


const getAppointmentById = async (req, res) => {

    try {

        const appointment = await Appointment.findByPk(
            req.params.id,
            {
                include: [

                    {
                        model: Service
                    },

                    {
                        model: User,
                        attributes: [
                            "id",
                            "name",
                            "email",
                            "phone"
                        ]
                    },

                    {
                        model: StaffProfile,

                        include: [

                            {
                                model: User,
                                attributes: [
                                    "id",
                                    "name",
                                    "email",
                                    "phone"
                                ]
                            }

                        ]

                    }

                ]
            }
        );

        if (!appointment) {

            return res.status(404).json({
                success: false,
                message: "Appointment not found."
            });

        }

        // CUSTOMER can only access their own appointment

        if (
            req.user.role === "CUSTOMER" &&
            appointment.customerId !== req.user.id
        ) {

            return res.status(403).json({
                success: false,
                message: "Access denied."
            });

        }

        // STAFF can only access appointments assigned to them

        if (req.user.role === "STAFF") {

            const staffProfile = await StaffProfile.findOne({
                where: {
                    userId: req.user.id
                }
            });

            if (
                !staffProfile ||
                appointment.staffProfileId !== staffProfile.id
            ) {

                return res.status(403).json({
                    success: false,
                    message: "Access denied."
                });

            }

        }

        return res.status(200).json({

            success: true,

            appointment

        });

    }

    catch (error) {

        console.log(error);

        return res.status(500).json({

            success: false,

            message: error.message

        });

    }

};

module.exports = {
    getAvailableSlots,
    bookAppointment,
    getMyAppointments,
    getAppointmentById
    
}