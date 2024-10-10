import httpCodes from "../../utils/constants/httpsCodes.js";
import adminService from "../../service/user/adminService.js";
import { getUsersDbName } from "../../utils/functions/dbName.js";
// ADMIN CONTROLS
const adminController = {
  /**
   * Request: { }
   * Response: { success, message, summary, topicsInfo }
   * Summary: { accuracy, numQuestions }
   * TopicsInfo: [ { topic, accuracy, numQuestions, users: [{ userID, numQuestions, accuracy, totalTime }] } ]
   */
  summariseInfo: async (req, res) => {
    try {
      const usersDbName = await getUsersDbName();

      const overallInfo = await adminService.summariseInfo(usersDbName);
      if (!overallInfo.success) {
        return res.status(httpCodes.BAD_REQUEST).json({
          success: false,
          message: overallInfo.message,
          error: overallInfo.error
        });
      }

      const questionsDbName = await getQuestionsDbName();

      const topicsInfo = await adminService.summariseTopicsInfo(usersDbName, questionsDbName);
      if (!topicsInfo.success) {
        return res.status(httpCodes.BAD_REQUEST).json({
          success: false,
          message: topicsInfo.message,
          error: topicsInfo.error
        });
      }

      return res.status(httpCodes.OK).json({
        success: true,
        message: "Successfully summarised information",
        summary: overallInfo.summary,
        topicsInfo: topicsInfo.topicsAnalytics,
      });

    } catch (e) {
      console.error("Error summarising OVERALL information:", e);
      return res.status(httpCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: e.message,
        error: e
      });
    }
  },
}

export default adminController;