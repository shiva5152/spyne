import ErrorHandler from "../lib/errorHandler.js";
import catchAsyncError from "./catchAsyncError.js";
import jwt, { JwtPayload } from "jsonwebtoken";
import User from '../model/user.js';
import { TUser } from "../types/user.js";
import dotenv from "dotenv";
dotenv.config();

interface CustomJwtPayload extends JwtPayload {
    id: string;
    accessToken: string;
}

declare module 'express-serve-static-core' {
    interface Request {
        user?: TUser;
    }
}


export const isAuthenticatedUser = catchAsyncError(async (req, res, next) => {
    // console.log(req.cookies)
    const { token } = req.cookies;


    if (!token) {
        return next(new ErrorHandler("Please Login to access this resource", 401));
    }
    if (!process.env.JWT_SECRET) {
        throw new Error("JWT_SECRET is not defined in the environment.");
    }
    const decodedData = jwt.verify(token, process.env.JWT_SECRET) as CustomJwtPayload;
    console.log(decodedData)


    const user = await User.findOne({ _id: decodedData.id })
    if (!user) {
        return next(new ErrorHandler("user not found with associated token", 401));
    }
    req.user = user as TUser;

    next();
})