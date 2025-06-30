import mongoose from "mongoose";


const toolSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "username is required"],
  },
  category: { type: String, required: [true, "category is required"] },
  image: { type: String },
  quantity: {
    type: Number,
    required: [true, "quantity is required"],
    default: 0,
  },
});

const Tool = mongoose.model("Tool", toolSchema);
export default Tool;
