import Post from "../models/postModel.js";
import User from "../models/userModel.js";
import mongoose from "mongoose";

const deletePost = async (req, res) => {
  const postId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "User not authorized to delete this post" });
    }

    await post.deleteOne();

    res.status(200).json({ message: "Post deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

const createPost = async (req, res) => {
  try {
    const { title, content, authorId, category, image } = req.body;
    console.log(title);
    console.log(content);
    console.log(authorId);
    console.log(category);
    console.log(image);
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
};

const allPosts = async (req, res) => {
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
};

const singlePost = async (req, res) => {
  const postId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ error: "Invalid post ID" });
  }

  try {
    const post = await Post.findOne({ _id: postId }).populate({
      path: "authorId",
      select: "name",
    });

    if (!post) {
      return res.status(404).json({ error: "Post not found" });
    }

    res.status(200).json({ post });
  } catch (err) {
    console.error("Error retrieving posts:", err);
    res.status(500).json({ error: "An error occurred while retrieving posts" });
  }
};

const editPost = async (req, res) => {
  const postId = req.params.id;

  if (!mongoose.Types.ObjectId.isValid(postId)) {
    return res.status(400).json({ message: "Invalid post ID" });
  }

  const { title, content, category, image } = req.body;

  try {
    const post = await Post.findById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    if (post.authorId.toString() !== req.user._id.toString()) {
      return res
        .status(403)
        .json({ message: "User not authorized to update this post" });
    }

    if (title) post.title = title;
    if (content) post.content = content;
    if (category) post.category = category;
    if (image) post.image = image;

    const updatedPost = await post.save();

    res.status(200).json(updatedPost);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export { deletePost, createPost, editPost, singlePost, allPosts };