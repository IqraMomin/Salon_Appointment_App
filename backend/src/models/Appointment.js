const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Appointment = sequelize.define(
    "Appointment",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        appointmentDate: {
            type: DataTypes.DATEONLY,
            allowNull: false
        },

        startTime: {
            type: DataTypes.TIME,
            allowNull: false
        },

        endTime: {
            type: DataTypes.TIME,
            allowNull: false
        },

        status: {
            type: DataTypes.ENUM(
                "BOOKED",
                "COMPLETED",
                "CANCELLED",
                "RESCHEDULED"
            ),
            defaultValue: "BOOKED"
        },

        notes: {
            type: DataTypes.TEXT
        }
    },
    {
        timestamps: true
    }
);

module.exports = Appointment;