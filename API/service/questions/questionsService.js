import questionRepo from '../../database/repository/questions/questionRepo.js'
const questionService = {
  generateNewQuestionID: async (dbName) => {
    try {
      return await questionRepo.generateNewQuestionID(dbName);
    } catch (e) {
      console.error('Error generating new question ID:', e);
      return {
        success: false,
        message: 'Error generating new question ID',
      };
    }
  },

  saveNewQuestion: async (questionID, topic, context, questionsDbName) => {
    try {
      const createResult = await questionRepo.createNewQuestion(questionID, topic, context, questionsDbName);
      if (!createResult) {
        return {
          success: false,
          message: 'Error saving a new question',
        };
      }
      return {
        success: true,
        message: 'Question saved successfully',
      };
    } catch (e) {
      console.error('Error saving a new question:', e);
      return {
        success: false,
        message: 'Error saving a new question',
      };
    }
  },

  updateQuestionDetails: async (questionID, time, correct, questionsDbName) => {
    try {
      const newAttemptID = await questionRepo.generateNewAttemptID(questionID, questionsDbName);
      const updateResults = await questionRepo.updateQuestionDetails(newAttemptID, questionID, time, correct, questionsDbName);
      if (!updateResults.acknowledged) {
        return {
          success: false,
          message: 'Error updating question details',
        };
      }
      return {
        success: true,
        message: 'Question details updated successfully',
      };
    } catch (e) {
      console.error('Error updating question details:', e);
      return {
        success: false,
        message: 'Error updating question details',
      };
    }
  }
}

export default questionService;