from topics_contexts import topics
import csv_creator
import os
import subprocess

class bcolors:
    HEADER = '\033[95m'
    OKBLUE = '\033[94m'
    OKCYAN = '\033[96m'
    OKGREEN = '\033[92m'
    WARNING = '\033[93m'
    FAIL = '\033[91m'
    ENDC = '\033[0m'
    BOLD = '\033[1m'
    UNDERLINE = '\033[4m'

def run_tests() -> bool:
    res: bool = True
    
    logs = open("logs.txt", "w")
    
    for topic in topics:
        for file in os.listdir(topic):
            # Skip all the non-Python code
            if not file.endswith(".py"):
                continue
        
            # get file's full path
            fullScriptPath: str = os.path.join(topic, file)
            csv_creator.create_dataset(topic, fullScriptPath)
            
            
            # run it
            try: 
                result: subprocess.CompletedProcess[str] = subprocess.run(f"cd {topic} && python3 ./" + file, shell=True, check=True, capture_output=True, text=True)
                logs.write(f"{fullScriptPath}:\n" + result.stdout + "\n")
                print(bcolors.OKGREEN + f"[✓] {fullScriptPath} run successfully" + bcolors.ENDC)
            except subprocess.CalledProcessError as e:
                logs.write(f"{fullScriptPath}:\n" + e.stderr + "\n")
                print(bcolors.FAIL + f"[✗] {fullScriptPath} run failed" + bcolors.ENDC)
                res = False
                
    
    logs.close()
    
    return res         
    

print("All datasets have been run and verified to be working") \
if run_tests() \
else print("One or more of the test cases failed; check logs.txt and fix the files accordingly or reset the generation")