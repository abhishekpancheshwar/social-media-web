const express = require("express");
const {
  createPost,
  getAllPosts,
  deletePost,
} = require("../controllers/postController");
const auth = require("../middleware/auth");
const router = express.Router();

// Create a post (protected route)
router.post("/create", auth, createPost);
// Get all posts (public route)
router.get("/", getAllPosts);
router.delete("/:id", auth, deletePost); // Delete post by ID

module.exports = router;
