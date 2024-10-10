import mongoose from "mongoose";
const { Schema } = mongoose;

const UserDataSchema = new Schema({
  userID: { type: Number, required: true , unique: true},
  name: {type: String, required: true, default: "Student"},
  // num attempts and percent correct for each topic
  accuracy: { type: Number, default: 0, required: true },
  numQuestions: { type: Number, default: 0, required: true },
  numCorrect: { type: Number, default: 0, required: true },
  topicSummary: [
    {
      topic: { type: String, required: true},
      numQuestions: { type: Number, default: 0, required: true },
      numCorrect: { type: Number, default: 0, required: true },
      accuracy: { type: Number, default: 0, required: true },
      totalTime: { type: Number, default: 0, required: true },
      attemptedQuestions: { type: [Number], default: [] },
      correctQuestions: { type: [Number], default: [] },
    },
  ],
}, { collection: "user_data" });

export default UserDataSchema;