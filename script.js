var initial = "print('Hello')\n" +
      "print('Parsons')\n" +
      "print('problems!')";

var check = "a = 5\n" +
            "b = 4\n" +
            "print(a + b)";


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



function getStudentCode(){
    const codeLines = [];
    $('#sortable li').each(function () {
        codeLines.push($(this).text()); // Retrieve the text of each <li> element
    });

    // Join the code lines into a single string
    const studentCode = codeLines.join('\n');
    return studentCode;
}



//sending the result back to server
function sendResult(correct){
    console.log(correct);
    return 0;
    var pack = {
        questionNo: questionNo,
        studentId : studentId,
        correctness : correct,
        time : document.getElementById(time),
        topic : topic
    }

}




document.addEventListener('DOMContentLoaded', () => {   //make sure script is loaded
    console.log("DOM fully loaded and parsed");
    //get the strings after loaded
    
    var question = check;

    runCode(question).then(solution => {
        console.log("Solution retrieved:", solution);
    
        var parson = new ParsonsWidget({
            sortableId: 'sortable',
            trashId: 'sortableTrash',
            max_wrong_lines: 1,
            feedback_cb : displayErrors,
            can_indent: true
        });
        parson.init(question);
        parson.shuffleLines();
    
        document.getElementById('run-btn').addEventListener('click', () => {
            refreshOutput();
            console.log("0000");
            var studentCode = getStudentCode();


            runCode(studentCode).then(
                result => {
                    document.getElementById('output').textContent = result.output || result.error;
                }
            )

            //document.getElementById('output').textContent = studentCode; // Display the code
        });


        document.getElementById('submit-btn').addEventListener('click', () => {
            console.log("press submit");
            var studentCode = getStudentCode();
            
            if(runSubmit(studentCode,solution) == "1"){
                
                console.log("result correct");
            }


        });

        document.getElementById('reset-btn').addEventListener('click', () => {
            parson.shuffleLines(); // Reshuffle the blocks for a new attempt
        });
 
    })
});


function refreshOutput(){
    document.getElementById('output').textContent = ""
    document.getElementById('resultMessage').style.display = 'none';
}



//modified submit function
async function runSubmit(studentCode,solution) {
    refreshOutput();
    //const correctSolution = runCode(question);
    const studentAnswer = await runCode(studentCode);
    console.log("studentanswer");
    console.log(studentAnswer);
    console.log("studentanswer11");
    document.getElementById('output').textContent = studentAnswer.output || studentAnswer.error;

    if(solution.output.join('') === studentAnswer.output.join('')){
        console.log("same");
        document.getElementById('resultMessage').style.display = 'block';
        sendResult(1);
        return 1;
    }
    else{
        console.log("not same");
        console.log(solution.output);
        console.log(studentAnswer.output);
        sendResult(0);
        return 0;
    }
}



//modified runcode to support 
async function runCode(code) {
    // The URL for your backend server endpoint
    const url = 'http://localhost:3000/run-python'; // Replace with your actual backend URL if deployed

    const options = {
        method: 'POST',
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            pythonCode: code  // Send the Python code to the backend
        })
    };

    try {
        const response = await fetch(url, options);
        const result = await response.json(); // Convert the response to JSON
        console.log(result); // Output the response to the console
        
        return result;
        // Display the output or errors from the Python code execution
        
    } catch (error) {
        console.error('Error:', error);
    }
}