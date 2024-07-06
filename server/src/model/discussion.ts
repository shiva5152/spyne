
import mongoose from "mongoose";
import type { TDiscussion } from "../types/discussion";

const discussionSchema = new mongoose.Schema<TDiscussion>({
    text: {
        type: String,
        required: true,
        trim: true,
    },
    image: {
        type: String,
        trim: true,
    },
    hashtags: [
        {
            type: String,
            trim: true,
        },
    ],
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    likes: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
        },
    ],
    comments: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Comment",
        },
    ],
},
    { timestamps: true }
);


export default mongoose.model<TDiscussion>('Discussion', discussionSchema);