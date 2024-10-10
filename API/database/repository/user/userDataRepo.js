import dotenv from 'dotenv';
import { getDatabaseConnection } from '../../connection.js';
import UserDataSchema from '../../model/user/userDataModel.js';

dotenv.config();

const getUserDataModel = async (usersDbName) => {
  const userDataCollection = process.env.USER_DATA_COLLECTION;
  if (!userDataCollection) {
    throw new Error("User data collection is not defined in env file");
  }
  const dbConnection = await getDatabaseConnection(usersDbName);
  return dbConnection.model(userDataCollection, UserDataSchema);
}

const userDataRepo = {
  // -------------------------------------FOR USER ANALYTICS-------------------------------------
  getUserData: async (userID, usersDbName) => {
    try {
      const userDataModel = await getUserDataModel(usersDbName);
      
      const result = await userDataModel.aggregate([
        { $match: { userID: userID } },
        {
          $project: {
            _id: 0,
            userID: 1,
            name: 1,
            accuracy: 1,
            numQuestions: 1,
            topicSummary: {
              $map: {
                input: "$topicSummary",
                as: "summary",
                in: {
                  topic: "$$summary.topic",
                  numQuestions: "$$summary.numQuestions",
                  accuracy: "$$summary.accuracy",
                  attemptedQuestions: {
                    $slice: ["$$summary.attemptedQuestions", -5] // return up to 5 most recent questions
                  },
                }
              }
            }
          }
        }
      ]);
      return result[0];
    } catch (e) {
      console.error("Error getting user data:", e);
      throw e;
    }
  },

  //-------------------------------------FOR ADMIN ANALYTICS-------------------------------------
  getUserSummaryOfTopic: async (topic, usersDbName) => {
    try {
      const userDataModel = await getUserDataModel(usersDbName);
      const result = await userDataModel.aggregtae([
        {
          // splits the attemptsSummary array into separate documents
          $unwind: "$topicSummary"
        },
        {
          $match: {
            // user's topic matches what is given
            "topicSummary.topic": topic,
            "topicSummary.numQuestions": { $gt: 0 } // greater than 0 (they have attempted at least one question)
          }
        },
        {
          $project: {
            userID: 1,
            numQuestions: "$topicSummary.numQuestions",
            accuracy: "$topicSummary.accuracy",
            totalTime: "$topicSummary.totalTime",
          }
        },
        {
          // sort so the top users are at the top
          $sort: { "topicSummary.numQuestions": -1 }
        }
      ])
      return result;
    } catch (e) {
      console.error("Error getting user summary of topic:", e);
      throw e;
    }
  },

  // -------------------------------------UPDATES-------------------------------------
  newUserID: async (usersDbName) => {
    try {
      const userDataModel = await getUserDataModel(usersDbName);
      const result = await userDataModel.countDocuments();
      return result + 1;
    } catch (e) {
      console.error("Error getting new user ID:", e);
      throw e;
    }
  },

  createUser: async (userID, topicsList, usersDbName) => {
    try {
      const userDataModel = await getUserDataModel(usersDbName);
      const topicSummary = topicsList.map(topic => ({
        topic: topic,  // String value for the topic
        numQuestions: 0,
        numCorrect: 0,
        accuracy: 0,
        totalTime: 0,
        attemptedQuestions: [],
        correctQuestions: []
      }));
  
      const newUser = new userDataModel({
        userID: userID,
        topicSummary: topicSummary,
      });
      return await newUser.save();
    } catch (e) {
      console.error("Error creating user:", e);
      throw e;
    }
  },

  changeUsername: async (userID, newUsername, usersDbName) => {
    try {
      const userDataModel = await getUserDataModel(usersDbName);
      return await userDataModel.updateOne(
        { userID: userID },
        { name: newUsername }
      );
    } catch (e) {
      console.error("Error changing username:", e);
      throw e;
    }
  },

  updateUserAnalytics: async (userID, topic, correct, time, questionID, usersDbName) => {
    try {
      const userDataModel = await getUserDataModel(usersDbName);
      // First update: save the attempted question into the question SET (unique) of the topic
      await userDataModel.updateOne(
        { userID: userID },
        {
          $addToSet: {
            "topicSummary.$[element].attemptedQuestions": questionID,
          },
          $inc: {
            totalTime: time,
            "topicSummary.$[element].totalTime": time,
          },
        },
        {
          arrayFilters: [
            {
              "element.topic": topic
            }
          ]
        }
      );

      if (correct) {
        await userDataModel.updateOne(
          { userID: userID },
          {
            $addToSet: {
              "topicSummary.$[element].correctQuestions": questionID,
            },
            $inc: {
              totalTime: time,
              "topicSummary.$[element].totalTime": time,
            },
          },
          {
            arrayFilters: [
              {
                "element.topic": topic
              }
            ]
          }
        );
      }

      const updatedTopic = await userDataModel.findOne(
        { userID: userID, "topicSummary.topic": topic },
        { "topicSummary.$": 1 }
      ); // shows the updated topicSummary for that topic ONLY

      const selectedTopic = updatedTopic.topicSummary[0];
      const numQuestionsTopic = selectedTopic.attemptedQuestions.length;
      const numCorrectTopic = selectedTopic.correctQuestions.length;
      const accuracyTopic = numQuestionsTopic === 0 ? 0 : Math.round((numCorrectTopic / numQuestionsTopic) * 100 * 100) / 100;

      // Second update: update the number of questions and correct in the topic
      await userDataModel.updateOne(
        { userID: userID },
        {
          $set: {
            "topicSummary.$[element].numQuestions": numQuestionsTopic,
            "topicSummary.$[element].numCorrect": numCorrectTopic,
            "topicSummary.$[element].accuracy": accuracyTopic,
          }
        },
        {
          arrayFilters: [
            {
              "element.topic": topic
            }
          ]
        }
      );

      const updatedUser = await userDataModel.findOne({ userID: userID });
      let totalNumQuestions = 0;
      let totalNumCorrect = 0;

      updatedUser.topicSummary.forEach((topic) => {
        totalNumQuestions += topic.numQuestions || 0; // Ensure `numQuestions` is defined
        totalNumCorrect += topic.numCorrect || 0;     // Ensure `numCorrect` is defined
      });

      const overallAccuracy = totalNumQuestions === 0 ? 0 
        : Math.round((totalNumCorrect / totalNumQuestions) * 100 * 100) / 100; // Rounded to 2 decimal places

      // Third update: update the total number of questions and correct in the user's data, and accuracy of the topic and the overall user
      return await userDataModel.updateOne(
        { userID: userID },
        {
          $set: {
            numQuestions: totalNumQuestions,
            accuracy: overallAccuracy,
          },
        },
        {
          arrayFilters: [
            {
              "element.topic": topic
            }
          ]
        }
      );
    } catch (e) {
      console.error("Error updating user data:", e);
      throw e;
    }
  },
}

export default userDataRepo;