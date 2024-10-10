import express from 'express';
import questionRouter from './questionRouter.js';
import userRouter from './userRouter.js';
import adminRouter from './adminRouter.js';


const router = express.Router();

router.use('/question', questionRouter);
router.use('/user', userRouter);
router.use('/admin', adminRouter);

export default router;