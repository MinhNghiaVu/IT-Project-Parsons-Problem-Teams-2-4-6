const express = require('express');
const cors = require('cors'); // Import the CORS package
const { PythonShell } = require('python-shell');

const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

// Middleware to parse JSON request bodies
app.use(express.json());

// Endpoint to receive Python code, run it, and send back the result
app.post('/run-python', (req, res) => {
  const { pythonCode } = req.body;

  if (!pythonCode) {
    return res.status(400).send('No Python code provided.');
  }

  // Options for PythonShell
  let options = {
    mode: 'text',
    pythonPath: './venv/Scripts/python', // Change to 'python3' if needed
    pythonOptions: ['-u'],
    scriptPath: './'
  };

  // Run the Python code
  PythonShell.runString(pythonCode, options)
    .then(messages => {
      res.json({ output: messages }); // Send the output back to the client
    })
    .catch(err => {
      res.status(500).json({ error: err.message }); // Send any errors back to the client
    });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});