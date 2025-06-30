import express from "express";
import User from "../models/userSchema.js"; // Ensure .js extension
import bcrypt from "bcryptjs";

import { generateToken } from "../utils/token.util.js";

export const signup = async (req, res) => {
  try {
    const { name, email, password, mobile, level, role } = req.body;
    const picture = req.file?.path || null;

    const exists = await User.findOne({ email });
    if (exists)
      return res.status(409).json({ message: "Email already in use" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      mobile,
      level,
      picture,
      role: role || "mechanic",
    });

    res.status(201).json({
      message: "User created",
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        mobile: newUser.mobile,
        level: newUser.level,
        role: newUser.role,
        picture,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ message: "Invalid credentials" });

    const accessToken = generateToken(user);

    res.json({
      accessToken,
      role: user.role,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
