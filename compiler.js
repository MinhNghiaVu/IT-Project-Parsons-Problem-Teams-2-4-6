let { PythonShell } = require('python-shell');

console.log("Starting Python script...");

let options = {
  mode: 'text',
  pythonPath: 'python',  // Use 'python3' if necessary
  pythonOptions: ['-u'], // '-u' for unbuffered output
  scriptPath: './',      // Path to the directory containing 'script.py'
  args: ['arg1', 'arg2', 'arg3'] // Arguments to pass to the Python script
};

// Run the Python script 'script.py'
PythonShell.run('script.py', options)
  .then(messages => {
    console.log('Python script output:', messages);
    console.log('Python script execution finished.');
  })
  .catch(err => {
    console.error('Error occurred while running the Python script:', err);
  });