//require('dotenv').config({path: './env'})

import dotenv from "dotenv";
import connectDB from "./db/index.js"
import {app} from "./app.js"

dotenv.config({
    path: './.env'
})

// handling success and error while connecting datatbase, connectDB returns a promise
connectDB ()
.then(() => {
    app.listen(process.env.PORT || 8000, () => {
        console.log(`Server is running at port : ${process.env.PORT} `);
    })
})
.catch((error) => {
    console.log("MongoDB Connection failed ", error)
})



// import express from "express"

// const app = express();

// ( async () => {
//     try {
//         await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`) // DB_NAME = "myDataBase"
//         app.on("error", (error)=> {
//             console.log("ERROR", error);
//             throw error;
//         })

//         app.listen(process.env.PORT, () => {
//             console.log("App is listening on port" + process.env.PORT )
//         })

//     } catch (error) {
//         console.log("ERROR: ", error);
//         throw error;
//     }
// }) ()