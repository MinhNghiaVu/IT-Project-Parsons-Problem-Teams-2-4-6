async function getUsersDbName() {
  const dbName = process.env.USERS_DATABASE;
  if (!dbName) {
    throw new Error("Database name is not defined in env file");
  }
  return dbName;
}

async function getQuestionsDbName() {
  const dbName = process.env.QUESTIONS_DATABASE;
  if (!dbName) {
    throw new Error("Database name is not defined in env file");
  }
  return dbName;
}

export { getUsersDbName, getQuestionsDbName };