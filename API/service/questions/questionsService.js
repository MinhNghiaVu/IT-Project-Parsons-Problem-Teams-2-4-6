import questionRepo from '../../database/repository/questions/questionRepo.js'
const questionService = {
  saveNewQuestion: async (topic, context, questionsDbName) => {
    try {
      const createResult = await questionRepo.createNewQuestion(topic, context, questionsDbName);
      if (!createResult) {
        return {
          success: false,
          message: 'Error saving a new question',
        };
      }
      return {
        success: true,
        message: 'Question saved successfully',
        questionID: createResult._id,
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
      const updateResults = await questionRepo.updateQuestionDetails(questionID, time, correct, questionsDbName);
      if (!updateResults.acknowledged) {
        return {
          success: false,
          message: 'Error updating question details',
        };
      }
      console.log('Question details updated: ', updateResults); 
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