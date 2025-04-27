import express from "express";
import User from "../../models/User.js";
import Task from "../../models/Task.js";
import { authMiddleware } from "../../controllers/auth/authController.js";
import chalk from "chalk";

const router = express.Router();

// Create a new task
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, assignedTo } = req.body;
    const newTask = new Task({ title, description, assignedTo });
    await newTask.save();
    res.status(201).json(newTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get all tasks
router.get("/", authMiddleware, async (req, res) => {
  try {
    const tasks = await Task.find().populate("assignedTo", "username");
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update a task
router.patch("/:id", authMiddleware, async (req, res) => {
  try {
    console.log("Request body for updating task:", req.body);
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(updatedTask);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Delete a task
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/check-auth", authMiddleware, async (req, res) => {
  try {
    if (!req.user) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    // Fetch user details (excluding password)
    const user = await User.findById(req.user.id).select("-password");

    res.json({ success: true, user }); 
  } catch (err) {
    console.error(chalk.bgMagenta("Auth Check Error:", err));
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

export { router };
