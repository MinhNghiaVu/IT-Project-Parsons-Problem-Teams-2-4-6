import { getDatabaseConnection } from "../../index.js";
import { AttemptSchema } from "../../models/attemptModel.js";
import { messages } from "../../utils/constants/messages.js";
require('dotenv').config();

export const getUserAttemptDetails = async (userID, dbName) => {
  const attemptCollection = process.env.ATTEMPT_COLLECTION;
  if (!attemptCollection) {
    throw new Error(messages.ATTEMPT_COLLECTION_UNDEFINED);
  }
  const dbConnection = await getDatabaseConnection(dbName);
  const attemptModel = dbConnection.model(
    attemptCollection,
    AttemptSchema
  );

  return await attemptModel.find({
    userID: userID,
  });
}
