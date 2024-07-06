import express from 'express';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { createDiscussion, updateDiscussion, deleteDiscussion, getDiscussions, getDiscussion, likeDiscussion, uploadDiscussionImage } from '../controller/discussion.js';

const discussionRouter = express.Router();


discussionRouter.route('/').post(isAuthenticatedUser, createDiscussion).
    get(getDiscussions);
discussionRouter.route('/upload').get(isAuthenticatedUser, uploadDiscussionImage);
discussionRouter.route('/:id').patch(isAuthenticatedUser, updateDiscussion).
    delete(isAuthenticatedUser, deleteDiscussion).
    get(getDiscussion);
discussionRouter.route('/like/:id').patch(isAuthenticatedUser, likeDiscussion);


export default discussionRouter;