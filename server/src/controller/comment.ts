import catchAsyncError from "../middleware/catchAsyncError";
import ErrorHandler from "../lib/errorHandler";
import Comment from "../model/comment";
import mongoose from "mongoose";


export const createComment = catchAsyncError(async (req, res, next) => {

    if (!req.user) return next(new ErrorHandler("Login first to create a comment", 401));

    const { text, discussionId, parentCommentId } = req.body;
    const userId = req.user._id;

    const comment = await Comment.create({ text, discussionId, parentCommentId, userId });

    res.status(201).json({
        success: true,
        comment,
    });

})

export const updateComment = catchAsyncError(async (req, res, next) => {

    if (!req.user) return next(new ErrorHandler("Login first to update a comment", 401));

    const { id: commentId } = req.params;
    let comment = await Comment.findById(commentId);

    if (!comment) {
        return next(new ErrorHandler("Comment not found", 404));
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You are not authorized to update this comment", 403));
    }

    comment = await Comment.findByIdAndUpdate(req.params.id, req.body, {
        new: true,
        runValidators: true,
        useFindAndModify: false,
    });

    res.status(200).json({
        success: true,
        comment,
    });
})

export const deleteComment = catchAsyncError(async (req, res, next) => {

    if (!req.user) return next(new ErrorHandler("Login first to delete a comment", 401));

    const { id: commentId } = req.params;
    let comment = await Comment.findById(commentId);

    if (!comment) {
        return next(new ErrorHandler("Comment not found", 404));
    }

    if (comment.userId.toString() !== req.user._id.toString()) {
        return next(new ErrorHandler("You are not authorized to delete this comment", 403));
    }

    await Comment.findByIdAndDelete(commentId);

    res.status(200).json({
        success: true,
        message: "Comment deleted successfully",
    });
})

export const getCommentsForDiscussion = catchAsyncError(async (req, res, next) => {

    const { discussionId } = req.params;

    const comments = await Comment.find({ discussionId, parentCommentId: null }).populate({ path: "userId", select: "name" });

    res.status(200).json({
        success: true,
        comments,
    });
})

export const getCommentsForComment = catchAsyncError(async (req, res, next) => {

    const { id: commentId } = req.params;

    const comments = await Comment.find({ parentCommentId: commentId }).populate({ path: "userId", select: "name" });

    res.status(200).json({
        success: true,
        comments,
    });
})

export const likeComment = catchAsyncError(async (req, res, next) => {

    if (!req.user) return next(new ErrorHandler("Login first to like a comment", 401));

    const { id: commentId } = req.params;
    console.log(commentId);
    let comment = await Comment.findById(commentId);

    if (!comment) {
        return next(new ErrorHandler("Comment not found", 404));
    }
    const userId = new mongoose.Types.ObjectId(req.user._id);
    console.log(userId);
    const userIdIndex = comment.likes.findIndex(id => id.equals(userId));
    if (userIdIndex > -1) {
        comment.likes.splice(userIdIndex, 1);
    } else comment.likes.push(userId);

    comment = await comment.save();

    res.status(200).json({
        success: true,
        comment,
    });


})

