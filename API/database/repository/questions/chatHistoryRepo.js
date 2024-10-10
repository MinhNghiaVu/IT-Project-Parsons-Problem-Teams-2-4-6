import ChatHistorySchema from "../../model/questions/chatHistoryModel.js";
import { getDatabaseConnection } from "../../connection.js";
import dotenv from "dotenv";
dotenv.config();

const getChatHistoryModel = async (questionsDbName) =>{
  const chatHistoryCollection = process.env.CHAT_HISTORY_COLLECTION;
  if (!chatHistoryCollection) {
    throw new Error("Chat history collection is not defined in env file");
  }
  const dbConnection = await getDatabaseConnection(questionsDbName);
  return dbConnection.model(chatHistoryCollection, ChatHistorySchema);
}

const chatHistoryRepo = {
  getChatHistory: async (userID, questionsDbName) => {
    const chatHistoryModel = await getChatHistoryModel(questionsDbName);
    const chatHistory = await chatHistoryModel.find(
      { userID: userID },
      { 
        prompt: 1, 
        question: 1, 
        _id: 0
      }
    );
    let transformedHistory = []
    chatHistory.map((item) => {
      const user = {
        role: "user",
        parts: [
          {
            text: item.prompt
          }
        ]
      };
      const model = {
        role: "model",
        parts: [
          {
            text:item.question
          }
        ]
      };
    
      transformedHistory.push(user, model)
    });

    console.log(transformedHistory);
    // console.log(userID)
    // console.log("testing")
    return transformedHistory;
  },
}

export default chatHistoryRepo;




