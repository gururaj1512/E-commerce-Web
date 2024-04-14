const app = require("./app");
const connectDatabase = require('./config/database')

const dotenv = require('dotenv')
dotenv.config({path: "backend/config/config.env"})

// Handling uncaught exception
process.on("uncaughtException", err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to uncaught exception`);
    process.exit(1) 
})


connectDatabase()

const server = app.listen(process.env.PORT, ()=>{
    console.log(`App is working on http://localhost:${process.env.PORT}`)
})

// Unhandled rejections
process.on("unhandledRejection", err=>{
    console.log(`Error: ${err.message}`);
    console.log(`Shutting down the server due to unhandled promise rejections`);

    server.close(()=>{
        process.exit(1)
    })
})