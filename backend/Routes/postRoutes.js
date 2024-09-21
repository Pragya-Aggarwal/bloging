// routes/postRoutes.js
import express from "express";
import { Posts } from "../models/Post.js";

const router = express.Router();

// Create a new post
router.post("/", async (req, res) => {
    const postData = req.body;
    const newPost = new Posts(postData);
    try {
        const savedPost = await newPost.save();
        res.status(201).send(savedPost);
    } catch (err) {
        res.status(400).send(err);
    }
});

// Read all blog posts
router.get("/allposts", async (req, res) => {
    const posts = await Posts.find({});
    res.send(posts);
});

// Read a single blog post
router.get("/singlePosts/:id", (req, res) => {
    const post = Posts.find((p) => p.id === parseInt(req.params.id));
    if (!post) return res.status(404).send("Post not found");
    res.json(post);
});

// Update a blog post
router.put("/updatePosts/:id", async (req, res) => {
    try {
        // Find the post by ID
        const post = await Posts.findById(req.params.id);

        if (!post) return res.status(404).send("Post not found");

        // Update the post fields
        post.name = req.body.name || post.name;
        post.heading = req.body.heading || post.heading;
        post.blog = req.body.blog || post.blog;

        // Save the updated post
        await post.save();

        // Respond with the updated post
        res.json(post);
    } catch (error) {
        console.error(error);
        res.status(500).send("Server error");
    }
});

// Delete a blog post
router.delete("/deletePosts/:id", async (req, res) => {
    const postId = req.params.id;

    console.log("Attempting to delete post with ID:", postId); // Log the ID being deleted

    try {
        const deletedPost = await Posts.findByIdAndDelete(postId);

        if (!deletedPost) {
            return res.status(404).json({ message: "Post not found" });
        }

        // No content to return
        return res.status(200).json({ status: 200, message: "Post deleted successfully" });

    } catch (error) {
        console.error("Error deleting post:", error); // Log the error for debugging
        return res
            .status(500)
            .json({ message: "Internal server error", error: error.message });
    }
});

export default router;
