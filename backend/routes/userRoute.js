import express from "express";
import {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";

const Router = express.Router();

Router.post("/auth", authUser);

export default Router;
