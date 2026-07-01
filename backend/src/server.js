const app = require("./app");
const sequelize = require("./config/database");
require("./models"); // Loads all models and associations

async function startServer() {
    try {
        await sequelize.authenticate();
        console.log("Database Connected");

        await sequelize.sync();

        console.log("Database Synced");

        app.listen(process.env.PORT, () => {
            console.log(`Server running on ${process.env.PORT}`);
        });

    } catch (error) {
        console.log(error);
    }
}

startServer();