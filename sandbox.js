const topics = require("./TopicsContexts");

function sandbox() {
  let gen = new topics.PromptGenerator();

  // DF Creation Instructions
  let DFCreationMiddle = new topics.RandomInstructionsSet([
    "- Create a new Data Frame reading from a Python Dictionary", 
    "- Create a new Data Frame reading from an external CSV file"
  ]);

  // DF handle missing data 
  let DFHandleMissingData = new topics.RandomInstructionsSet([
    "- If there are any data entries that has missing values, remove said entry", 
    "- If there are any data entries that has missing values, autofill with those missing values using the mean value of the column", 
    "- If there are any data entries that has missing values, autofill with those missing values using the identity value"
  ])

  let FeatSelect = new topics.RandomInstructionsSet([
    `- By creating the correlation matrix, pick 3 most relevant features for feature selections`
  ]);

  // CORR Instructions 
  let CorrMatrix = new topics.RandomInstructionsSet([
    "- Construct the correlation matrix and print out the 3 most relevant features to the target feature", 
    "- Put in the 5 most relevant features with the target feature into a list",
    `- Using the correlation matrix, pick 3 most relevant features for feature selections`
  ]);

  // insert them all 
  gen.addMiddleInstruction(topics.EXPOSED_TOPICS.DF, DFCreationMiddle);
  gen.addFinalInstruction(topics.EXPOSED_TOPICS.DF, DFHandleMissingData);
  gen.addFinalInstruction(topics.EXPOSED_TOPICS.CORR, CorrMatrix);

  // gen???
  console.log("Gen DF: ");
  console.log(gen.constructPrompt(topics.EXPOSED_TOPICS.DF, "koalas"));

  console.log("Gen Correlation: ");
  console.log(gen.constructPrompt(topics.EXPOSED_TOPICS.CORR, "axolotl"));
}

sandbox();
