import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "username is required"],
    },
    email: {
      type: String,
      required: [true, "email is required"],
      unique: true,
      lowercase: true,
      isEmail: true,
    },
    password: {
      type: String,
      required: [true, "password is required"],
      isLength: {
        options: { min: 8 },
        errorMessage: "Password should be at least 8 chars",
      },
    },
    mobile: {
      type: Number,
      required: [true, "Contact is required"],
      maxlength: 10,
    },
    picture: {
      type: String,
      required: [true, "profile is required"],
    },
    level: {
      type: String,
      enum: ["Expert", "Medium", "New Recruit", "Trainee"],
      required: true,
    },
    role: { type: String, enum: ["mechanic", "admin"], default: "mechanic" },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
export default User;
