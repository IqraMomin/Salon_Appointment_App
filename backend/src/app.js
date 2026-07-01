const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
app.use(express.json());
app.use(cors({
    origin:"http://localhost:5173",
    credentials:true
}));
app.use("/users",userRoutes);



module.exports = app