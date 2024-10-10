
// containing all the relevant topics 
// TODO: create specific contexts for topics 

import { readFileSync } from 'fs';
import { promptDataFrame } from "./tasks/dataframeTasks.js";
import { promptNMI } from "./tasks/nmiTasks.js";
import { promptNLTK } from "./tasks/nltkTasks.js";
import { promptCorr } from "./tasks/corrTasks.js";
import { promptLR } from "./tasks/lrTasks.js";
import { promptDTree } from "./tasks/dTreeTasks.js";
import { promptCSV } from "./tasks/csvTasks.js";

export const TOPICS = {
  DataFrames: "Data Frames",
  NMI: "Normalized Mutual Information",
  NLTK: "Sentence Splitting using NLTK",
  Correlation: "Correlation",
  LinearRegression: "Linear Regression",
  DecisionTree: "Decision Tree",
  CSV: "Read/Write CSV File"
};

export const topicsList = [
  'DataFrame',
  'NMI (Normalised Mutual Information)',
  'Sentence splitting using nltk (i.e. nltk.sent_tokenize())',
  'Correlation',
  'Linear Regression',
  'Decision Tree Classifier',
  'Reading/Writing CSV files'
]

/**
* @function generatePrompt
* This function generates a prompt based on the topic  
* passed as the parameter. The prompt will then be sent to 
* the Gemini API to generate a piece of code, along with the 
* description and the example dataset if applicable
*
* The context of the prompt should be randomly generated based 
* on each individual context 
* 
* TODO: discuss whether the prompt should ask for JSON formatted response
* or just plain response 
*/
export function generatePrompt(topic, context) {
 let prompt = "Generate a piece of Python code with the following specifications:\n";

    switch (topic) {
      case "DataFrame":
        prompt += "The DataFrames in the code should contain some None values\n";
        prompt += promptDataFrame(); 
        break;
      case "NMI (Normalised Mutual Information)":
        prompt += promptNMI();
        break;
      case "Sentence splitting using nltk (i.e. nltk.sent_tokenize())":
        prompt += promptNLTK(context);
        break;
      case "Correlation":
        prompt += promptCorr();
        break;
      case "Linear Regression":
        prompt += promptLR();
        break;
      case "Decision Tree Classifier":
        prompt += promptDTree();
        break;
      case "Reading/Writing CSV files":
        prompt += promptCSV();
        break;
      default:
        prompt += "- The code must be about " + topic + "\n";
    }
    
    prompt += "- The code must also have the context of " + context + "\n";
    
    // code formatting requirements
    prompt += "- The code must not contain any lines of comments or explanations in the code\n"; 
    prompt += "- The code must be at least 20 lines long, excluding any empty lines\n";

    prompt += "Format the response in JSON format with the following attributes:\n";

    // response requirements
    prompt += "- Code: The generated piece of code, ensuring you include the necessary tab characters\n";
    prompt += "- Description: a brief description on what the code does, if the code has multiple print statements, the description should specify the order in which they are printed\n";
    prompt += "- ExpectedOutput: a brief description on what the code should output\n";
    prompt += "- CSVName: If the code involves opening and reading a file, generate the name of the file\n";
    prompt += "- CSV: If the code involves opening and reading a file, generate an example of the file content\n";

    return prompt;
}
