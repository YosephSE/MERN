import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import { protect } from "../middlware/authmiddleware.js";

const Router = express.Router();

Router.post("/", registerUser);
Router.post("/auth", authUser);
Router.post("/logout", logoutUser);
Router.get("/profile", protect, getUserProfile);
Router.put("/profile", protect, updateUserProfile);

export default Router;
