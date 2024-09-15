import QuestionDetailsSchema from "../../model/questions/questionDetailsModel.js";
import { establishConnection, getDatabaseConnection } from "../../connection.js";
import messages from "../../../utils/constants/messages.js";
import dotenv from 'dotenv'
dotenv.config();


const getQuestionDetailsModel = async (dbName) => {
  const questionDetailsCollection = process.env.QUESTION_DETAILS_COLLECTION;
  if (!questionDetailsCollection) {
    throw new Error(messages.QUESTION_DETAILS_COLLECTION_UNDEFINED);
  }
  const dbConnection = await getDatabaseConnection(dbName);
  return dbConnection.model(questionDetailsCollection, QuestionDetailsSchema);
}

// Contains all methods communicating with the questionDetails collection
export const questionDetailsRepo = {
  // Finds and returns the question with this questionID
  getQuestionDetails: async (questionID, dbName) => {
    const questionDetailsModel = await getQuestionDetailsModel(dbName);
    return await questionDetailsModel.findOne({
      questionID: questionID,
    });
  },

  // Updates the details of the question with this questionID
  updateQuestionDetails: async (questionID, updatedDetails, dbName) => {
    const questionDetailsModel = await getQuestionDetailsModel(dbName);
    return await questionDetailsModel.updateOne(
      { questionID: questionID }, 
      updatedDetails,
    );
  },

  // Saves a new question to the collection
  saveApprovedQuestion: async (questionDetails, dbName) => {
    // Sets a new questionID
    const questionDetailsModel = await getQuestionDetailsModel(dbName);
    const questionCount = await questionDetailsModel.countDocuments();
    const approvedQuestion = new questionDetailsModel({
      questionID: questionCount + 1,
      ...questionDetails,
  });
    try {
      console.log("\nSaving the question to the database...\n");
      return await approvedQuestion.save();
    } catch (e) {
      console.error("Error saving the question:", e);
    }
  },

  // Deletes a question from the collection
  deleteQuestion: async (questionID, dbName) => {
    const questionDetailsModel = await getQuestionDetailsModel(dbName);
    return await questionDetailsModel.deleteOne({
      questionID: questionID,
    });
  }
}