import { Response } from "express";
import dotenv from "dotenv";
import { TUser } from "../types/user";
dotenv.config();

export const sendToken = (user: TUser, statusCode: number, res: Response) => {
    let token = user.createJWT();

    const options = {
        httpOnly: process.env.NODE_ENV === 'production',
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),

    };
    res.status(statusCode).cookie("token", token, options).json({
        success: true,
        token,
        user,
    });
};