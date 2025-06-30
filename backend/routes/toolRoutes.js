import express from "express";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import multer from "multer";
import { addTool, getTool } from "../controllers/toolController.js";
const toolRoutes = express.Router();

const upload = multer({ dest: "uploads/" });

toolRoutes.post(
  "/addTool",
  protect,
  authorize(["admin"]),
  upload.single("image"),
  addTool
);
toolRoutes.get("/getTool", getTool);

export default toolRoutes;
