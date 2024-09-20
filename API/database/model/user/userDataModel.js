import attemptSchema from './attemptModel.js';

export default UserDataSchema = {
  userID: {
    type: Number,
    required: true,
    unique: true
  },
  timeAverage: {
    type: Number,
    default: 0
  },
  attempts: [attemptSchema],
  numAttempts: Number,
}