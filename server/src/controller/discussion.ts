import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../lib/errorHandler";
import Discussion from "../model/discussion";
import mongoose from "mongoose";
import type { THashtagQuery } from "../types/miscellaneous";
import { getSignedUrlForUpload } from "../utils/s3";

export const createDiscussion = catchAsyncError(async (req, res, next) => {

    if (!req.user) {
        return next(new ErrorHandler("Login first to create a discussion", 401));
    }

    const { text, image, hashtags } = req.body;
    const userId = req.user._id;

    const discussion = await Discussion.create({ text, image, hashtags, userId });

    res.status(201).json({
        success: true,
        discussion,
    });
})

export const updateDiscussion = catchAsyncError(async (req, res, next) => {

    if (!req.user) return next(new ErrorHandler("Login first to create a discussion", 401));

    const { id: discussionId } = req.params;
    let discussion = await Discussion.findById(discussionId);

    if (!discussion) {
        return next(new ErrorHandler("Discussion not found", 404));
    }

    if (discussion.userId.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You are not authorized to update this discussion", 403));
    }

    discussion = await Discussion.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        discussion,
    });
})

export const deleteDiscussion = catchAsyncError(async (req, res, next) => {

    if (!req.user) return next(new ErrorHandler("Login first to delete a discussion", 401));

    const { id: discussionId } = req.params;
    let discussion = await Discussion.findById(discussionId);

    if (!discussion) {
        return next(new ErrorHandler("Discussion not found", 404));
    }

    if (discussion.userId.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You are not authorized to delete this discussion", 403));
    }

    await Discussion.findByIdAndDelete(discussionId);

    res.status(204).json({
        success: true,
        message: "Discussion deleted successfully",
    });
})

export const getDiscussion = catchAsyncError(async (req, res, next) => {

    const { id: discussionId } = req.params;

    const discussion = await Discussion.findById(discussionId);

    if (!discussion) {
        return next(new ErrorHandler("Discussion not found", 404));
    }

    res.status(200).json({
        success: true,
        discussion,
    });
})

export const getDiscussions = catchAsyncError(async (req, res, next) => {

    const { hashtags, text } = req.query;

    const query: THashtagQuery = {};

    if (hashtags) {
        const hashtagStr = hashtags as string;
        const hashtagArr = hashtagStr.split(',').map(val => val.trim());
        // hashtag OR query
        // query.hashtags = { $in: hashtagArr };
        // hashtag AND query
        query.$and = hashtagArr.map(tag => ({ hashtags: { $in: [tag] } }));
    }
    if (text) {
        query.text = { $regex: text, $options: 'i' };
    }

    const discussions = await Discussion.find(query);

    res.status(200).json({
        success: true,
        discussions,
    });
})

export const likeDiscussion = catchAsyncError(async (req, res, next) => {

    if (!req.user) return next(new ErrorHandler("Login first to like a discussion", 401));

    const { id: discussionId } = req.params;
    console.log(discussionId, "discussionId");
    let discussion = await Discussion.findById(discussionId);

    if (!discussion) {
        return next(new ErrorHandler("Discussion not found", 404));
    }
    const userId = new mongoose.Types.ObjectId(req.user._id);
    const userIdIndex = discussion.likes.findIndex(id => id.equals(userId));
    if (userIdIndex > -1) {
        discussion.likes.splice(userIdIndex, 1);
    } else discussion.likes.push(userId);

    discussion = await discussion.save();

    res.status(200).json({
        success: true,
        discussion,
    });
})

export const uploadDiscussionImage = catchAsyncError(async (req, res, next) => {

    if (!req.user) return next(new ErrorHandler("Login first to upload a discussion image", 401));
    console.log(req.body, "req.body");

    const { fileName } = req.body;
    const result = await getSignedUrlForUpload(fileName, req.user._id);
    res.status(200).json({ success: true, result });
})

