import google.generativeai as genai # GenerativeModel
from google.generativeai import ChatSession # ChatSession
import os, shutil # clearDatasetFolders
import random # random topics for dataset
import time # prevent API exhaustion
import subprocess # run code
from dotenv import load_dotenv

import csv_creator
from topics_contexts import *
from input_parser import *
from code_generation import *

# Load API_KEY from dotenv file 
BASEDIR = os.path.abspath(os.path.dirname(__file__))
ENVDIR = os.path.join(BASEDIR, "../../.env")
load_dotenv(ENVDIR)

genai.configure(os.environ.get("API_KEY")) 
initCodeGenModel: genai.GenerativeModel = genai.GenerativeModel("gemini-1.5-flash")
codeGenChat: ChatSession = initCodeGenModel.start_chat( history=[] )
codeRegenModel: genai.GenerativeModel = genai.GenerativeModel("gemini-1.5-flash")
codeRegenChat: ChatSession = codeRegenModel.start_chat( history=[] )
    
def clearDatasetFolders(topic: str) -> None:
    """
    clearDatasetFolders:
    For each topic directory, clear out everything related to the
    old dataset, making way for new dataset
    """
    for item in os.listdir(topic):
        fullItem = os.path.join(topic, item)
        if os.path.isfile(fullItem):
            os.remove(fullItem)
        elif os.path.isdir(fullItem):
            shutil.rmtree(fullItem)
                
def getFunctionalCode(topic: str, filename: str) -> None:
    # get full name
    fullPath: str = os.path.join(topic, filename)
    
    # if the file depends on external file, generate it
    csv_creator.create_dataset(topic, fullPath)
    
    while True:
        try:
            # run it; if successful, it should not yield any error
            cmd: str = f"cd {topic} && python3 ./{filename}"
            result: subprocess.CompletedProcess[str] = subprocess.run(cmd, shell=True, check=True, capture_output=True, text=True)
            break
        except subprocess.CalledProcessError as e:
            # if the external file exists, check if 
            fileContent: tuple[str, str] | None = csv_creator.getFileContent(topic, filename)
    
            # code regen        
            readCode = open(fullPath, "r")
            orgCode: str = readCode.read()
            readCode.close()
            with open(fullPath, "w") as mod:
                regenCode: str = regenerateCode(
                    codeRegenChat, 
                    orgCode, 
                    e.stderr,
                    fileContent
                )
                mod.write(regenCode)
                time.sleep(0.5)
                
def main() -> None:
    
    numScriptsPerTopic: int = int(input("Insert # codes per topic: ")) 
    topic: str = input("Generate for topic: ")
    
    if topic not in topics:
        print("Topic does not exist")
        return
    
    # remove everything to generate a new fresh dataset
    clearDatasetFolders(topic)
    
    # the array of dicts; will be inserted into the core 
    # dataset JSON file in each directory
    data: dict[str, tuple[str, str]] = {}
    contextMap: dict[str, str] = {}
    
    # Each topic will have 6 instances to be trained on
    for n in range(numScriptsPerTopic):
        
        # unique identifier for each code file
        name: str = f"Code{n}.py"
        context: str = contexts[ random.randint(0, len(contexts) - 1) ]
        
        contextMap[name] = context
        
        prompt: str = generatePromptNLTK(context) if topic == "NLTK" else generatePromptData(topic, context)
        
        try:
            
            # extract the API's response 
            resp = codeGenChat.send_message(prompt)
            toJson: object = parseJSON(resp.text)
            scriptName: str = os.path.join(topic, name)
            with open(scriptName, "w") as w:
                w.write(toJson["Code"]) 
            
            # if external data is involved, save it
            if toJson["CSV"] != "" and toJson["CSVName"] != "":
                data[scriptName] = (toJson["CSVName"], toJson["CSV"])
            
            # so we prevent the API from being exhausted 
            time.sleep(0.5)
            
        except Exception as e:
            print("Generation missed [DEBUG]")
        
        
    # shove the data into the core dataset JSON
    csv_creator.construct_datasets(topic, data)
    csv_creator.construct_context_map(topic, contextMap)
    
    # re-generate code until we (should) make it functional
    for file in os.listdir(topic):
        if file.endswith(".py"):
            getFunctionalCode(topic, file)
            
            # extract the code content
            codeFile = open(os.path.join(topic, file), "r")
            code: str = codeFile.read()
            codeFile.close()
            
            # trim
            with open(os.path.join(topic, file), "w") as trim:
                code = removeExcessiveWhitespaces(removePythonComment(code))
                trim.write(code)
        
if __name__ == "__main__":
    main()