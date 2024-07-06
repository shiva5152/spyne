import mongoose from "mongoose";

export type TComment = {
    _id: string,
    text: string;
    userId: mongoose.Types.ObjectId;
    discussionId: mongoose.Types.ObjectId;
    likes: mongoose.Types.ObjectId[];
    parentCommentId?: mongoose.Types.ObjectId | null;
    createdAt?: Date;
    updatedAt?: Date;
} & mongoose.Document;