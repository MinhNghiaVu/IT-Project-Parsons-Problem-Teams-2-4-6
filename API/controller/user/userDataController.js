import userDataService from '../../service/user/userDataService.js';
import { getUsersDbName, getQuestionsDbName } from '../../utils/functions/dbName.js';
import httpCodes from "../../utils/constants/httpsCodes.js";

const userController = {
  newUserID: async (req, res) => {
    try {
      const usersDbName = await getUsersDbName();
      const userID = await userDataService.newUserID(usersDbName);
      if (!userID.success) {
        return res.status(httpCodes.BAD_REQUEST).json({
          success: false,
          message: "Error generating new user ID"
        });
      }
      return res.status(httpCodes.OK).json({
        success: true,
        message: "New user ID generated successfully",
        userID: userID
      });
    } catch (e) {
      console.error("Error generating new user ID:", e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: e.message
      });
    }
  },

  changeUsername: async (req, res) => {
    try {
      const { userID, newUsername } = req.body;
      if (!userID || !newUsername) {
        return res.status(httpCodes.BAD_REQUEST).json({
          success: false,
          message: "Please provide a userID and new username"
        });
      }

      const usersDbName = await getUsersDbName();
      const result = await userDataService.changeUsername(userID, newUsername, usersDbName);
      if (!result.success) {
        return res.status(httpCodes.BAD_REQUEST).json({
          success: false,
          message: result.message
        });
      }

      return res.status(httpCodes.OK).json({
        success: true,
        message: result.message
      });
    } catch (e) {
      console.error("Error changing username:", e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: e.message
      });
    }
  },

  /**
   * Request: { userID }
   * Response: { success, message, userData }
   * userData: { accuracy, numQuestions, topicSummary: [ { topic, questions: [ { questionID, topic, context, correct, totalTime, numAttempts } ] } ] }
   */
  getUserData: async (req, res) => {
    try {
      const { userID } = req.query;
      if (!userID) {
        return res.status(httpCodes.BAD_REQUEST).json({
          success: false,
          message: "Please provide an userID"
        });
      }
      const userIDInt = parseInt(userID);
      if (!userIDInt) {
        return res.status(httpCodes.BAD_REQUEST).json({
          success: false,
          message: "Please provide an integer userID"
        });
      }

      const usersDbName = await getUsersDbName();
      // fetch user data
      const userData = await userDataService.getUserData(userIDInt, usersDbName);
      if (!userData.success) {
        return res.status(httpCodes.BAD_REQUEST).json({
          success: false,
          message: userData.message
        });
      }
      const questionsDbName = await getQuestionsDbName();
      // adds question detailsx to the user data
      const modifiedUserData = await userDataService.addQuestionDetailsToUserData(userData.userData, questionsDbName);
      if (!modifiedUserData.success) {
        return res.status(httpCodes.BAD_REQUEST).json({
          success: false,
          message: modifiedUserData.message
        });
      }
    
      return res.status(httpCodes.OK).json({
        success: true,
        message: "User data retrieved successfully",
        userData: modifiedUserData.userData
      });
    } catch (e) {
      console.error("Error getting user data:", e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: e.message
      });
    }
  },

  /**
   * Request: { userID, topic, correct, time, questionID }
   * Response: { success, message }
   */
  updateUserAnalytics: async (req, res) => {
    try {
      const { userID, topic, correct, time, questionID } = req.body;
      if (!userID || !topic || correct === undefined || time === undefined || !questionID) {
        return {
          success: false,
          message: "Please provide a valid userID, topic, correct, time, and questionID",
        };
      }

      const usersDbName = await getUsersDbName();

      const result = await userDataService.updateUserAnalytics(userID, topic, correct, time, questionID, usersDbName);
      if (!result.success) {
        return res.status(httpCodes.BAD_REQUEST).json({
          success: false,
          message: result.message
        });
      }
      return res.status(httpCodes.OK).json({
        success: true,
        message: result.message
      });
    } catch (e) {
      console.error("Error updating user analytics:", e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: e.message
      });
    }
  },
}

export default userController;
