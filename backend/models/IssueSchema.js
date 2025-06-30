import mongoose from "mongoose";

const issueSchema = new mongoose.Schema({
  toolId: { type: mongoose.Schema.Types.ObjectId, ref: "Tool", required: true },
  mechanicId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  issueDate: { type: Date, default: Date.now },
  returnDate: { type: Date },
  status: { type: String, enum: ["issued", "returned"], default: "issued" },
});

const Issue = mongoose.model("Issue", issueSchema);
export default Issue;
