import json
import os

def construct_datasets(topic: str, file_content: list) -> None:
    full_name = os.path.join(topic, "core_datasets.json")
    datasets_content: dict[str, list] = { "datasets": file_content }
    with open(full_name, "w") as w:
        json.dump(datasets_content, w, indent=4)

def construct_context_map(topic: str, context_map: dict[str, str]) -> None:
    fullName = os.path.join(topic, "context_map.json")
    with open(fullName, "w") as w:
        json.dump(context_map, w, indent=4) 

def create_dataset(topic: str, filename: str) -> bool:
    
    # access the core datasets of the topic
    accessContent = os.path.join(topic, "core_datasets.json")
    
    # extract the JSON object
    with open(accessContent, "r") as accessCoreDatasets:
        data = json.load(accessCoreDatasets)

        # if the dataset involves external data, create it
        if filename in data["datasets"]:
            datasetName: str = os.path.join(topic, data["datasets"][filename][0])
            datasetContent: str = data["datasets"][filename][1]
            dataset = open(datasetName, "w")
            dataset.write(datasetContent)
            dataset.close()
            return True
    
    # mark as no file created
    return False


def getFileContent(topic: str, filename: str) -> tuple[str, str] | None:
    # access the core datasets of the topic
    accessContent = os.path.join(topic, "core_datasets.json")
    
    # open core dataset mngr
    coreDatasets = open(accessContent, "r")
    
    # Check if the file actually exists or not
    JSONObj: object = json.load(coreDatasets)
    res: tuple[str, str] | None = (JSONObj["datasets"][filename][0], JSONObj["datasets"][filename][1]) \
        if filename in JSONObj["datasets"] else None
    
    # close core dataset mngr
    coreDatasets.close()
    
    return res