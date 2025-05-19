import { Router } from "express";
import { createBlog, deleteBlog, getAllBlog, getsingleBlog, updateBlog } from "../controllers/blogController";
import { protect } from "../middleware/authMiddleware";

const route: Router = Router()

route.post("/create",protect, createBlog)
route.get("/getBlogs", getAllBlog)
route.get("/singleblog/:id",protect, getsingleBlog)
route.put("/editblog/:id",protect, updateBlog)
route.delete("/delete/:id",protect, deleteBlog)

export default route