import { Router } from "express";
import { createBlog, deleteBlog, getAllBlog, getsingleBlog, updateBlog } from "../controllers/blogController";
import { protect } from "../middleware/authMiddleware";
import { upload } from "../utils/multer";

const route: Router = Router()

route.post("/create", upload.single("image"),protect, createBlog)
route.get("/getBlogs", getAllBlog)
route.get("/singleblog/:id",protect, getsingleBlog)
route.put("/editblog/:id", upload.single("image"), protect, updateBlog)
route.delete("/delete/:id",protect, deleteBlog)

export default route