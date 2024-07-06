import express from 'express';
import { isAuthenticatedUser } from '../middleware/auth.js';
import { signUpUser, loginUser, logoutUser, currentUser, updateUser, deleteUser, allUsers, followUser } from '../controller/user.js';

const userRouter = express.Router();

userRouter.route('/me').get(isAuthenticatedUser, currentUser).
    patch(isAuthenticatedUser, updateUser).
    delete(isAuthenticatedUser, deleteUser);
userRouter.route('/follow/:id').patch(isAuthenticatedUser, followUser);
userRouter.route('/').get(allUsers);
// auth 
userRouter.route('/auth/signup').post(signUpUser);
userRouter.route('/auth/login').post(loginUser);
userRouter.route('/auth/logout').get(logoutUser);




export default userRouter;