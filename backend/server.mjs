import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import { router as authRoutes } from "./routes/auth/authRoutes.js";
import { router as taskRoutes } from "./routes/Task/taskRoutes.js";
import { router as userRoutes } from "./routes/User/userRoutes.js";
import chalk from "chalk";
import cookieParser from "cookie-parser";

dotenv.config(); // Load environment variables

// Database Connection
mongoose
  .connect(`${process.env.MONGO_URL}`)
  .then(() => console.log(chalk.bgGreen("Database connected")))
  .catch((err) => console.log(chalk.bgRed(err)));

const app = express();
const port = process.env.PORT || 3000;

// Middleware

app.use(
  cors({
    origin: "http://localhost:5173", // your Vite dev server URL
    credentials: true, // allow cookies / credentials
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"], // optional but good to specify
  })
);
// Enable CORS for all origins

// app.use(
//   cors({
//     origin: ["http://localhost:5173"],
//     methods: ["GET", "POST", "PUT", "DELETE"],
//     credentials: true,
//   })
// );

// Allow frontend to access backend
app.use(express.json()); // Parse JSON requests
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// routes
app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/users", userRoutes);

// Default route
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Start the server

app.listen(port, () =>
  console.log(chalk.bgYellow(`Server is running on port ${port}`))
);
