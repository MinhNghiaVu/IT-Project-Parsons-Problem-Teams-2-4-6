import express from 'express';
import adminController from '../controller/user/adminController.js';

const adminRouter = express.Router();

adminRouter.get('/summary', adminController.summariseInfo);

export default adminRouter;