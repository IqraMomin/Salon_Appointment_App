const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const StaffService = sequelize.define(
    "StaffService",
    {},
    {
        timestamps: false
    }
);

module.exports = StaffService;