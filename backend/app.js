const express = require("express");
const cors = require("cors");
const app = express();
require("dotenv").config();
const userRoutes = require("./routes/userRoutes");
app.use(express.json());
app.use(cors());
app.use("/users",userRoutes);



module.exports = app