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
        res.status(201).json({
            response: {
                status: {
                    statusCode: 201,
                    message: "Post created successfully",
                },
            },
            returnParameter: { post: savedPost },
        });
    } catch (err) {
        res.status(400).json({
            response: {
                status: {
                    statusCode: 400,
                    message: "Error creating post",
                },
            },
            returnParameter: { error: err.message },
        });
    }
});

// Read all blog posts
router.get("/allposts", async (req, res) => {
    try {
        const posts = await Posts.find({});
        res.status(200).json({
            response: {
                status: {
                    statusCode: 200,
                    message: "Posts fetched successfully",
                },
            },
            returnParameter: { posts },
        });
    } catch (error) {
        res.status(500).json({
            response: {
                status: {
                    statusCode: 500,
                    message: "Error fetching posts",
                },
            },
            returnParameter: { error: error.message },
        });
    }
});

// Read a single blog post
router.get("/singlePosts/:id", async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                response: {
                    status: {
                        statusCode: 404,
                        message: "Post not found",
                    },
                },
            });
        }
        res.status(200).json({
            response: {
                status: {
                    statusCode: 200,
                    message: "Post fetched successfully",
                },
            },
            returnParameter: { post },
        });
    } catch (error) {
        res.status(500).json({
            response: {
                status: {
                    statusCode: 500,
                    message: "Error fetching post",
                },
            },
            returnParameter: { error: error.message },
        });
    }
});

// Update a blog post
router.put("/updatePosts/:id", async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (!post) {
            return res.status(404).json({
                response: {
                    status: {
                        statusCode: 404,
                        message: "Post not found",
                    },
                },
            });
        }

        // Update the post fields
        post.name = req.body.name || post.name;
        post.heading = req.body.heading || post.heading;
        post.blog = req.body.blog || post.blog;

        // Save the updated post
        await post.save();

        res.status(200).json({
            response: {
                status: {
                    statusCode: 200,
                    message: "Post updated successfully",
                },
            },
            returnParameter: { post },
        });
    } catch (error) {
        res.status(500).json({
            response: {
                status: {
                    statusCode: 500,
                    message: "Error updating post",
                },
            },
            returnParameter: { error: error.message },
        });
    }
});

// Delete a blog post
router.delete("/deletePosts/:id", async (req, res) => {
    const postId = req.params.id;

    try {
        const deletedPost = await Posts.findByIdAndDelete(postId);
        if (!deletedPost) {
            return res.status(404).json({
                response: {
                    status: {
                        statusCode: 404,
                        message: "Post not found",
                    },
                },
            });
        }

        return res.status(200).json({
            response: {
                status: {
                    statusCode: 200,
                    message: "Post deleted successfully",
                },
            },
        });
    } catch (error) {
        return res.status(500).json({
            response: {
                status: {
                    statusCode: 500,
                    message: "Internal server error",
                },
            },
            returnParameter: { error: error.message },
        });
    }
});

export default router;
