const QuestionDetailsSchema = {
  questionID: {
    type: Number,
    required: true,
    unique: true
  },
  topic: {
    type: String,
    required: true
  },
  context: {
    type: String,
    required: true
  },
  answer: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  expectedOutput: {
    type: String,
    required: true
  },
}

export default QuestionDetailsSchema;