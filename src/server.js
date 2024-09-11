// TODO: SPLIT THIS INTO CONTROLLERM MIDDLEWARE, AND SERVICE
// Importing packages
import dotenv from 'dotenv'
import { PythonShell } from 'python-shell';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { writeFile } from 'fs';
import express, { static as expressStatic, json } from 'express';
import format from 'string-format';
const app = express()
dotenv.config();

// Importing our modules
import { outputParserJson } from "./service/OutputParser.js";
import { generatePrompt } from "./utils/constants/TopicsContexts.js";

// Constants
const port = 8383
var answer = "Haven't queried yet";

const genAI = new GoogleGenerativeAI(process.env.API_KEY);

// Choosing Gemini model
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});

// DataFrames, Normalized Mutual Information, Sentence splitting using NLTK
// Correlation, Linear Regression, Decision Tree Classifier, Read/Write CSV files

async function askGemini(topic, context) {
  // Starting a full chat
  const chat = model.startChat({ history: [] })
  
  // another prompt using the original one 
  let prompt = generatePrompt(topic, context);
  let result = null;
  try {
    result = await chat.sendMessage(prompt);
  } catch (err) {
    console.log("Error querying gemini:\n");
    console.log(err);
  }
  


  if (result != null) {
    let resp = result.response.text();
    console.log(resp);
    let fixed_resp = outputParserJson(resp);
  
    console.log(fixed_resp);
    console.log("Python code as array:\n");
    answer = fixed_resp.Code;
    console.log(fixed_resp.Code);
  
    createCSV(fixed_resp.CSV, fixed_resp.CSVName);
  
    // Running the response through python interpreter
    console.log(fixed_resp.Code.join('\n'));
    PythonShell.runString(fixed_resp.Code.join('\n'), null).then(messages=>{
      console.log("Output:\n");
      console.log(messages);
    });
  }

}

function createCSV(csvStr, csvName) {
  // If no CSV files are used by the generated code
  if ((typeof csvStr == "string" && csvStr.length == 0) || 
    (csvStr == null) || (csvStr == 'null') || (csvStr == 'Null') ||
    (csvStr == 'none') || (csvStr == 'None')) {
    return;
  }

  // Creating the CSV file used by the code
  writeFile(csvName, csvStr, 'utf8', function (err) {
    if (err) {
      console.log("\nCreating CSV file failed!\n");
    }
    else {
      console.log("\nCreating CSV file succeeded!\n");
    }
  });
}


//Allows the server to see the index.html page in the public folder
app.use(expressStatic('public'))
//Expects to receive json in the app.post method
app.use(json())

app.get('/info', (req, res) => {
    res.status(200).json({info: answer})
})


app.post('/', (req,res) => {
    const {parcel} = req.body
    const arr = parcel.split("|")
    let topic = arr[1]
    let context = arr[0]
    
    askGemini(topic, context)
    if (!parcel) {
        res.status(400).send({status: "failed"})
    }
    res.status(200).send({status: "received"})

})

app.listen(port, () => console.log(format("server has started on port: {}", port)))
