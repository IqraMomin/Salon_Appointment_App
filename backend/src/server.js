const app = require("./app");
const sequelize = require("./config/db-connection");

const startServer = async()=>{
    try{
    await sequelize.authenticate();
    console.log("Database Connected");
    await sequelize.sync({alter:true});
    console.log("Models Synchronized");
    app.listen(process.env.PORT,()=>{
        console.log(`Server is Up and Running on port ${process.env.PORT}`)
    });
}catch(err){
    console.log(err);
}
}

startServer();


