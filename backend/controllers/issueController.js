import express from "express";
import Issue from "../models/IssueSchema.js";
import Tool from "../models/ToolSchema.js";

// Issue tool
export const issueTool = async (req, res) => {
  const { toolId } = req.body;

  // console.log("Request received at:", new Date().toISOString());
  // console.log("User ID:", req.userId);
  // console.log("User role:", req.user.role);
  // console.log("Tool ID:", toolId);

  try {
    const tool = await Tool.findById(toolId);
    if (!tool || tool.quantity <= 0) {
      return res.status(400).json({ message: "Tool not available" });
    }

    const issue = new Issue({ toolId, mechanicId: req.userId });
    await issue.save();

    tool.quantity -= 1;
    await tool.save();

    res.json({
      success: true,
      message: "Tool issued successfully",
      tool,
    });
  } catch (error) {
    console.error("IssueTool error:", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const returnTool = async (req, res) => {
  const { issueId } = req.body;
  try {
    const issue = await Issue.findById(issueId);
    if (!issue || issue.status === "returned") {
      return res
        .status(400)
        .json({ message: "Invalid issue or already returned" });
    }

    issue.status = "returned";
    issue.returnDate = new Date();
    await issue.save();

    const tool = await Tool.findById(issue.toolId);
    tool.quantity += 1;
    await tool.save();

    res.json({
      success: true,
      message: "Tool returned successfully",
      tool,
    });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

export const getIssueRegister = async (req, res) => {
  try {
    const issues = await Issue.find().populate("toolId").populate("mechanicId");
    res.json(issues);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
