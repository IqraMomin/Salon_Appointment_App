const User = require("./User");
const Service = require("./Service");
const StaffProfile = require("./StaffProfile");
const StaffAvailability = require("./StaffAvailability");
const StaffService = require("./StaffService");
const Appointment =require("./Appointment");

/* User ↔ StaffProfile */

User.hasOne(StaffProfile, {
    foreignKey: "userId",
    onDelete: "CASCADE"
});

StaffProfile.belongsTo(User, {
    foreignKey: "userId"
});

/* Staff ↔ Availability */

StaffProfile.hasMany(StaffAvailability, {
    foreignKey: "staffProfileId",
    onDelete: "CASCADE"
});

StaffAvailability.belongsTo(StaffProfile, {
    foreignKey: "staffProfileId"
});

/* Staff ↔ Service */

StaffProfile.belongsToMany(Service, {
    through: StaffService,
    foreignKey: "staffProfileId"
});

Service.belongsToMany(StaffProfile, {
    through: StaffService,
    foreignKey: "serviceId"
});

/* Appointment */

User.hasMany(Appointment, {
    foreignKey: "customerId"
});

Appointment.belongsTo(User, {
    foreignKey: "customerId"
});

StaffProfile.hasMany(Appointment, {
    foreignKey: "staffProfileId"
});

Appointment.belongsTo(StaffProfile, {
    foreignKey: "staffProfileId"
});

Service.hasMany(Appointment, {
    foreignKey: "serviceId"
});

Appointment.belongsTo(Service, {
    foreignKey: "serviceId"
});

module.exports = {
    User,
    Service,
    StaffProfile,
    StaffAvailability,
    StaffService,
    Appointment
};