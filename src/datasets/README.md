# Model Fine-Tuning report:

### Topics & Contexts:
The generated code will be under the following topics and contexts:
-   Topics:
    +   Data Frame
    +   CSV
    +   Correlation
    +   Linear Regression
    +   Decision Tree Classifier
    +   NMI
    +   NLTK
-   Contexts:
    +   Koalas
    +   Iris
    +   Kangaroos
    +   Population

These will be found in `topics_contexts.py`.

### Setting the requirements for generated code to be used:
The generated code by the Gemini API is deemed fit to be used under the following condition: 
- The code must be error-free: Considering that in the website, it is agreed that the code will be run to be tested for correctness, the user must be able to run their code without any errors occurring (syntax, runtime). 
- The code must not contain no comment: Leaving comments may produce unintended effects on the learning process of the user, either distracting the users or giving away the answers. If the code contains multi-line comments, said comments will be divided into lines and displayed to the user interface:
```python
# This comment will be one of the bricks in the problem
x = 10

y = 2 # This comment will be in then brick

# Each of these lines of this comment
# will be turned into a brick
# and displayed to user
# interface
z = 20
```
- The code must not contain excessive whitespace: During the process of transforming from code to the Parson Problem, each line of code will be extracted and put into a brick, left for the user to reorder them in correct order. Having excessive newlines existing in the code means there will exist bricks with no content in it, degrading the experience for the learner.
```python
x = 10
 # This empty line will be made into a brick and displayed to UI
y = 20
``` 

### Proposal for a fine-tuned LLM Model:
Proposal on prompt improvements have been to ensure the generated code adheres to the given requirements

### Automated dataset generation:
In this directory lies the folders corresponding to each topic. In each of the topic directory, there exists some code instances, along with the external file content stored in `core_datasets.json`, and the context of each file stored in `context_map.json`.

To create code instances for a particular topic, run:
```bash
# Running this script will prompt user input, asking for 
# what topic the generated codes will be based on, as well
# as how many scripts will be generated 
$ python3 create_dataset.py
```

After the inputs were received, the script will refer to Gemini API to generate at most the number of scripts requested, each script having a random assigned topic and a dedicated dataset (either in form of CSV/Python Dictionary) to work around. After generating all the scripts, the Python code will then iterate over all the scripts, ensuring that it runs without raising any error; if it does, however, it will repeatedly request from Gemini API to fix the code, until it works.     

### Sanity checking for dataset:
After the scripts generation, run this Python script to ensure that the scripts are functional:
```bash
$ python3 run_validator.py
```

This script will go through each topic directory, and in it, it will iterate over all generated Python scripts. For each of the sctipts it iterates, it will refer to `core_datasets.json` to determine if the script calls for an external resource file (in this particular case, only CSV files are supported). If it exists, the script will collect the file name and insert the content. The script will then be ran, and the status will be recored. If the generated script runs without any error, it is considered "run successfully" in green; otherwise, it will be marked "run failed" in red. 

### Integration of fined-tuned model using REST API [TODO]:

Refer to https://ai.google.dev/gemini-api/docs/model-tuning/tutorial?authuser=2&lang=rest

### Limitations of current automated dataset generation tool:
-   Manual runs:

-   Inconsistent number of scripts:

-   Non-guaranteed technique variety:

-   Bash-specific command:

-   Arbitrarily infinite loop: