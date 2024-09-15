
// containing all the relevant topics 
// TODO: create specific contexts for topics 

import { readFileSync } from 'fs';
import { promptDataFrame } from "./dataframeTasks.js";

export const TOPICS = {
  DataFrames: "Data Frames",
  NMI: "Normalized Mutual Information",
  NLTK: "Sentence Splitting using NLTK",
  Correlation: "Correlation",
  LinearRegression: "Linear Regression",
  DecisionTree: "Decision Tree",
  CSV: "Read/Write CSV File"
};

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
    let prompt = "Generate a piece of Python code with the following specifications, and give the 3 drafts answers as well:\n";
    
    if (topic == "DataFrame") {
      //prompt += "- It should be similar to the following code snippets:\n";
      //let data = readFileSync("./src/utils/constants/DataFrameSnippets.txt", "utf-8");
      //prompt += "- Your response should be similar to the following examples:\n";
      //prompt += data;
      //prompt += "\n";
      //prompt += "- If the code uses fillna(), the DataFrames must contain None values\n";
      prompt += "The DataFrames in the code should contain some None values\n";
      prompt += promptDataFrame(); 
      //prompt += "- The code must be about this topics:\n";
      //prompt += "Understand the data structures in the Pandas library: Series, DataFrame.\n";
      //prompt += "Construct or load a Series or DataFrame using Pandas.\n";
      //prompt += "Slicing and indexing using .loc[] and .iloc[].\n";
      //prompt += "How to work with Series and DataFrames using methods and attributes.\n";
      //prompt += "Number Summary Statistics.\n";
      prompt += "Sorting, Filtering, and Grouping DataFrames.\n";
      //prompt += "Problem Solving using a given dataset.\n";
    }
    else {
      prompt += "- The code must be about " + topic + "\n";
    }
    prompt += "- The code must also have the context of " + context + "\n";
    
    // code formatting requirements
    prompt += "- The code must not contain any lines of comments or explanations in the code\n"; 
    prompt += "- The code must be at least 40 lines long, excluding any empty lines\n";

    prompt += "Format the response in JSON format with the following attributes:";

    // response requirements
    prompt += "- Code: The generated piece of code\n";
    prompt += "- Description: a brief description on what the code does, if the code has multiple print statements, the description should specify the order in which they are printed\n";
    prompt += "- ExpectedOutput: a brief description on what the code should output\n";
    prompt += "- CSVName: If the code involves opening and reading a file, generate the name of the file\n";
    prompt += "- CSV: If the code involves opening and reading a file, generate an example of the file content\n";

    return prompt;
}
