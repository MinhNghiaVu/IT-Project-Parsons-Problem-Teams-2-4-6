import express from 'express';
import questionController from '../controller/questions/questionController.js';
import userController from '../controller/user/userDataController.js';

// Routes posts and get requests
const questionRouter = express.Router();

// send answers to the problems page
questionRouter.get('/generateQuestion', questionController.generateQuestion);
questionRouter.post('/runPython', questionController.runPython);
questionRouter.post('/submitAttempt', 
  questionController.updateQuestionDetails, 
  userController.updateUserAnalytics
);

export default questionRouter;