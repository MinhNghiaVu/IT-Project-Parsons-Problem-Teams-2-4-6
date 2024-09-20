import messages from "../utils/constants/messages.js";

/**    
  * @function outputParserJson    
  * Takes the response from Gemini API, presumably in the format
  * ```json```, it will return an object of 3 strings, being the code,
  * code description, and the optional example CSV file in text if applicable
  * respectively. If the output is not in the correct format, the function 
  * will throw an "Invalid output format" exception.
  */

export function outputParserJson(output) {
  const regexJsonParser = /```json\n([\s\S]*?)```/g;
  let doParse = regexJsonParser.exec(output);
  if (doParse === null) {
    throw messages.INVALID_OUTPUT_FORMAT;
    
  }
  let parsedData = doParse[1];
  parsedData = JSON.parse(parsedData); 
  console.log(parsedData.Code);
  console.log(parsedData)
  parsedData.Code = processString(parsedData.Code);
  console.log(parsedData.Code);
  return parsedData;
}

/**
 * @function processString
 * @param {*} string 
 * Filters out comments
 * Filters out any \n followed by spaces, tabs or \n
 * Accounts for print statements containing \n
 * @returns An array of strings where each string corresponds to a line of python
 * code to be parsed to the interactive problem
 */

function processString(string) {
  let commentFlag = false;
  let acceptNewLinesFlag1 = false;
  let acceptNewLinesFlag2 = false;
  let newLineFlag = false;
  //if true then parser will add a new array element
  let nextLineFlag = false;
  let codeArray = [];
  let currentChar = '';

  for (let i = 0; i < string.length; i++) {
    currentChar = string[i]

    //flags

    //Assuming comments end in a newline character
    //Also assuming that the ai doesn't write code on the same line as a comment following the comment
    if (!commentFlag) {
      if (currentChar == "#") {
        commentFlag = true;
      }
    } else {
      if (currentChar == "\n") {
        commentFlag = false;
        nextLineFlag = true;
      }
    }

    //If there is an open quote then stop looking for new line characters
    //Doesn't handle multiple embedded quotation marks ie: "'""'"
    if (!acceptNewLinesFlag1) {
      if (currentChar == "'") {
        acceptNewLinesFlag1 = true;
      }
    } else {
      if (currentChar == "'") {
        acceptNewLinesFlag1 = false;
      }
    }

    if (!acceptNewLinesFlag2) {
      if (currentChar == '"') {
        acceptNewLinesFlag2 = true;
      }
    } else {
      if (currentChar == '"') {
        acceptNewLinesFlag2 = false;
      }
    }

    //If we just saw a new line, check to see if there are any more space characters or we've moved onto the next line of code
    if (newLineFlag) {
      if (currentChar != ' ' && currentChar != '\n' && currentChar != '\t') {
        newLineFlag = false;
        nextLineFlag = true;
      }
    }

    //If we're scanning code lookout for a new line character to see if that code line has ended
    if (!newLineFlag) {
      if (currentChar == '\n' && !acceptNewLinesFlag1 && !acceptNewLinesFlag2) {
        newLineFlag = true;
      }
    }

    //adding to array
    //If we just had a newline or a comment then add an extra element to the array for the next line of code
    if (!newLineFlag && !commentFlag && (nextLineFlag == true || codeArray.length == 0)) {
      codeArray.push(currentChar);
      nextLineFlag = false;
    } else if (!newLineFlag && !commentFlag) {
      codeArray[codeArray.length - 1] += currentChar;
    }
    
  }

  return codeArray;
}
