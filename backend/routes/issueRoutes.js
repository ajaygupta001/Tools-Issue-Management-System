import express from "express";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import {
  getIssueRegister,
  issueTool,
  returnTool,
} from "../controllers/issueController.js";
const issueRoutes = express.Router();

issueRoutes.post("/issue", protect, authorize(["mechanic"]), issueTool);
issueRoutes.post("/return", protect, authorize(["mechanic"]), returnTool);
issueRoutes.get("/register", getIssueRegister);

export default issueRoutes;
