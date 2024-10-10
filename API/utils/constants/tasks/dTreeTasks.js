
/*--------------------CREATING TASKS FOR GEMINI IN THE DECISION TREE CLASSIFIER TOPIC-----------------*/

let taskDTreeEvaluation = [];
taskDTreeEvaluation.push(" evaluate the model using the Accuracy method.\n");
taskDTreeEvaluation.push(" evaluate the model using the Precision method.\n");
taskDTreeEvaluation.push(" evaluate the model using the Recall method.\n");
// Errors sometimes
//taskDTreeEvaluation.push(" evaluate the model using the F1-score method.\n");

/*---------------------------------------------------------------------------------------------------*/

export function promptDTree() {
  let task = Math.floor(Math.random() * taskDTreeEvaluation.length);
  let str = "";
  str += "- It should predict values using the Decision Tree Classifier Model.\n";
  str += "- The data given to the model should be numbers, and not strings.\n";
  str += "- It should then";
  str += taskDTreeEvaluation[task];

  return str;

}
