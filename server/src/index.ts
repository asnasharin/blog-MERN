import express, { Express } from "express";
import cors from "cors"
import morgan from "morgan"
import connectDB from "./config/db";
import authroutes from "./routes/authRoutes"
import { notFound, errorHandler } from "./middleware/errorMiddleware"
import dotenv from "dotenv"

dotenv.config()
const app = express()

connectDB()

const port = process.env.PORT

app.use(express.json())
app.use(cors())
process.env.NODE_ENV === "development" && app.use(morgan("dev"))
app.use('/api', authroutes)

app.use("*", notFound)
app.use(errorHandler)

app.listen(port, () => {
    console.log("server running")
})