# script.py
import sys

# Print a simple message
print("Hello from Python!")

# Print command line arguments if provided
if len(sys.argv) > 1:
    print("Arguments passed to Python:", sys.argv[1:])