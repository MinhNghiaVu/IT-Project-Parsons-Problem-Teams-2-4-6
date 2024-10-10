
/*----------------------------CREATING TASKS FOR GEMINI IN THE NLTK TOPIC----------------------------*/

let taskNLTK = ["Lemmatization using nltk.download('wordnet')", "Stemming", "Tokenization"]

/*---------------------------------------------------------------------------------------------------*/

export function promptNLTK(context) {
  let str = "";
  str += "- Create a Python string relating to this context: " + context + ".\n";
  let task = Math.floor(Math.random() * taskNLTK.length);
  str += "- Perform " + taskNLTK[task] + " on the created string by using the nltk library.\n";

  return str;

}
