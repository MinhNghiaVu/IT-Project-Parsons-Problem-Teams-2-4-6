var initial = "print('Hello')\n" +
      "print('Parsons')\n" +
      "print('problems!')";


function displayErrors(fb) {
    if(fb.errors.length > 0) {
        alert(fb.errors[0]);
    }
} 




// place to get the code strings
async function fetchStrings() {
    const outputElement = document.getElementById('output');

    try {
        const response = await fetch('http://localhost:3000/api/strings');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        outputElement.textContent = data.join(', '); // Display fetched strings
        initial = data.join('\n');
    } catch (error) {
        console.error('Error fetching strings:', error);
        outputElement.textContent = 'Error fetching strings: ' + error.message;
    }
}

//sending the result back to server
function sendResult(){}













document.addEventListener('DOMContentLoaded', () => {   //make sure script is loaded
    console.log("DOM fully loaded and parsed");
    //get the strings after loaded
    


    var parson = new ParsonsWidget({
        sortableId: 'sortable',
        trashId: 'sortableTrash',
        max_wrong_lines: 1,
        feedback_cb : displayErrors,
        can_indent: false
    });
    parson.init(initial);
    parson.shuffleLines();
 
    document.getElementById('run-btn').addEventListener('click', () => {
        console.log("0000");
        const codeLines = [];
            $('#sortable li').each(function () {
                codeLines.push($(this).text()); // Retrieve the text of each <li> element
            });

            // Join the code lines into a single string
            const studentCode = codeLines.join('\n');
            //console.log(studentCode);
            runCode(studentCode);
            //document.getElementById('output').textContent = studentCode; // Display the code
    });


    document.getElementById('submit-btn').addEventListener('click', () => {
        var result = parson.getFeedback();
        //alert(result.feedback); // Display feedback to the user
        console.log("222")
        if (result == []){
            console.log("333");
            result = "congratulation, correct";
        }
        document.getElementById('feedback').textContent = result;
        console.log("111");
        console.log( result);
    });

    document.getElementById('reset-btn').addEventListener('click', () => {
        parson.shuffleLines(); // Reshuffle the blocks for a new attempt
    });
 

});






var outputElement = document.getElementById('output');


var pdsample = 'import pandas as pd\nd = pd.DataFrame.from_dict({\'X\' : [1000,2500,3000,5000,6000,9000,11000,14000,18000,19000,19500,22000],\'Y\' :[100,105,80,77,74,70,65,63,62,61,60,55]})\nprint(d)';

var studentAnswer;
async function runCode(studentCode) {
    // The URL for your backend server endpoint
    const url = 'http://localhost:3000/run-python'; // Replace with your actual backend URL if deployed

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pythonCode: studentCode  // Send the Python code to the backend
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json(); // Convert the response to JSON
        console.log(result); // Output the response to the console

        // Display the output or errors from the Python code execution
        document.getElementById('output').textContent = result.output || result.error;
    } catch (error) {
        console.error('Error:', error);
    }
}