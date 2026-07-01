const Appointment = require("../models/Appointment");
const Service = require("../models/Service");
const StaffAvailability = require("../models/StaffAvailability");
const { Op } = require("sequelize");


const getDay = (date) => {

    return new Date(date).toLocaleDateString("en-US", {
        weekday: "long"
    });

};

const timeToMinutes = (time) => {

    const [hours, minutes] = time.split(":").map(Number);

    return hours * 60 + minutes;

};

const minutesToTime = (minutes) => {

    const hours = Math.floor(minutes / 60);

    const mins = minutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;

};

const getAvailableSlots = async (req, res) => {

    try {

        const {
            staffProfileId,
            serviceId,
            date
        } = req.query;

        if (!staffProfileId || !serviceId || !date) {
            return res.status(400).json({
                success: false,
                message: "Missing required parameters."
            });
        }

        // Get service
        const service = await Service.findByPk(serviceId);

        if (!service) {
            return res.status(404).json({
                success: false,
                message: "Service not found."
            });
        }

        const duration = service.duration;

        // Determine day of week
        const day = getDay(date);

        // Get staff schedule
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
                message: "Staff not available."
            });
        }

        // Existing bookings
        const appointments = await Appointment.findAll({
            where: {
                staffProfileId,
                appointmentDate: date,
                status: {
                    [Op.not]: "CANCELLED"
                }
            }
        });

        const booked = appointments.map(a => ({
            start: timeToMinutes(a.startTime),
            end: timeToMinutes(a.endTime)
        }));

        const slots = [];

        let current = timeToMinutes(availability.startTime);
        const closing = timeToMinutes(availability.endTime);

        while (current + duration <= closing) {

            const end = current + duration;

            const overlap = booked.some(slot =>
                current < slot.end &&
                end > slot.start
            );

            if (!overlap) {
                slots.push({
                    startTime: minutesToTime(current),
                    endTime: minutesToTime(end)
                });
            }

            current += duration;
        }

        res.status(200).json({
            success: true,
            availableSlots: slots
        });

    } catch (error) {

        console.log(error);

        res.status(500).json({
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

        // Check service
        const service = await Service.findByPk(serviceId);

        if (!service) {

            return res.status(404).json({

                success: false,

                message: "Service not found."

            });

        }

        // Check staff
        const staff = await StaffProfile.findByPk(staffProfileId);

        if (!staff) {

            return res.status(404).json({

                success: false,

                message: "Staff not found."

            });

        }

        // Calculate End Time
        const duration = service.duration;

        const startMinutes = timeToMinutes(startTime);

        const endMinutes = startMinutes + duration;

        const endTime = minutesToTime(endMinutes);

        // Check overlapping appointments
        const existingAppointments = await Appointment.findAll({
            where: {
                staffProfileId,
                appointmentDate,
                status: {
                    [Op.notIn]: ["CANCELLED"]
                }
            }
        });

        for (const appointment of existingAppointments) {

            const bookedStart = timeToMinutes(appointment.startTime);
        
            const bookedEnd = timeToMinutes(appointment.endTime);
        
            const overlap =
                startMinutes < bookedEnd &&
                endMinutes > bookedStart;
        
            if (overlap) {
                return res.status(400).json({
                    success: false,
                    message: "Selected slot is already booked."
                });
            }
        
        }

        const appointment = await Appointment.create({

            customerId,

            staffProfileId,

            serviceId,

            appointmentDate,

            startTime,

            endTime,

            notes

        });

        res.status(201).json({

            success: true,

            message: "Appointment booked successfully.",

            appointment

        });

    }

    catch (error) {

        console.log(error);

        res.status(500).json({

            success: false,

            message: error.message

        });

    }

}

module.exports = {
    getAvailableSlots,
    bookAppointment
}