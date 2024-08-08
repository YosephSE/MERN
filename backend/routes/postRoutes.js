import { protect } from "../middlware/authmiddleware.js";
import express from "express";
import mongoose from "mongoose";
import Post from "../models/postModel.js";
const Router = express.Router();
import {
  singlePost,
  allPosts,
  createPost,
  editPost,
  deletePost,
} from "../controllers/postController.js";

Router.post("/", protect, createPost);

Router.get("/", allPosts);

Router.get("/:id", singlePost);

Router.put("/:id", protect, editPost);

Router.delete("/:id", protect, deletePost);

Router.post("/:postId/comment", protect, async (req, res) => {
  const postId = req.params.postId;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: "Invalid postId format" });
  }

  const { authorId, content } = req.body;
  console.log(authorId, content);
  if (!authorId || !content) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }
    const newComment = {
      authorId: authorId,
      content: content,
    };
    post.comments.push(newComment);
    const updatedPost = await post.save();
    res.status(201).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

export default Router;
