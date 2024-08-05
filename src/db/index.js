import mongoose from "mongoose"
import { DB_NAME } from "../constants.js"

const connectDB = async () => {
    try {
       const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
       console.log(`\n MongoDB Connceted!! DB Host: ${connectionInstance.connection.host}`) // to determine which host we are connected to 
    } catch (error) {
       console.log("Mongodb Connection FAILED", error);
       process.exit(1);
    }
}

export default connectDB;