import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";


const route: Router = Router()

route.post("/register", registerUser)
route.post("/login", loginUser)

