import mongoose from "mongoose";
import dotenv from "dotenv"

dotenv.config()

const mongourl = process.env.MONGO_URI as string

const connectDB = async () => {      
    try {
        await mongoose.connect(mongourl)
        console.log("mongodb connected")
    } catch (error) {
        console.error("error in connecting database", error)
        process.exit(1)
    }
}


export default connectDB;