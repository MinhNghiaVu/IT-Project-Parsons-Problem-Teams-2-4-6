import re
import json

def removePythonComment(code: str) -> str:
    """
    Take a Python code string, and by using regex, removes 
    all the comments
    [!] THIS WILL NOT REMOVE COMMENTS NEXT TO ACTIVE
    LINES OF CODE; THIS IS BASED ON THE ASSUMPTION THAT
    THE GEMINI CODE WILL PRODUCE CODE THAT WILL HAVE COMMENTS
    ON TOP OF CODE LINES    
    """
    return re.sub(r'(?m)^ *#.*\n?', '', code)

def removeExcessiveWhitespaces(code: str) -> str:
    """
    Given the code might contain extra whitespaces, we 
    just need to strip them, making one block of code
    rather than multiple seperate lines 
    """
    return re.sub(r'\n\s*\n', '\n', code)

def parseJSON(response: str) -> object: 
    capture: list[str] = re.findall(r"```json\n(.*?)\n```", str(response), re.DOTALL)
    captured = capture[0]
    return json.loads(captured)

def parsePythonResponse(response: str) -> str:
    capture: list[str] = re.findall(r"```python\n(.*?)\n```", str(response), re.DOTALL)
    return capture[0]