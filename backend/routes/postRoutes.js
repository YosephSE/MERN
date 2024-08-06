import { protect } from "../middlware/authmiddleware.js";
import express from "express";
const Router = express.Router();

Router.route("/")
  .get(protect, (req, res) => {
    res.json({ message: "Success" });
  })
  .post(protect, (req, res) => {
    res.json({ message: "Success post" });
  });

export default Router;
