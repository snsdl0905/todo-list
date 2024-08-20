import mongoose from "mongoose";

const todoSchema = new mongoose.Schema({
    content: String,
    memo: String,
    status: String,
})

export default mongoose.model("Todo", todoSchema);