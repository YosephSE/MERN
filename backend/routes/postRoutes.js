import { protect } from "../middlware/authmiddleware.js";
import express from "express";
const Router = express.Router();
import {
  singlePost,
  allPosts,
  createPost,
  editPost,
  deletePost,
  addComment,
  deleteComment
} from "../controllers/postController.js";

Router.post("/", protect, createPost);

Router.get("/", allPosts);

Router.get("/:id", singlePost);

Router.put("/:id", protect, editPost);

Router.delete("/:id", protect, deletePost);

Router.post("/:postId/comment", protect, addComment);


Router.delete("/:postId/comment/:commentId", protect, deleteComment)

export default Router;
