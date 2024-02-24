import mongoose from "mongoose";

const analysisSchema = new mongoose.Schema({
    githubUsername: String,
    contributions: Number
});

export default mongoose.model("Analysis", analysisSchema);