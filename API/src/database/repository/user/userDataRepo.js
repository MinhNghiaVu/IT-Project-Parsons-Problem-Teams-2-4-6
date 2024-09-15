import { getDatabaseConnection } from "../../index.js";
import { UserDataSchema } from "../../models/userDataModel.js";
import { messages } from "../../utils/constants/messages.js";
require('dotenv').config();

export const getUserData = async (userID, dbName) => {
  const userDataCollection = process.env.USER_DATA_COLLECTION;
  if (!userDataCollection) {
    throw new Error(messages.USER_DATA_COLLECTION_UNDEFINED);
  }
  const dbConnection = await getDatabaseConnection(dbName);
  const userDataModel = dbConnection.model(
    userDataCollection,
    UserDataSchema
  );

  return await userDataModel.findOne({
    userID: userID,
  });
}