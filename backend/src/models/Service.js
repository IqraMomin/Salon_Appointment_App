const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Service = sequelize.define(
    "Service",
    {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },

        serviceName: {
            type: DataTypes.STRING,
            allowNull: false
        },

        description: {
            type: DataTypes.TEXT,
            allowNull: false
        },

        duration: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        price: {
            type: DataTypes.DECIMAL(10,2),
            allowNull: false
        },

        category: {
            type: DataTypes.ENUM(
                "Hair",
                "Facial",
                "Makeup",
                "Spa",
                "Nails"
            ),
            allowNull: false
        },

        image: {
            type: DataTypes.STRING,
            defaultValue: ""
        },

        isAvailable: {
            type: DataTypes.BOOLEAN,
            defaultValue: true
        }
    },
    {
        timestamps: true
    }
);

module.exports = Service;