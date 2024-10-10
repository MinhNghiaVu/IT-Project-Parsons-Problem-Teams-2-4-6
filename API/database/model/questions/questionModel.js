import mongoose from "mongoose";
const { Schema } = mongoose;

const QuestionSchema = new Schema({
  questionID: { type: Number, required: true, unique: true },
  topic: { type: String, required: true },
  context: { type: String, required: true },
  correct: { type: Boolean, default: false, required: true },
  totalTime: { type: Number, default: 0, required: true },
  numAttempts: { type: Number, default: 0, required: true },
  attempts: { 
    type: [
      {
        attemptID: { type: Number, required: true },
        correct: { type: Boolean, default: false, required: true },
        time: { type: Number, default: 0, required: true }
      },
    ], 
    default: []
  }
}, { collection: "question_details" });

export default QuestionSchema;