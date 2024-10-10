import userDataRepo from "../../database/repository/user/userDataRepo.js";
import questionRepo from "../../database/repository/questions/questionRepo.js";

async function calculateTotalAccuracy(questionsDbName) {
  try {
    const accuracy = await questionRepo.getTotalAccuracy(questionsDbName);
    return accuracy;
  } catch (e) {
    console.error("Error calculating total accuracy:", e);
    return 0;
  }
}

async function calculateTotalQuestions(questionsDbName) {
  try {
    const questions = await questionRepo.getTotalNumQuestions(questionsDbName);
    return questions;
  } catch (e) {
    console.error("Error calculating total attempts:", e);
    return 0;
  }
}

async function calculateTopicAnalytics(questionsDbName) {
  try {
    const topicsAnalytics = await questionRepo.getTopicsAnalytics(questionsDbName);
    return topicsAnalytics;
  } catch (e) {
    console.error("Error calculating topic analytics:", e);
    return [];
  }
}

const adminService = {
  // Summarises all information to display to the admin: accuracy, totalAttempts of EVERYONE
  summariseInfo: async (questionsDbName) => {
    try {
      // for EVERYONE
      const accuracy = await calculateTotalAccuracy(questionsDbName);
      const totalQuestions = await calculateTotalQuestions(questionsDbName);
      return {
        success: true,
        message: "Successfully summarised information",
        summary: {
          accuracy: accuracy,
          numQuestions: totalQuestions,
        },
      };
    } catch (e) {
      return {
        success: false,
        message: e.message,
      };
    }
  },

  summariseTopicsInfo: async (usersDbName, questionsDbName) => {
    try {
      const topicsAnalytics = await calculateTopicAnalytics(questionsDbName);
      if (!topicsAnalytics || topicsAnalytics.length === 0) {
        return {
          success: false,
          message: "Error calculating topic analytics",
        };
      }

      const result = [];

      for (const topicData of topicsAnalytics) {
        const userData = await userDataRepo.getUserSummaryOfTopic(topicData.topic, usersDbName);
        if (!userData) {
          return {
            success: false,
            message: "Error getting user data for topic",
          };
        }
        result.push({
          ...topicData,
          users: userData,
        });
      }
      return {
        success: true,
        message: "Successfully summarised topics information",
        topicsAnalytics: result,
      };
    } catch (e) {
      return {
        success: false,
        message: e.message
      };
    }
  },
};

export default adminService;