import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../lib/errorHandler";
import User from "../model/user";
import { sendToken } from "../lib/sendToken";
import mongoose from "mongoose";
import type { TUserQuery } from "../types/miscellaneous";

export const signUpUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password, mobile } = req.body;

    if (!name || !email || !password || !mobile) {
        return next(new ErrorHandler("please provide all required values", 400))
    }
    const emailExists = await User.findOne({ email });
    const mobileExists = await User.findOne({ mobile });
    if (emailExists) {
        return next(new ErrorHandler("User already exists with this Email", 400))
    }
    if (mobileExists) {
        return next(new ErrorHandler("User already exists with this Mobile Number", 400))
    }
    const user = await User.create({ name, email, password, mobile });

    sendToken(user, 200, res);

})

export const loginUser = catchAsyncError(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ErrorHandler("please provide email and password", 400))
    }
    const user = await User.findOne({ email }).select("+password");

    if (!user) {
        return next(new ErrorHandler("Invalid  Email or Password", 401))
    }
    const verifyPassword = await user.comparePassword(password);

    if (!verifyPassword) {
        return next(new ErrorHandler("Invalid  Email or Password", 401))
    }

    sendToken(user, 200, res);
})

export const logoutUser = catchAsyncError(async (req, res, next) => {

    res.cookie("token", null, {
        expires: new Date(Date.now()),
        httpOnly: true,
    }).status(200).json({
        success: true,
        message: "Logged Out Successfully"
    });
})

export const currentUser = catchAsyncError(async (req, res, next) => {

    if (!req.user) {
        return next(new ErrorHandler("User not found", 401))
    }

    const user = await User.findById(req.user._id);
    res.status(200).json({
        success: true,
        user
    })
})

export const updateUser = catchAsyncError(async (req, res, next) => {

    if (!req.user) {
        return next(new ErrorHandler("User not found", 401))
    }
    const { mobile, name } = req.body;
    const user = await User.findByIdAndUpdate(req.user._id, { mobile, name }, { new: true, runValidators: true });

    res.status(200).json({
        success: true,
        user
    })
})

export const deleteUser = catchAsyncError(async (req, res, next) => {

    if (!req.user) {
        return next(new ErrorHandler("User not found", 401))
    }
    await User.findByIdAndDelete(req.user._id);

    res.status(200).json({
        success: true,
        message: "User deleted successfully"
    })
})

export const allUsers = catchAsyncError(async (req, res, next) => {

    const { name } = req.query;

    const query: TUserQuery = {};
    if (name) {
        query.name = { $regex: name, $options: "i" }
    }
    const users = await User.find(query);

    res.status(200).json({
        success: true,
        users
    })
})

export const followUser = catchAsyncError(async (req, res, next) => {

    if (!req.user) {
        return next(new ErrorHandler("User not found", 401))
    }
    const { id } = req.params;
    const reqUserId = new mongoose.Types.ObjectId(req.user._id);
    const UserToBeFollowed = await User.findById(id);
    if (!UserToBeFollowed) {
        return next(new ErrorHandler("User that you want to follow, not found", 404))
    }
    if (UserToBeFollowed.followers.includes(reqUserId)) {
        return next(new ErrorHandler("You already follow this user", 400))
    }
    UserToBeFollowed.followers.push(reqUserId);
    await UserToBeFollowed.save();

    const user = await User.findOneAndUpdate({ _id: req.user._id }, { $push: { following: id } }, { new: true });

    res.status(200).json({
        success: true,
        user
    })
});


