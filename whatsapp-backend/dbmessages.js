import mongoose from "mongoose";
import findOrCreate from "mongoose-findorcreate";

const whatsappSchema = new mongoose.Schema({
    message: String,
    name: String,
    timestamp: String,
    received: Boolean,
})

const Messages = mongoose.model("messagecontents", whatsappSchema);

export default Message