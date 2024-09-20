import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

const mongoUsername = process.env.MONGO_DB_USERNAME;
const mongoPassword = process.env.MONGO_DB_PASSWORD;
const mongoClusterUrl = process.env.MONGO_DB_CLUSTER_URL;
const mongoClusterName = process.env.MONGO_DB_CLUSTER_NAME;
const questionsDbName = process.env.QUESTIONS_DATABASE;
const mongoOptions = process.env.MONGO_DB_OPTIONS || '';
const questionsDetailsCollection = process.env.QUESTION_DETAILS_COLLECTION;

async function establishConnection() {

    const mongoUri = `mongodb+srv://${mongoUsername}:${mongoPassword}@${mongoClusterUrl}/${mongoOptions}&appName=${mongoClusterName}`;
    mongoose.set('strictQuery', true);
    try {
        await mongoose.connect(mongoUri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });

        const { connection } = mongoose;
        console.log(`MongoDB connected : ${connection.host}`);
    } catch (e) {
        console.error(e);
    }
}

async function getDatabaseConnection(dbName) {
    return mongoose.connection.useDb(dbName);
}

async function close() {
    await mongoose.disconnect();
}

export { establishConnection, getDatabaseConnection, close };