export function formQuestionDetails(data, topic, context) {
  const answer = data.Code;
  const description = data.Description;
  const expectedOutput = data.ExpectedOutput;
  return {
    topic,
    context,
    answer,
    description,
    expectedOutput,
  }
}