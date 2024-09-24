import json 
import os
from dotenv import load_dotenv
import google.generativeai as genai
from google.generativeai import GenerativeModel

# Load API_KEY from dotenv file 
BASEDIR = os.path.abspath(os.path.dirname(__file__))
ENVDIR = os.path.join(BASEDIR, "../../.env")
load_dotenv(ENVDIR)

genai.configure(os.environ.get("API_KEY"))
model = GenerativeModel("gemini-1.5-flash")
chat = model.start_chat( history=[] )

def collect() -> None:
    """
    [WIP]
    Create a JSON file representing the tuned model 
    """
    tunedModelSpecs = open("tuned_model.json")
    
    tunedModelSpecs.close() 

collect()