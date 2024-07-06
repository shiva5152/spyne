import express from 'express';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { createComment, updateComment, deleteComment, getCommentsForComment, getCommentsForDiscussion, likeComment } from '../controller/comment.js';

const commentRouter = express.Router();

commentRouter.route('/').post(isAuthenticatedUser, createComment);
commentRouter.route('/:id').patch(isAuthenticatedUser, updateComment).
    delete(isAuthenticatedUser, deleteComment).
    get(getCommentsForComment);
commentRouter.route('/discussion/:discussionId').get(getCommentsForDiscussion);
commentRouter.route('/like/:id').patch(isAuthenticatedUser, likeComment);





export default commentRouter;