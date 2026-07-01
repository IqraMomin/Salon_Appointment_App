const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

const authRoutes = require("./routes/authRoutes");
const serviceRoutes = require("./routes/serviceRoutes");
const staffRoutes=require("./routes/staffRoutes");

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}));

app.use("/api/auth", authRoutes);
app.use("/api/services", serviceRoutes);
app.use("/api/staff",staffRoutes);


app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Salon Appointment API Running..."
    });
});

module.exports = app;