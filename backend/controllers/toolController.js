import express from "express";
import Tool from "../models/ToolSchema.js";

// Middleware to check admin role
// const isAdmin = (req, res, next) => {
//   const token = req.headers.authorization?.split(' ')[1];
//   if (!token) return res.status(401).json({ message: 'No token provided' });

//   try {
//     const decoded = jwt.verify(token, 'my_secret_key');
//     if (decoded.role !== 'admin') return res.status(403).json({ message: 'Admin access only' });
//     next();
//   } catch (error) {
//     res.status(401).json({ message: 'Invalid token' });
//   }
// };

export const addTool = async (req, res) => {
  const { name, category, quantity } = req.body;
  try {
    const tool = new Tool({ name, category, image: req.file?.path, quantity });
    await tool.save();
    res.status(201).json({
      success: true,
      message: "Tool added successfully",
      tool,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getTool = async (req, res) => {
  try {
    const tools = await Tool.find();
    res.json({
       success: true,
      message: "Get All Tool successfully",
      tools,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
