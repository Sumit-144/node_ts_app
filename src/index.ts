// Importing express, dotenv, and the user routes
import express from "express";
import dotenv from "dotenv";
import userRoutes from "./routes/user.routes";
import userDetailsRoutes from "./routes/userDetails.routes";

// Initialize dotenv to load environment variables
dotenv.config();

// Create an instance of express
const app = express();

app.use(express.json()); // Middleware to parse JSON bodies

// Use the user routes for handling user-related requests
app.use("/api/users", userRoutes);
// Use the user details routes for handling user details-related requests
app.use("/api/user-details", userDetailsRoutes);

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}/api/users`);
});