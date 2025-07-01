import jwt from "jsonwebtoken"
import dotenv from "dotenv"
import {ObjectId} from "mongoose"

dotenv.config()

export const generateToken = (userId: ObjectId) => {
    const token = jwt.sign({userId}, process.env.JWT_SECRET as string, {
        expiresIn: "30d"
    })
    return token
}