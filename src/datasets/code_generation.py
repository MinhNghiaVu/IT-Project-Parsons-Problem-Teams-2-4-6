from google.generativeai.generative_models import ChatSession
from input_parser import parsePythonResponse

def generatePromptData(topic: str, context: str) -> str:
    prompt: str = f"For the topic of \"{topic}\" and context \"{context}\", do the following:\n"
    prompt += "- Either generate an external CSV file or a Python dictionary with lots of numerical data; ensure that if another dataset object of the same topic has been created before, do not re-use the dataset and generate a new one; "
    prompt += "if in the previous responses a Python dictionary was created, create a CSV file for this response, and vice versa\n"
    prompt += "- Generate a data frame based on the CSV file/Python dictionary\n"
    prompt += "- Based on the data frame and the topic, generate a 15-statement Python code (excluding comments); ensure that the generated code does not involve data visualization and uses different techniques than the previously generated code\n"
    prompt += "- Print the intended output at the very end of the code\n"
    prompt += "Format the response in a JSON object with the following attribute:\n"
    prompt += "- Code: The generated code\n"
    prompt += "- CSVName: If the code involves reading from a pre-existing exteral CSV file, insert the file name; otherwise, leave an emtpy string\n"
    prompt += "- CSV: If the code involves reading from a pre-existing exteral CSV file, insert the file content; otherwise, leave an emtpy string\n"
    return prompt

def generatePromptNLTK(context: str) -> str:
    prompt: str = f"For the topic of \"String Manipulation using NLTK\" and context \"{context}\", do the following:\n"
    prompt += "- Generate a Python string revolving around the given context\n"
    prompt += "- Generate a 15-statement piece of Python code (not counting comments) applying string manipulation techniques using the Python NLTK library\n"
    prompt += "- Print the intended output at the very end of the code\n"
    prompt += "Format the response in a JSON object with the following attribute:\n"
    prompt += "- Code: The generated code\n"
    prompt += "- CSVName: If the code involves reading from a pre-existing exteral CSV file, insert the file name; otherwise, leave an emtpy string\n"
    prompt += "- CSV: If the code involves reading from a pre-existing exteral CSV file, insert the file content; otherwise, leave an emtpy string\n"
    return prompt

def regenerateCode(chat: ChatSession, code: str, error: str, dataset: tuple[str, str] | None = None) -> str:
    prompt: str = "Given the following piece of Python code:\n" + code
    if dataset != None:
        prompt += "\nAnd the code reads from the following dataset:\n"
        prompt += f"\"{dataset[0]}\"\n" 
        prompt += dataset[1] + "\n"
    prompt += "The code yields the following error:\n" + error + "\n"
    prompt += "Return the full Python code that has the issue resolved\n"
    prompt += "Format the response such that it only contains the fixed Python code wrapped around ```python```"
    
    print(prompt)
    
    response: str = chat.send_message(prompt).text
    parsedResponse: str = parsePythonResponse(response) 
    
    print(parsedResponse)
    return parsedResponse
