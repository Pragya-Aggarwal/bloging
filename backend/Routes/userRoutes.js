// routes/userRoutes.js
import express from "express";
import { UserData } from "../models/User.js";

const router = express.Router();

// Get all users
router.get("/", async (req, res) => {
    res.send("Hello World!");
});

// Get all users
router.get("/users", async (req, res) => {
    try {
        const data = await UserData.find({});
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send({ message: "Error fetching users", error });
    }
});
router.get("/user/:email", async (req, res) => {
    const userEmail = req.params.email;
    const user = await UserData.findOne({ email: userEmail });
    if (user) {
        res.json(user);
    } else {
        res.status(404).json({ message: "User not found" });
    }
});

// Create (POST) - Add a New User
router.post("/users", async (req, res) => {
    const { name, email, age } = req.body;
    console.log(req, "name, email, age");
    // Validate request data
    if (!name || !email || !age) {
        return res
            .status(400)
            .send({ message: "Name, email, and age are required fields" });
    }

    try {
        // Create new user instance
        const newUser = new UserData({ name, email, age });

        // Save the user to the database
        const savedUser = await newUser.save();

        // Send the created user data with a 201 status code
        res.status(201).send(savedUser);
    } catch (error) {
        // Handle any errors that occurred during saving
        res.status(500).send({ message: "Error saving the user", error });
    }
});

export default router;
