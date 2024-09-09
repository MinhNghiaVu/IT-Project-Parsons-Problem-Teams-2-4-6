class RandomInstructionsSet {
  constructor(instructions) {
    this.instructions = instructions;
  }
  addInstruction(instruction) {
    this.instructions.push(instruction);
  }
  pickRandom() {
    return this.instructions[Math.floor(Math.random() * this.instructions.length)];
  }
};

/**
 * @class TopicInstructions
 * A container for all the instructions of a 
 * specific topic.
 * Contains middle instructions, which will be integrated with
 * other instructions from different topics, and final instructions, 
 * which will be the final instructions in a prompt.
 */
class TopicInstructions {
  constructor(topic) {
    this._topic = topic;
    this.middleInstructions = [];
    this.finalInstructions = [];
  }

  get topic() {
    return this._topic;
  }
  addMiddleInstruction(instructions) {
    this.middleInstructions.push(instructions);
  }
  addFinalInstruction(instructions) {
    this.finalInstructions.push(instructions);
  }
  randomMiddleInstructions() {
    return this.middleInstructions.reduce((acc, randgen) => acc + randgen.pickRandom() + "\n", "");
  }
  randomFinalInstructions() {
    return this.finalInstructions.reduce((acc, randgen) => acc + randgen.pickRandom() + "\n", "");
  }
};

/**
 * @enum EXPOSED_TOPICS
 * These topics are meant to be exposed to the 
 * web interfaces
 */
const EXPOSED_TOPICS = {
  DF: "Data Frames",
  CSV: "Reading/Writing CSV", 
  NLTK: "Sentence Splitting using NLTK", 
  CORR: "Correlation", 
  LR: "Linear Regression", 
  DTC: "Decision Tree Classifier", 
  NMI: "Normalized Mutual Information"
};

/**
 * @enum PRIVATE_TOPICS
 * These topics are not meant to be displayed and
 * selectable from the web interface. These are only
 * meant to adhere to the nature progression of topics, 
 * leading to a more cohesive prompt
 */
const PRIVATE_TOPICS = {
  CLUST: "Clustering"
};

class PromptGenerator {

  static rootStr = "Root";

  constructor() {
    this.topicMap = new Map();
    this.adj = new Map();
    
    //this.topics.forEach(topic => this.topicMap.set(topic, new TopicInstructions(topic)));
    //this.privateTopics.forEach(topic => this.topicMap.set([topic, new TopicInstructions(topic)]));
    Object.values(EXPOSED_TOPICS).forEach(topic => {
      this.topicMap.set(topic, new TopicInstructions(topic));
    });
    Object.values(PRIVATE_TOPICS).forEach(topic => {
      this.topicMap.set(topic, new TopicInstructions(topic));
    });
    
    this.adj.set(PromptGenerator.rootStr, [ EXPOSED_TOPICS.DF, EXPOSED_TOPICS.NLTK ]);
    this.adj.set(EXPOSED_TOPICS.DF, [ EXPOSED_TOPICS.CORR ]);
    this.adj.set(EXPOSED_TOPICS.CSV, [ EXPOSED_TOPICS.CORR ]);
    this.adj.set(EXPOSED_TOPICS.NLTK, []);
    this.adj.set(EXPOSED_TOPICS.CORR, [ EXPOSED_TOPICS.LR, EXPOSED_TOPICS.DTC, PRIVATE_TOPICS.CLUST ]);
    this.adj.set(EXPOSED_TOPICS.LR, []);
    this.adj.set(EXPOSED_TOPICS.DTC, []);
    this.adj.set(PRIVATE_TOPICS.CLUST, [ EXPOSED_TOPICS.NMI ]);
    this.adj.set(EXPOSED_TOPICS.NMI, []);
  }

  /**
   * @function constructPrompt
   * Based on the constructed progression graph, 
   * create a prompt on the given topic with 
   * specific instructions 
   *
   * If the topic does not exist, this will return null 
   */
  constructPrompt(topic, context) {
    let path = this.dfs(topic);
    if (path.length === 0) {
      return null;  
    }
    let instructions = "Generate a snippet of Python code with the following specifications:\n"
      + "- The code's context is: " + context + "\n";
    for (let i = 0; i < path.length; ++i) {
      let addIns = (i < path.length - 1) ? 
        this.topicMap.get(path[i]).randomMiddleInstructions() : 
        this.topicMap.get(path[i]).randomFinalInstructions()  ;
      instructions += this.topicMap.get(path[i]).randomMiddleInstructions();
      if (i === path.length - 1) {
        instructions += this.topicMap.get(path[i]).randomFinalInstructions();
      }
    }
    return instructions;
  }

  /**
   * @function dfs 
   * This function takes a topic and returns the 
   * path of topic's natural progression to generate a 
   * prompt.
   */
  dfs(target) {
    let stack = [];
    let vis = new Map();
    let path = new Map();
    Object.values(EXPOSED_TOPICS).forEach(topic => vis.set(topic, false));
    Object.values(PRIVATE_TOPICS).forEach(topic => vis.set(topic, false));

    stack.push(PromptGenerator.rootStr);

    while (stack.length > 0) {
      let curr = stack.pop();
      if (curr == target) {
        break; 
      }
      
      vis[curr] = true;
      this.adj.get(curr).forEach(topic => {
        stack.push(topic);
        path.set(topic, curr);
      });
    }

    // if the target is not found -> return an empty path
    if (!path.has(target)) {
      return [];
    }

    let curr = target;
    let res = [];
    while (curr != PromptGenerator.rootStr) {
      res.push(curr);
      //console.log(res);
      curr = path.get(curr);
    }

    return res.reverse();
  }

  addMiddleInstruction(topic, instruction) {
    this.topicMap.get(topic).addMiddleInstruction(instruction); 
  }
  addFinalInstruction(topic, instruction) {
    this.topicMap.get(topic).addFinalInstruction(instruction);
  }
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
function generatePrompt(topic, context) {
  let prompt = "Generate a piece of Python code with the following specifications:\n";
  
  // topic-specific requirements
  prompt += "- The code must be about " + topic + "\n";
  prompt += "- The code must also be about " + context + "\n";
  //prompt += "- The code must be 10 lines long\n";

  // code formatting requirements
  prompt += "- The code must not contain any comments in the code\n"; 
  prompt += "- The code must not contain 2 or more consecutive newline characters\n";
  prompt += "Format the response in JSON format with the following attributes:";

  // response requirements
  prompt += "- Code: The generated piece of code\n";
  prompt += "- Description: a brief description on what the code does\n";
  prompt += "- ExpectedOutput: a brief description on what the code should output\n";
  prompt += "- CSVName: If the code involves opening and reading a file, generate the name of the file\n";
  prompt += "- CSV: If the code involves opening and reading a file, generate an example of the file content";

  return prompt;
}

module.exports = {
  PromptGenerator,
  generatePrompt,
  TopicInstructions,
  RandomInstructionsSet,
  EXPOSED_TOPICS, 
  PRIVATE_TOPICS
}
