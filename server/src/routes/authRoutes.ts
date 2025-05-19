import { Router } from "express";
import { loginUser, registerUser } from "../controllers/authController";
import blogroute from "./blogRoutes"

const route: Router = Router()

route.post("/register", registerUser)
route.post("/login", loginUser)
route.use("/blog", blogroute)

export default route

