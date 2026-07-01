const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const StaffProfile = sequelize.define(
    "StaffProfile",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        specialization: {
            type: DataTypes.STRING,
            allowNull: false
        },

        experience: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        bio: {
            type: DataTypes.TEXT
        },

        status: {
            type: DataTypes.ENUM("ACTIVE", "INACTIVE"),
            defaultValue: "ACTIVE"
        }
    },
    {
        timestamps: true
    }
);

module.exports = StaffProfile;