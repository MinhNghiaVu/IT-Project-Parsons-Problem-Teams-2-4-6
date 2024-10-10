// TODO: SPLIT THIS INTO CONTROLLERM MIDDLEWARE, AND SERVICE
// Importing packages
import dotenv from 'dotenv';
import express, { static as expressStatic, json } from 'express';
import format from 'string-format';
import cors from 'cors';
// Importing our modules
import { establishConnection } from './database/connection.js';
import router from './routes/index.js';

dotenv.config();
const app = express()

app.use(express.json()); // Parsing incoming JSON

app.use(cors());

// Establishing connection to the database
establishConnection();

// Constants
const port = 8383

app.use(expressStatic('App'))
//Expects to receive json in the app.post method
app.use(json())

app.use('/api', router);

app.listen(port, () => console.log(format("server has started on port: {}", port)))
