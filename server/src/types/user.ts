import mongoose from "mongoose";
export type TUser = {
    _id: string,
    name: string;
    mobile: string;
    email: string;
    password: string;
    following: mongoose.Types.ObjectId[];
    followers: mongoose.Types.ObjectId[];
    discussions: mongoose.Types.ObjectId[];
    createJWT: () => string;
    comparePassword: (givenPassword: string) => Promise<boolean>;
    createdAt?: Date;
    updatedAt?: Date;
} & mongoose.Document;