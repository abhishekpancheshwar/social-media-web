const mongoose = require('mongoose');

const PostSchema = new mongoose.Schema(
  {
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    caption: { type: String, required: true },
    image: { type: String, required: true },  // URL to an image, if uploaded
    likes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],  // Users who liked the post
    comments: [
      {
        user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
        text: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ]
  },
  { timestamps: true }  // Automatically adds createdAt and updatedAt
);

module.exports = mongoose.model('Post', PostSchema);
