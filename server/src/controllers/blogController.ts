import { NextFunction, Request, Response } from "express"
import asyncHandler from "express-async-handler"
import blog from "../models/blogModel"

export const createBlog =  asyncHandler (
    async (req: Request, res: Response, next: NextFunction) => {
       const { title, content } = req.body

       if (!title || !content) {
        res.status(400);
        throw new Error("Title and content is required")
       }
       const newBlog = await blog.create({
        title: title,
        content: content
       })

       res.status(200).json({
        success: true,
        data: newBlog
       })


    }
) 

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


export const updateBlog = asyncHandler (
    async (req: Request, res: Response) => {
        const { title, content} = req.body
        // const { id } = req.params

        const updateBlog = await blog.findOneAndUpdate(
            {_id: req.params.id},
            {
                title: title,
                content: content,
            },
            { new: true}
        )

        if (!updateBlog) {
            res.status(404)
            throw new Error("blog not found")
        }

        res.status(200).json({
            success: true,
            data: updateBlog
        })
       

    }
)