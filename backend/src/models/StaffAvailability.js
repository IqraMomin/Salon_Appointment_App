const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const StaffAvailability = sequelize.define("StaffAvailability", {

    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },

    dayOfWeek: {
        type: DataTypes.ENUM(
            "Monday",
            "Tuesday",
            "Wednesday",
            "Thursday",
            "Friday",
            "Saturday",
            "Sunday"
        ),
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

    isAvailable: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }

});

module.exports = StaffAvailability;