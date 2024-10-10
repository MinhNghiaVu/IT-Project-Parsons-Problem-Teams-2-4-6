import express from 'express';
import userController from '../controller/user/userDataController.js';

const userRouter = express.Router();

// gets user data of the user
userRouter.get('/newUserID', userController.newUserID);
userRouter.get('/userData', userController.getUserData);
userRouter.post('/changeUsername', userController.changeUsername);

export default userRouter;