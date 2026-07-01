const app = require("./app");
const sequelize = require("./config/database");
const path = require("path");

require("dotenv").config({
  path: path.join(__dirname, "../.env"),
});

const User = require("./models/User");
const Service = require("./models/Service");
const StaffProfile = require("./models/StaffProfile");
const StaffService = require("./models/StaffService");
const Appointment = require("./models/Appointment");

User.hasOne(StaffProfile,{
    foreignKey:"userId"
});

StaffProfile.belongsTo(User,{
    foreignKey:"userId"
});

StaffProfile.belongsToMany(Service, {
    through: StaffService,
    foreignKey: "staffProfileId"
});

Service.belongsToMany(StaffProfile, {
    through: StaffService,
    foreignKey: "serviceId"
});

User.hasMany(Appointment,{
    foreignKey:"customerId"
});

Appointment.belongsTo(User,{
    foreignKey:"customerId"
});

StaffProfile.hasMany(Appointment,{
    foreignKey:"staffProfileId"
});

Appointment.belongsTo(StaffProfile,{
    foreignKey:"staffProfileId"
});

Service.hasMany(Appointment,{
    foreignKey:"serviceId"
});

Appointment.belongsTo(Service,{
    foreignKey:"serviceId"
});

const PORT = process.env.PORT || 5000;


async function startServer() {
    try {

        await sequelize.authenticate();
        console.log("Database Connected Successfully.");

        await sequelize.sync();

        console.log("Database Synced.");

        app.listen(PORT, () => {
            console.log(`Server running on port ${PORT}`);
        });

    } catch (error) {
        console.log(error);
    }
}

startServer();