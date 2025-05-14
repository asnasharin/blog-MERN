import mongoose, {Document, Schema} from "mongoose";

export interface IBlog extends Document {
    title: string;
    content: string;
    image: string;
    author: mongoose.Types.ObjectId
}


const blogSchema = new Schema<IBlog> (
    {
        title: { type: String, required: true},
        content: { type: String, required: true},
        image: { type: String, required: true},
        author: { type: Schema.Types.ObjectId, ref: "User", required: true}
    },
    {timestamps: true}
) 

const blog = mongoose.model<IBlog>("blog", blogSchema)

export default blog