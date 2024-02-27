import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: String
});

export default mongoose.model("User", userSchema);
