
// Select the database to use.
use('questions');

db.getCollection('question_details').deleteMany({});

// Insert a few documents into the sales collection.
db.getCollection('question_details').insertMany([
  { "questionID": 1, "topic": "Linear Regression", "context": "Global Temperature Trends", "correct": true, "totalTime": 100, numAttempts: 2  },
  { "questionID": 2, "topic": "NMI (Normalised Mutual Information)", "context": "Koala Population in Australia", "correct": true, "totalTime": 132, numAttempts: 2  },
  { "questionID": 3, "topic": "DataFrame", "context": "Koala Population in Australia", "correct": true, "totalTime": 123, numAttempts: 2  },
  { "questionID": 4, "topic": "NMI (Normalised Mutual Information)", "context": "Inventory Management", "correct": true, "totalTime": 100, numAttempts: 2  },
  { "questionID": 5, "topic": "Decision Tree Classifier", "context": "Customer Purchase Behavior", "correct": true, "totalTime": 100, numAttempts: 2  },
  { "questionID": 6, "topic": "Linear Regression", "context": "Student Performance Prediction", "correct": true, "totalTime": 100, numAttempts: 2  },
  { "questionID": 7, "topic": "Correlation", "context": "Predicting Disease Outbreaks", "correct": true, "totalTime": 100, numAttempts: 2  },
  { "questionID": 8, "topic": "Sentence splitting using nltk (i.e. nltk.sent_tokenize())", "context": "Customer Purchase Behavior", "correct": true, "totalTime": 100, numAttempts: 2  },
  { "questionID": 9, "topic": "DataFrame", "context": "Sales Forecasting", "correct": true, "totalTime": 100, numAttempts: 2  },
  { "questionID": 10, "topic": "DataFrame", "context": "Student Performance Prediction", "correct": true, "totalTime": 100, numAttempts: 2  },
  { "questionID": 11, "topic": "Sentence splitting using nltk (i.e. nltk.sent_tokenize())", "context": "Stock Market Prediction", "correct": true, "totalTime": 100, numAttempts: 2  },
  { "questionID": 12, "topic": "DataFrame", "context": "Student Performance Prediction", "correct": true, "totalTime": 100, numAttempts: 2  },
  { "questionID": 13, "topic": "NMI (Normalised Mutual Information)", "context": "Global Temperature Trends", "correct": true, "totalTime": 100, numAttempts: 2  },
  { "questionID": 14, "topic": "Correlation", "context": "Traffic Flow Analysis", "correct": true, "totalTime": 100, numAttempts: 2  },
  { "questionID": 15, "topic": "Decision Tree Classifier", "context": "Customer Purchase Behavior", "correct": true, "totalTime": 100, numAttempts: 2  },
  { "questionID": 16, "topic": "Reading/Writing CSV files", "context": "Traffic Flow Analysis", "correct": true, "totalTime": 100, numAttempts: 2  },
  { "questionID": 17, "topic": "Sentence splitting using nltk (i.e. nltk.sent_tokenize())", "context": "Sales Forecasting", "correct": true, "totalTime": 100, numAttempts: 2  },
  { "questionID": 18, "topic": "Correlation", "context": "Predicting Disease Outbreaks", "correct": true, "totalTime": 100, numAttempts: 2  },
  { "questionID": 19, "topic": "Sentence splitting using nltk (i.e. nltk.sent_tokenize())", "context": "Sales Forecasting", "correct": true, "totalTime": 100, numAttempts: 2  },
]);
