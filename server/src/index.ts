import express, { Express } from "express";
import cors from "cors"
import morgan from "morgan"
import connectDB from "./config/db";
import authroutes from "./routes/authRoutes"
import { errorHandler } from "./middleware/errorMiddleware"
import dotenv from "dotenv"

dotenv.config()
const app = express()

connectDB()

const port = process.env.PORT

app.use(express.json())

const corsConfig = {
  origin: 
    process.env.ENVIRONMENT === "development"
      ? process.env.FRONTENT_URL
      : process.env.FRONTENT_URL_DEPLOYED,
  credentials: true,
}

app.use(cors(corsConfig))
process.env.ENVIRONMENT === "development" && app.use(morgan("dev"))
app.use('/api', authroutes)

app.use(errorHandler)

app.listen(port, () => {
    console.log("server running")
})