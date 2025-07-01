import { NextFunction, Request, Response } from "express"
import asyncHandler from "express-async-handler"
import blog from "../models/blogModel"


export const createBlog = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { title, content } = req.body;
    const filePath = req.file?.path;

    if (!title || !content || !filePath) {
      res.status(400);
      throw new Error("Title, content, and image are required");
    }

    const normalizedPath = filePath.replace(/\\/g, "/");

    const imageUrl = `${req.protocol}://${req.get("host")}/${normalizedPath}`;

    const newBlog = await blog.create({
      title,
      content,
      image: imageUrl,
      user: req.user?.id, 
    });

    res.status(201).json({
      success: true,
      data: newBlog,
    });
  }
);


export const getAllBlog = asyncHandler (
    async (req: Request, res: Response) => {
        const allBlogs = await blog.find({})

             res.status(200).json({
                success: true,
                data: allBlogs
            })     
    }
)
    
export const getsingleBlog = asyncHandler (
    async (req: Request, res: Response) => {

        const  id  = req.params.id
        const singleBlog = await blog.findById(id)

        if (!singleBlog) {
            res.status(404)
            throw new Error("blog not found")
        }

        res.status(200).json({
            success: true,
            data: singleBlog
        })

    }
)

export const deleteBlog = asyncHandler (
    async (req: Request, res: Response) => {
        const id = req.params.id

        const deleteBlog = await blog.findByIdAndDelete(id)

        if(!deleteBlog) {
            res.status(404)
            throw new Error("Blog not found")
        }

        await deleteBlog.deleteOne()

        res.status(200).json({
            success: true,
            message: "blog deleted successfully"
        })

    }
)

export const updateBlog = asyncHandler(
  async (req: Request, res: Response) => {
    const { title, content } = req.body;
    const image = req.file?.path || req.body.image;

    const updatedBlog = await blog.findOneAndUpdate(
      { _id: req.params.id },
      { title, content, image },
      { new: true }
    );

    if (!updatedBlog) {
      res.status(404);
      throw new Error("Blog not found");
    }

    res.status(200).json({
      success: true,
      data: updatedBlog,
    });
  }
);
