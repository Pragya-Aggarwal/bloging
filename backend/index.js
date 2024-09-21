
import mongoose from "mongoose";
import express from "express";
import cors from "cors"; // Import CORS
import userRoutes from "./Routes/userRoutes.js";
import postRoutes from "./Routes/postRoutes.js";

// MongoDB connection
main().catch((err) => console.log(err));

async function main() {
    await mongoose
        .connect("mongodb://127.0.0.1:27017/userData", {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        .then(() => {
            console.log("Connected to MongoDB");
        })
        .catch((err) => {
            console.error("Failed to connect to MongoDB", err);
        });
}

// Initialize Express app
const app = express();
const port = 3000;

// Apply CORS middleware
app.use(cors()); // This enables all CORS requests

// Add JSON parsing middleware for POST requests
app.use(express.json());

// Routes
app.use("/users", userRoutes);  // User API routes
app.use("/posts", postRoutes);  // Post API routes

// Root route
app.get("/", (req, res) => {
    res.send("Hello world");
});




// Start server
app.listen(port, () => {
    console.log(`App listening on port ${port}`);
});
