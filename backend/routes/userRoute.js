import express from "express";
import { authUser } from "../controllers/userController.js";
const Router = express.Router();

Router.post("/auth", authUser);

export default Router;
