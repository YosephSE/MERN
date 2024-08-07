import { protect } from "../middlware/authmiddleware.js";
import express from "express";
const Router = express.Router();
import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

Router.post("/", protect, async (req, res) => {
  try {
    const { title, content, authorId, category, image } = req.body;

    if (!title || !content || !authorId || !category || !image) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(authorId)) {
      return res.status(400).json({ message: "Invalid authorId format" });
    }

    const newPost = new Post({
      title,
      content,
      authorId,
      category,
      image,
    });

    const savedPost = await newPost.save();

    res.status(201).json(savedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
});

Router.get("/", async (req, res) => {
  try {
    const posts = await Post.find().populate({
      path: "authorId",
      select: "name",
    });
    res.json(posts);
  } catch (err) {
    console.error("Error retrieving posts:", err);
    res.status(500).json({ error: "An error occurred while retrieving posts" });
  }
});

Router.get("/:id", async (req, res) => {
  const postId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const post = await Post.findOne({ _id: postId });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (err) {
    console.error("Error retrieving posts:", err);
    res.status(500).json({ error: "An error occurred while retrieving posts" });
  }
});

export default Router;
