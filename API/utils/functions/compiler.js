import { PythonShell } from 'python-shell';
import { writeFile } from 'fs';

export function syntaxCheck(code) {
  return new Promise(function(resolve, reject) {
    PythonShell.runString(code, null).then(messages=>{
      resolve(true);
    })
    .catch(err=>{
      console.log(err);
      resolve(false);
    });
  });
}

export function createCSV(csvStr, csvName) {
  // If no CSV files are used by the generated code
  if ((typeof csvStr == "string" && csvStr.length == 0) || 
    (csvStr == null) || (csvStr == 'null') || (csvStr == 'Null') ||
    (csvStr == 'none') || (csvStr == 'None')) {
    return;
  }

  // Creating the CSV file used by the code
  writeFile(csvName, csvStr, 'utf8', function (err) {
    if (err) {
      console.error("Creating CSV file failed!");
    }
    else {
      console.log("Creating CSV file succeeded!");
    }
  });
}
