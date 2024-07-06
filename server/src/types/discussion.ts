import mongoose from "mongoose";
import { TComment } from "./comment";

export type TDiscussion = {
    _id: string,
    text: string;
    image: string;
    hashtags: string[];
    userId: mongoose.Types.ObjectId;
    likes: mongoose.Types.ObjectId[];
    comments: TComment[];
    createdAt?: Date;
    updatedAt?: Date;
} & mongoose.Document;