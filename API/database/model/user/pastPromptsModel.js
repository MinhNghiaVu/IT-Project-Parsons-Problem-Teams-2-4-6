export default pastPromptsSchema = {
  userID: {
    type: Number,
    required: true,
    unique: true
  },
  pastPrompts: {
    type: [{type: String}],
    default: []
  },
  numPrompts: {
    type: Number,
    default: 0
  }
}