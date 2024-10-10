// Select the database to use.
use('users');

db.getCollection('user_data').deleteMany({});

// Insert a few documents into the sales collection.
db.getCollection('user_data').insertMany([
  { "cookieID": 1, "accuracy": 20, "numAttempts": 25, "numCorrect": 5, "attemptsSummary": [
    {
      "topic": "DataFrame",
      "numAttempts": 8,
      "numCorrect": 2,
      "accuracy": 25,
      "totalTime": 84,
      "attemptedQuestions": [{ "questionID": 3 }, { "questionID": 9 } ]
    },
    {
      "topic": "Linear Regression",
      "numAttempts": 10,
      "numCorrect": 2,
      "accuracy": 20,
      "totalTime": 100,
      "attemptedQuestions": [{ "questionID": 1 }, { "questionID": 6 } ]
    }, 
    {
      "topic": "Decision Tree Classifier",
      "numAttempts": 7,
      "numCorrect": 1,
      "accuracy": 14,
      "totalTime": 70,
      "attemptedQuestions": [{ "questionID": 5 } ]
    }
  ] },
  { "cookieID": 2, "accuracy": 10, "numAttempts": 20, "numCorrect": 2, "attemptsSummary": [
    {
      "topic": "DataFrame",
      "numAttempts": 8,
      "numCorrect": 1,
      "accuracy": 13,
      "totalTime": 92,
      "attemptedQuestions": [ { "questionID": 10 }, { "questionID": 12 } ]
    },
    {
      "topic": "NMI (Normalised Mutual Information)",
      "numAttempts": 12,
      "numCorrect": 1,
      "accuracy": 8,
      "totalTime": 150,
      "attemptedQuestions": [{ "questionID": 2 }, { "questionID": 13 } ]
    }
  ] },
  { "cookieID": 3, "accuracy": 5, "numAttempts": 20, "numCorrect": 1, "attemptsSummary": [
    {
      "topic": "Correlation",
      "numAttempts": 15,
      "numCorrect": 0,
      "accuracy": 0,
      "totalTime": 199,
      "attemptedQuestions": [ { "questionID": 7 }, { "questionID": 14 } , { "questionID": 18 } ]
    },
    {
      "topic": "Sentence splitting using nltk (i.e. nltk.sent_tokenize())",
      "numAttempts": 5,
      "numCorrect": 1,
      "accuracy": 20,
      "totalTime": 101,
      "attemptedQuestions": [{ "questionID": 19 } ]
    }
  ] },
  { "cookieID": 4, "accuracy": 8, "numAttempts": 40, "numCorrect": 3, "attemptsSummary": [
    {
      "topic": "Sentence splitting using nltk (i.e. nltk.sent_tokenize())",
      "numAttempts": 3,
      "numCorrect": 3,
      "accuracy": 100,
      "totalTime": 103,
      "attemptedQuestions": [ { "questionID": 8 }, { "questionID": 11 }, { "questionID": 17 }  ]
    },
    {
      "topic": "Reading/Writing CSV files",
      "numAttempts": 3,
      "numCorrect": 1,
      "accuracy": 33,
      "totalTime": 120,
      "attemptedQuestions": [{ "questionID": 16 } ]
    },
    {
      "topic": "Decision Tree Classifier",
      "numAttempts": 35,
      "numCorrect": 0,
      "accuracy": 0,
      "totalTime": 350,
      "attemptedQuestions": [{ "questionID": 15 } ]
    },
  ] },
  { "cookieID": 5, "accuracy": 100, "numAttempts": 1, "numCorrect": 1, "attemptsSummary": [
    {
      "topic": "NMI (Normalised Mutual Information)",
      "numAttempts": 1,
      "numCorrect": 1,
      "accuracy": 100,
      "totalTime": 12,
      "attemptedQuestions": [ { "questionID": 4 } ]
    },
  ] },
]);