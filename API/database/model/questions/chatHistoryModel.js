import { ObjectId } from "mongodb";
import { Schema } from "mongoose";

const ChatHistorySchema = new Schema({
    userID: ObjectId,
    topic: String,
    question: String,
    prompt: String,
}, { collection: "chat_history" });

export default ChatHistorySchema;