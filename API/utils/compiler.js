import { PythonShell } from 'python-shell';
import { writeFile } from 'fs';

export function syntaxCheck(code) {

  // Writing the generated code snippet to a Python script (to run through interpreter)
  writeFile("script.py", code, 'utf-8', function(err) {
    if (err) {
      console.log("\nCreating python script failed!\n");
    }
    else {
      console.log("\nCreating python script succeeded!\n");
    }
  });

  // Running the response through python interpreter
  let pyShell = new PythonShell("script.py", { mode: 'text' });

  // Printing the output
  pyShell.on('message', function(message) {
    console.log("Output:\n");
    console.log(message);
  });
  
  return new Promise(function(resolve, reject) {
    // End the input stream and allow the process to exit
    pyShell.end(function(err, code, signal) {
      //if (err) throw err;
      if (err) {
        console.log("The error is:\n" + err + "\n");
        resolve(false);
      }
      else {
        console.log("yo\n");
        resolve(true);
      }
      console.log('The exit code was: ' + code);
      console.log('The exit signal was: ' + signal);
      console.log('finished');
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
      console.log("\nCreating CSV file failed!\n");
    }
    else {
      console.log("\nCreating CSV file succeeded!\n");
    }
  });
}
