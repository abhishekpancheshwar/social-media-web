const Post = require('../models/Post');
const User = require('../models/User');

// Create a new post
exports.createPost = async (req, res) => {
  const { caption, image } = req.body;
  try {
    const newPost = new Post({
      user: req.user.id,
      caption,
      image,
    });
    await newPost.save();
    res.status(201).json({ msg: 'Post created successfully', post: newPost });
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Get all posts (feed)
exports.getAllPosts = async (req, res) => {
  try {
    const posts = await Post.find()
      .populate('user', 'username profilePicture')  // Populate user data
      .populate('comments.user', 'username')  // Populate commenter data
      .sort({ createdAt: -1 });  // Show most recent posts first
    res.json(posts);
  } catch (error) {
    res.status(500).json({ msg: 'Server error' });
  }
};

// Delete a post by ID
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findById(req.params.id);

    // Check if post exists
    if (!post) {
      return res.status(404).json({ msg: 'Post not found' });
    }

    // Check if the user owns the post
    if (post.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    // Delete the post
    await post.remove();
    res.json({ msg: 'Post removed' });
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ msg: 'Server error' });
  }
};