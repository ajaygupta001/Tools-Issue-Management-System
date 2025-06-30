import express from "express";
import { protect, authorize } from "../middlewares/authMiddleware.js";
import { login, signup } from "../controllers/authController.js";
import multer from "multer";
const authRoutes = express.Router();


const upload = multer({ dest: "uploads/" });

authRoutes.post("/signup", upload.single("picture"), signup);
authRoutes.post("/login", login);


export default authRoutes;
