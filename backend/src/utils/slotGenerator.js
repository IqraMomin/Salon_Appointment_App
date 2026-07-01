const { Op } = require("sequelize");
const Appointment = require("../models/Appointment");

const timeToMinutes = (time) => {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
};

const minutesToTime = (minutes) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;

    return `${String(hours).padStart(2, "0")}:${String(mins).padStart(2, "0")}`;
};

const generateSlots = async ({
    appointmentDate,
    duration,
    availability,
    staffProfileId,
    interval = 15
}) => {

    const appointments = await Appointment.findAll({
        where: {
            staffProfileId,
            appointmentDate,
            status: {
                [Op.notIn]: ["CANCELLED"]
            }
        }
    });

    const bookedSlots = appointments.map((appointment) => ({
        start: timeToMinutes(appointment.startTime),
        end: timeToMinutes(appointment.endTime)
    }));

    const availableSlots = [];

    let current = timeToMinutes(availability.startTime);
    const closing = timeToMinutes(availability.endTime);

    while (current + duration <= closing) {

        const end = current + duration;

        const overlap = bookedSlots.some(slot =>
            current < slot.end &&
            end > slot.start
        );

        if (!overlap) {
            availableSlots.push({
                startTime: minutesToTime(current),
                endTime: minutesToTime(end)
            });
        }

        current += interval;
    }

    return availableSlots;
};

module.exports = generateSlots;