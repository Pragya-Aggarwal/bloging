// routes/userRoutes.js
import express from "express";
import { UserData } from "../models/User.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
    res.status(200).json({
        response: {
            status: {
                statusCode: 200,
                message: "Hello World!",
            },
        },
    });
});

// Fetch all users
router.get("/users", async (req, res) => {
    try {
        const data = await UserData.find({});
        res.status(200).json({
            response: {
                status: {
                    statusCode: 200,
                    message: "Users fetched successfully",
                },
            },
            returnParameter: { users: data },
        });
    } catch (error) {
        res.status(500).json({
            response: {
                status: {
                    statusCode: 500,
                    message: "Error fetching users",
                },
            },
            returnParameter: { error },
        });
    }
});

// Fetch a user by email
router.get("/user/:email", async (req, res) => {
    const userEmail = req.params.email;
    try {
        const user = await UserData.findOne({ email: userEmail });
        if (user) {
            return res.status(200).json({
                response: {
                    status: {
                        statusCode: 200,
                        message: "User fetched successfully",
                    },
                },
                returnParameter: { user },
            });
        } else {
            return res.status(404).json({
                response: {
                    status: {
                        statusCode: 404,
                        message: "User not found",
                    },
                },
            });
        }
    } catch (error) {
        return res.status(500).json({
            response: {
                status: {
                    statusCode: 500,
                    message: "Error fetching user",
                },
            },
            returnParameter: { error },
        });
    }
});

// Create (POST) - Add a New User
router.post("/users", async (req, res) => {
    const { name, email, age } = req.body;

    // Validate request data
    if (!name || !email || !age) {
        return res.status(400).json({
            response: {
                status: {
                    statusCode: 400,
                    message: "Name, email, and age are required fields",
                },
            },
        });
    }

    try {
        // Create new user instance
        const newUser = new UserData({ name, email, age });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Send the created user data with a 201 status code
        res.status(201).json({
            response: {
                status: {
                    statusCode: 201,
                    message: "User created successfully",
                },
            },
            returnParameter: { user: savedUser },
        });
    } catch (error) {
        // Handle any errors that occurred during saving
        res.status(500).json({
            response: {
                status: {
                    statusCode: 500,
                    message: "Error saving the user",
                },
            },
            returnParameter: { error },
        });
    }
});

// Update user
router.put("/users/:id", async (req, res) => {
    const { id } = req.params;
    const { name, email, age } = req.body;

    try {
        const updatedUser = await UserData.findByIdAndUpdate(id, { name, email, age }, { new: true });
        if (!updatedUser) {
            return res.status(404).json({
                response: {
                    status: {
                        statusCode: 404,
                        message: "User not found",
                    },
                },
            });
        }
        res.status(200).json({
            response: {
                status: {
                    statusCode: 200,
                    message: "User updated successfully",
                },
            },
            returnParameter: { user: updatedUser },
        });
    } catch (error) {
        res.status(500).json({
            response: {
                status: {
                    statusCode: 500,
                    message: "Error updating user",
                },
            },
            returnParameter: { error },
        });
    }
});

// Delete user
router.delete("/users/:id", async (req, res) => {
    const { id } = req.params;

    try {
        const deletedUser = await UserData.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({
                response: {
                    status: {
                        statusCode: 404,
                        message: "User not found",
                    },
                },
            });
        }
        res.status(200).json({
            response: {
                status: {
                    statusCode: 200,
                    message: "User deleted successfully",
                },
            },
        });
    } catch (error) {
        res.status(500).json({
            response: {
                status: {
                    statusCode: 500,
                    message: "Error deleting user",
                },
            },
            returnParameter: { error },
        });
    }
});

export default router;
