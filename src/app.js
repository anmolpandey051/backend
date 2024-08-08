import express from "express"
import cors from "cors"
import cookieParser from "cookie-parser"

// created express app
const app = express();

// configuring middleware
app.use(cors({
    origin: process.env.CORS_ORIGIN,
    credentials: true
}))

// to accept the json data
app.use(express.json({limit: "16kb"}))

// to configure express for data coming for url (%20 = space)
app.use(express.urlencoded({extended: true, limit: "16kb"}))

// to store file and folder -> public assest
app.use(express.static("public"))

// to set and get cookies
app.use(cookieParser())


// ROUTES IMPORT 
import userRouter from "./routes/user.routes.js";


// routes declaration 
app.use("/api/v1/users", userRouter) // Pasing the control to userRouter when an user goes to "/users" // http://localhost:8000/api/v1/users/register




export {app};