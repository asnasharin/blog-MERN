import express, { Express } from "express";
import connectDB from "./config/db";
import dotenv from "dotenv"

dotenv.config()
const app = express()

connectDB()

const port = process.env.PORT

app.listen(port, () => {
    console.log("server running")
})