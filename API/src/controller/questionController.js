import dotenv from 'dotenv';

dotenv.config();


const getDbName = () => {
  const dbName = process.env.QUESTIONS_DATABASE;
  if (!dbName) {
    throw new Error('Database name is not defined in env file');
  }
  return dbName;
}

const createQuestion = async () => {
}
