import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

const Router = express.Router();

Router.post("/", registerUser);
Router.post("/auth", authUser);
Router.post("/logout", logoutUser);
Router.get("/profile", getUserProfile);
Router.put("/profile", updateUserProfile);

export default Router;
